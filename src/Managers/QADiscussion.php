<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\Discussion\DiscussionRepository;
use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Class QADiscussion
 * @package V17Development\FlarumSeo\Managers
 */
class QADiscussion
{
    // Parent and Discussion Repository
    protected $parent;
    protected $discussionRepository;

    // Current discussion
    protected $discussionId = null;
    protected $discussion = null;
    protected $firstPost = null;
    protected $posts = null;
    protected $cachedUsernames = [];

    protected $enableBestAnswer = false;
    protected $enableLikes = false;

    /**
     * Discussion constructor.
     * @param PageListener $parent
     * @param DiscussionRepository $discussionRepository
     * @param $discussionId
     */
    public function __construct(PageListener $parent, DiscussionRepository $discussionRepository, $discussionId)
    {
        $this->parent = $parent;
        $this->discussionRepository = $discussionRepository;
        $this->discussionId = $discussionId;

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
            // Found discussion and discussion
            $this->findDiscussion();

            // Discussion not found
            if ($this->discussion === null) return;

            // Create tags
            $this->createTags();
        } catch (\Exception $e) {
            // Something went wrong, fallback to

            new Discussion($parent, $discussionRepository, $discussionId);
        }
    }

    /**
     * Find discussion
     *
     * @return bool
     */
    private function findDiscussion()
    {
        try {
            // Find discussion
            $this->discussion = $this->discussionRepository->findOrFail($this->discussionId);

            // Discussion not found
            if ($this->discussion === null) {
                return false;
            }

            // Get all posts
            $this->posts = $this->discussion->posts()->get()->getDictionary();

            // Get first post
            $discussionFirstPost = $this->discussion->firstPost()->get()->getDictionary();
            $this->firstPost = array_shift($discussionFirstPost);

            // First post not found
            if ($this->posts === null) {
                return false;
            }
        } catch (\Exception $e) {
            // Do nothing. It just did not work
            return false;
        }

        return true;
    }

    /**
     * Create tags
     */
    private function createTags()
    {
        // Set current URL
        $url = '/d/' . $this->discussion->getAttribute('id') . '-' . $this->discussion->getAttribute('slug');
        $fullUrl = $this->parent->getApplicationPath($url);

        // Update ld-json
        $this->parent
            ->setSchemaJson('@type', "QAPage")
            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Get posted on and Last posted on
        $lastPostedOn = $this->firstPost !== null ? $this->firstPost->getAttribute('edited_at') : $this->discussion->getAttribute('last_posted_at');
        $firstPostId = $this->discussion->getAttribute('first_post_id');
        $bestAnswerId = $this->enableBestAnswer ? $this->discussion->getAttribute('best_answer_post_id') : $this->enableBestAnswer;

        // Set short description
        $this->parent
            ->setTitle($this->discussion->getAttribute('title'))
            ->setPublishedOn($this->discussion->getAttribute('created_at'));

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
            'name' => $this->discussion->getAttribute('title'),
            'text' => $this->firstPost !== null ? $content : '',
            'dateCreated' => $this->acceptableDate($this->discussion->getAttribute('created_at')),
            'author' => [
                "@type" => "Person",
                "name" => $this->getUserName($this->discussion->getAttribute('user_id'))
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
                    "name" => $this->getUserName($post->getAttribute('user_id'))
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
            $this->parent->setSchemaBreadcrumb($this->discussion);
        }

        $mainEntity['suggestedAnswer'] = $posts;

        // $this->discussion->getAttribute('tags')

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
    private function getUserName($userId)
    {
        // First check local cache
        if(isset($this->cachedUsernames[$userId])) return $this->cachedUsernames[$userId];

        // Found user?
        $user = $this->parent->getUser($userId);

        // No result
        if ($user === null) return null;

        // Cache found username
        $this->cachedUsernames[$userId] = $user->getAttribute('display_name');

        // Return username
        return $this->cachedUsernames[$userId];
    }
}
