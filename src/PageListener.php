<?php
/**
 * Created by Jasper Vriends
 * www.vriends.co - GitHub @jaspervriends
 */

namespace JasperVriends\FlarumSeo;

// FlarumSEO classes
use JasperVriends\FlarumSeo\Managers\Discussion;
use JasperVriends\FlarumSeo\Managers\Profile;
use JasperVriends\FlarumSeo\Managers\Tag;

// Flarum classes
use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Discussion\DiscussionRepository;
use Flarum\User\UserRepository;

// Laravel classes
use Psr\Http\Message\ServerRequestInterface;

/**
 * Class PageListener
 * @package JasperVriends\FlarumSeo
 */
class PageListener
{
    // Config
    protected $config;
    protected $applicationUrl;

    // Settings
    protected $settings;
    protected $discussionRepository;
    protected $userRepository;

    // Document
    protected $flarumDocument;

    // Server request data
    protected $serverRequest;

    private $requestType = null;

    private $canonicalUrl = null;

    // Schema.org LD JSON
    protected $schemaArray = [
        '@context' => 'http://schema.org',
        '@type' => 'WebPage'
    ];

    // Meta data with property tags
    protected $metaProperty;

    /**
     * PageListener constructor.
     *
     * @param SettingsRepositoryInterface $settings
     * @param DiscussionRepository $discussionRepository
     * @param UserRepository $userRepository
     */
    public function __construct(SettingsRepositoryInterface $settings, DiscussionRepository $discussionRepository, UserRepository $userRepository)
    {
        // Get Flarum settings
        $this->settings = $settings;

        // Get Discussion Repository
        $this->discussionRepository = $discussionRepository;

        // Get User Repository
        $this->userRepository = $userRepository;

        // Get Flarum config
        $this->config = app('flarum.config');

        // Set forum base URL
        $this->applicationUrl = $this->config['url']; // Set site url

        // Settings debug settings: var_dump($this->settings->all());exit;
    }

    /**
     * Get current Flarum document and current Server Request
     *
     * @param Document $flarumDocument
     * @param ServerRequestInterface $serverRequestInterface
     */
    public function __invoke(Document $flarumDocument, ServerRequestInterface $serverRequestInterface)
    {
        // Flarum document
        $this->flarumDocument = $flarumDocument;

        // Current Server Request
        $this->serverRequest = $serverRequestInterface;

        // Check out type of page
        $this->determine();

        // Default site tags
        $this->setSiteTags();

        // Finish process
        $this->finish();
    }

    /**
     * Determine the current page type
     */
    private function determine()
    {
        // Request type
        $this->requestType = substr($this->serverRequest->getUri()->getPath(), 1, 2);

        // Query params
        $queryParams = $this->serverRequest->getQueryParams();

        // User profile page
        if($this->requestType === 'u/') {
            new Profile($this, $this->userRepository, isset($queryParams['username']) ? $queryParams['username'] : false);
        }

        // Tag page
        else if($this->requestType === 't/') {
            new Tag($this,isset($queryParams['slug']) ? $queryParams['slug'] : false);
        }

        // Discussion page
        else if($this->requestType === 'd/') {
            new Discussion($this, $this->discussionRepository, isset($queryParams['id']) ? $queryParams['id'] : false);
        }

        // Home page
        else if($this->requestType === "") {
            $this->setDescription($this->settings->get('forum_description'));
        }
    }

    /**
     * Default site meta tags
     * Available for all webpages
     */
    private function setSiteTags()
    {
        $applicationName = $this->settings->get('forum_title');
        $applicationDescription = $this->settings->get('forum_description');

        // Add application name
        $this->setMetaTag('application-name', $applicationName);
        $this->setMetaPropertyTag('og:site_name', $applicationName);

        // Robots, follow please! :)
        $this->setMetaTag('robots', 'index, follow');

        // Image
        $this->setMetaPropertyTag('og:image', 'https://www.devnl.nl/assets/logo-large.png');
        $this->setSchemaJson('image', 'https://www.devnl.nl/assets/logo-large.png');

        // Add application information
        $this->setSchemaJson('publisher', [
            "@type" => "Organization",
            "name" => $applicationName,
            "url" => $this->applicationUrl,
            "description" => $applicationDescription
        ]);
    }

    /**
     * Finish process and output meta property tags & Schema.org json
     */
    private function finish()
    {

        // Add OG meta property tags
        $this->flarumDocument->head[] = implode("\n", array_merge($this->flarumDocument->head, array_map(function ($content, $name) {
            return '<meta property="'.e($name).'" content="'.e($content).'">';
        }, $this->metaProperty, array_keys($this->metaProperty))));

        // Add canonical url
        if($this->canonicalUrl !== null)
        {
            $this->flarumDocument->head[] = '<link rel="canonical" href="'. $this->canonicalUrl .'">';
        }

        // Add schema.org json
        $this->flarumDocument->head[] = $this->writeSchemesOrgJson();
    }

    /**
     * Schema.org json
     */
    private function writeSchemesOrgJson()
    {
        return '<script type="application/ld+json">' . json_encode($this->schemaArray, true) . '</script>';
    }

    /**
     * @param $key
     * @param $value
     * @return PageListener
     */
    public function setMetaPropertyTag($key, $value)
    {
        $this->metaProperty[$key] = $value;

        return $this;
    }

    /**
     * @param $key
     * @param $value
     * @return PageListener
     */
    public function setMetaTag($key, $value)
    {
        $this->flarumDocument->meta[$key] = $value;

        return $this;
    }

    /**
     * @param $key
     * @param $value
     * @return PageListener
     */
    public function setSchemaJson($key, $value)
    {
        $this->schemaArray[$key] = $value;

        return $this;
    }

    /**
     * Current page URL
     *
     * @param $path
     * @return PageListener
     */
    public function setUrl($path)
    {
        $this->setMetaTag('twitter:url', $this->applicationUrl . $path);
        $this->setMetaPropertyTag('og:url', $this->applicationUrl . $path);
        $this->setSchemaJson("url", $this->applicationUrl . $path);

        return $this;
    }

    /**
     * Set canonical url
     *
     * @param $path
     * @return PageListener
     */
    public function setCanonicalUrl($path)
    {
        $this->canonicalUrl = $this->applicationUrl . $path;

        return $this;
    }

    /**
     * @param $path
     * @return string
     */
    public function getApplicationPath($path)
    {
        return $this->applicationUrl . $path;
    }

    /**
     * Get user data
     *
     * @param $userId
     * @return mixed
     */
    public function getUser($userId)
    {
        return $this->userRepository->findOrFail($userId);
    }

    /**
     * Set title
     *
     * @param $title
     * @return PageListener
     */
    public function setTitle($title)
    {
        $this
            ->setMetaPropertyTag('og:title', $title)
            ->setMetaTag('twitter:title', $title);

        return $this;
    }

    /**
     * Set description
     *
     * @param $description
     * @return PageListener
     */
    public function setDescription($description)
    {
        $description = trim(preg_replace('/\s+/', ' ', substr($description, 0, 157))) . (strlen($description) > 157 ? '...' : '');

        $this
            ->setMetaPropertyTag('og:description', $description)

            ->setMetaTag('description', $description)
            ->setMetaTag('twitter:description', $description)
            ->setSchemaJson("description", $description);

        if($this->requestType === 'd')
        {
            $this->setSchemaJson("headline", $description);
        }

        return $this;
    }

    /**
     * Set published on
     *
     * @param $published
     * @return PageListener
     */
    public function setPublishedOn($published)
    {
        $date = (new \DateTime($published))->format("c");

        $this
            ->setMetaTag('article:published_time', $date)
            ->setSchemaJson('datePublished', $date);

        return $this;
    }

    /**
     * Set updated time
     * Only used when a discussion has newer posts
     *
     * @param $updated
     * @return PageListener
     */
    public function setUpdatedOn($updated)
    {
        $date = (new \DateTime($updated))->format("c");

        $this
            ->setMetaTag('article:updated_time', $date)
            ->setSchemaJson('dateModified', $date);

        return $this;
    }
}
