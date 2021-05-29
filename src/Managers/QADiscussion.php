<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\Discussion\DiscussionRepository;
use Flarum\User\UserRepository;
use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Class QADiscussion
 * @package V17Development\FlarumSeo\Managers
 */
class QADiscussion
{
    /**
     * @var PageListener
     */
    protected $parent;

    /**
     * @var DiscussionRepository
     */
    protected $discussionRepository;

    /**
     * @var UserRepository
     */
    protected $userRepository;

    // Current discussion
    protected $firstPost = null;
    protected $posts = null;

    protected $enableBestAnswer = false;
    protected $enableLikes = false;

    /**
     * @param DiscussionRepository $discussionRepository
     */
    public function __construct(
        DiscussionRepository $discussionRepository,
        UserRepository $userRepository
    ) {
        $this->discussionRepository = $discussionRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * Discussion constructor.
     * @param PageListener $parent
     * @param $discussionId
     */
    public function handle(PageListener $parent, $discussionId)
    {
        $this->parent = $parent;

        // Enable best answer
        if($this->parent->extensionEnabled('fof-best-answer') || $this->parent->extensionEnabled('wiwatsrt-best-answer'))
        {
            $this->enableBestAnswer = true;
        }

        // Enable votes/likes?
        if($this->parent->extensionEnabled('flarum-likes'))
        {
            $this->enableLikes = true;
        }

        try {
            // Find discussion
            $discussion = $this->discussionRepository->findOrFail($discussionId);

            // Get all posts
            $this->posts = $discussion->posts()->get()->getDictionary();

            // Get first post
            $discussionFirstPost = $discussion->firstPost()->get()->getDictionary();
            $this->firstPost = array_shift($discussionFirstPost);

            // Create tags
            $this->createTags($discussion);
        } catch (\Exception $e) {
            // Do nothing. It just did not work
        }
    }


    /**
     * Create tags
     */
    private function createTags($discussion)
    {
        // Set current URL
        $url = '/d/' . $discussion->getAttribute('id') . '-' . $discussion->getAttribute('slug');
        $fullUrl = $this->parent->getApplicationPath($url);

        // Update ld-json
        $this->parent
            ->setSchemaJson('@type', "QAPage")
            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Get posted on and Last posted on
        $lastPostedOn = $this->firstPost !== null ? $this->firstPost->getAttribute('edited_at') : $discussion->getAttribute('last_posted_at');
        $firstPostId = $discussion->getAttribute('first_post_id');
        $bestAnswerId = $this->enableBestAnswer ? $discussion->getAttribute('best_answer_post_id') : $this->enableBestAnswer;

        // Set short description
        $this->parent
            ->setTitle($discussion->getAttribute('title'), true)
            ->setPublishedOn($discussion->getAttribute('created_at'));

        $content = '';

        // Set discussion description, only when a first post exists
        if($this->firstPost !== null) {
            $content = $this->firstPost->formatContent();

            // Set page description
            $this->parent
                ->setDescription($content)

                // Set page image
                ->setImageFromContent($content);
        }

        // Add updated
        if ($lastPostedOn !== null) {
            $this->parent->setUpdatedOn($lastPostedOn);
        }

        // Update topic url
        $this->parent->setUrl($url);

        // Schema
        $mainEntity = [
            '@type' => 'Question',
            'name' => $discussion->getAttribute('title'),
            'text' => $this->firstPost !== null ? $content : '',
            'dateCreated' => $this->acceptableDate($discussion->getAttribute('created_at')),
            'author' => [
                "@type" => "Person",
                "name" => $discussion->user() ? $this->getUserName($discussion->user()) : null
            ],
            'answerCount' => count($this->posts) - 1
        ];

        // ----------------
        // Accepted Answer
        // ----------------

        $posts = [];

        // Go through all posts
        foreach ($this->posts as $post) {
            // Skip first post
            if ($firstPostId == $post->getAttribute('id')) continue;

            // Ignore 'sticky', 'closed' and 'opened' posts
            if (get_class($post) !== "Flarum\Post\CommentPost") continue;

            // Temp post
            $tempPost = [
                '@type' => 'Answer',
                'text' => $post->formatContent(),
                'dateCreated' => $this->acceptableDate($post->getAttribute('created_at')),
                'url' => $fullUrl . '/' . $post->getAttribute('number'),
                'author' => [
                    "@type" => "Person",
                    "name" => $post->user() ? $this->getUserName($post->user()) : null
                ]
            ];

            // Upvote/like count
            if ($this->enableLikes) {
                $tempPost['upvoteCount'] = count($post->getAttribute('likes'));
            }else{
                $tempPost['upvoteCount'] = 0; // Always 0 (to be sure)
            }

            // Current answer is the accepted answer
            if ($bestAnswerId === $post->getAttribute("id")) {
                $mainEntity['acceptedAnswer'] = $tempPost;
            } // Normal answers
            else {
                $posts[] = $tempPost;
            }
        }

        // Flarum tags enabled?
        if ($this->parent->extensionEnabled("flarum-tags"))
        {
            $this->parent->setSchemaBreadcrumb($discussion);
        }

        // Only add suggested answers property if there are posts
        if(count($posts) > 0) {
            $mainEntity['suggestedAnswer'] = $posts;
        }

        // $discussion->getAttribute('tags')

        $this->parent->setSchemaJson('mainEntity', $mainEntity);
    }

    /**
     * @param $date
     * @return string
     */
    private function acceptableDate($date)
    {
        return (new \DateTime($date))->format("c");
    }

    /**
     * Username
     *
     * @param $userId
     * @return string
     */
    private function getUserName($user)
    {
        // Return username
        return $user->first() ? $user->first()->getAttribute('display_name') : null;
    }
}
