<?php
/**
 * Created by Jasper Vriends
 * vriends.co - GitHub @jaspervriends
 */
namespace JasperVriends\FlarumSeo;

use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Discussion\DiscussionRepository;
use Flarum\User\UserRepository;

use Flarum\User\Guest;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;

// Using
// https://github.com/flarum/core/blob/master/src/Discussion/DiscussionRepository.php
// https://github.com/flarum/core/blob/master/src/Post/PostRepository.php

/**
 * Class Inject
 * @package JasperVriends\FlarumSeo
 */
class Inject
{
    // Settings
    protected $settings;
    protected $config;
    protected $discussion; // Discussion Repository
    protected $user; // User repository
    protected $url;

    // Document & request
    protected $document;
    protected $request;

    // Meta data with property tags
    protected $metaProperty;

    // Scheme.com JSON
    protected $ldJson = [
        '@context' => 'http://schema.org'
    ];

    public function __construct(SettingsRepositoryInterface $settings, DiscussionRepository $discussion, UserRepository $user)
    {
        $this->settings = $settings;
        $this->discussion = $discussion;
        $this->user = $user;

        // Get config
        $this->config = app('flarum.config');
        $this->url = $this->config['url']; // Set site url

//        var_dump($this->settings->all());exit;
    }

    /**
     * @param $document
     * @param ServerRequestInterface $request
     */
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        // Set data
        $this->document = $document;
        $this->request = $request;

        // First get query params
        $queryParams = $request->getQueryParams();

        // Get possible item ID
        $itemId = isset($queryParams['id']) ? $queryParams['id'] : false;

        // Try to catch the type of the request
        $requestType = substr($request->getUri()->getPath(), 1, 1);
        $currentUrl = $this->url . $request->getUri()->getPath();

        // Site name
        $this->metaProperty['og:site_name'] = $this->settings->get('forum_title');
        $document->meta['application-name'] = $this->settings->get('forum_title');

        // Site url
        $this->metaProperty['og:url'] = $currentUrl;
        $document->meta['twitter:url'] = $currentUrl;
        $this->ldJson['url'] = $currentUrl;

        // Image
        $this->metaProperty['og:image'] = 'https://www.devnl.nl/assets/logo-large.png';
        $this->ldJson['image'] = 'https://www.devnl.nl/assets/logo-large.png';

        // Set publisher or affiliation
        // affiliation: https://schema.org/affiliation  typeof: https://schema.org/Organization
        // publisher:   https://schema.org/publisher    typeof: https://schema.org/Organization
        $this->ldJson[$requestType === 'u' ? "affiliation" : "publisher"] = [
            "@type" => "Organization",
            "name" => $this->settings->get('forum_title'),
            "url" => $this->url,
            "sameAs" => [
                "https://www.facebook.com/devnlbe/",
                "https://twitter.com/devnlbe"
            ]
        ];

        // User profile
        if($requestType === 'u')
        {
            $this->setProfileMetaTags($queryParams['username']);
        }

//        // Tag page
//        else if($requestType === 't')
//        {
//            $this->metaProperty['og:type'] = 'website';
//        }

        // Discussion
        else if($requestType === 'd')
        {
            $this->ldJson['discussionUrl'] = $currentUrl;
            $this->setDiscussionMetaTags($itemId);
        }
        // Home
        else{
            $this->metaProperty['og:type'] = 'website';
            $this->ldJson['type'] = 'WebPage';
        }

        // Add OG meta property tags
        $document->head[] = implode("\n", array_merge($document->head, array_map(function ($content, $name) {
            return '<meta property="'.e($name).'" content="'.e($content).'">';
        }, $this->metaProperty, array_keys($this->metaProperty))));

        // Add schema.org json
        $document->head[] = $this->writeLdJson();
    }

    /**
     * Set discussion meta tags
     *
     * @param $discussionId
     */
    private function setDiscussionMetaTags($discussionId)
    {
        // Try to find discussion
        try {
            // Find discussion
            $discussion = $this->discussion->findOrFail($discussionId);

            // Find first post
            $firstPost = array_shift($discussion->firstPost()->get()->getDictionary());

            if($firstPost === null) {
                return;
            }

            $postedOn = $discussion->getAttribute('created_at');
            $lastPostedOn = $discussion->getAttribute('last_posted_at');

            // Set type article
            $this->metaProperty['og:type'] = 'article';

            // Set short description
            $this->setTitle($discussion->getAttribute('title'));
            $this->setDescription($firstPost->getAttribute('content'));
            $this->setPublishedOn($postedOn);

            // Add updated
            if($postedOn != $lastPostedOn)
            {
                $this->setUpdatedOn($lastPostedOn);
            }

            // Update ld-json
            $this->ldJson['@type'] = "DiscussionForumPosting";

            // Find user
            $findUser = $this->getUser($discussion->getAttribute('user_id'));

            if($findUser) {
                // Set author
                // author: https://schema.org/author typeof: https://schema.org/Person
                $this->ldJson['author'] = [
                    "@type" => "Person",
                    "name" => $findUser->getAttribute('username'),
                    "url" => $this->url . '/u/' . $findUser->getAttribute('username')
                ];
            }
        }
        catch (\Exception $e) {
            // Do nothing. It just did not work
        }
    }

    /**
     * Set user profile meta tags
     *
     * @param $username
     */
    private function setProfileMetaTags($username)
    {
        try {
            $username = $this->user->findByIdentification($username);

            $this->metaProperty['og:type'] = 'profile';

            // Person https://schema.org/Person
            $this->ldJson['@type'] = "Person";
            $this->ldJson['name'] = $username->getAttribute('username');

        }
        catch (\Exception $e) {
            // Do nothing. It just did not work
        }
    }

    /**
     * Set title
     *
     * @param $title
     * @return string
     */
    private function setTitle($title)
    {
        $this->metaProperty['og:title'] = $title;
        $this->document->meta['twitter:title'] = $title;
    }

    /**
     * Set description
     *
     * @param $description
     * @return string
     */
    private function setDescription($description)
    {
        $description = trim(preg_replace('/\s+/', ' ', substr($description, 0, 150))) . (strlen($description) > 150 ? '...' : '');

        $this->document->meta['description'] = $description;
        $this->metaProperty['og:description'] = $description;
        $this->document->meta['twitter:description'] = $description;
        $this->ldJson['headline'] = $description;
        $this->ldJson['description'] = $description;
    }

    /**
     * Set published on
     *
     * @param $published
     * @return string
     */
    private function setPublishedOn($published)
    {
        $date = (new \DateTime($published))->format("c");
        $this->document->meta['article:published_time'] = $date;

        $this->ldJson['datePublished'] = $date;
    }

    /**
     * Set updated time
     * Only used when a discussion has newer posts
     *
     * @param $updated
     * @return string
     */
    private function setUpdatedOn($updated)
    {
        $date = (new \DateTime($updated))->format("c");

        $this->document->meta['article:updated_time'] = $date;

        $this->ldJson['dateModified'] = $date;
    }

    /**
     *
     */
    private function writeLdJson()
    {
        return '<script type="application/ld+json">' . json_encode($this->ldJson, true) . '</script>';
    }

    /**
     * @param $userId
     * @return mixed
     */
    private function getUser($userId)
    {
        return $this->user->findOrFail($userId);
    }
}
