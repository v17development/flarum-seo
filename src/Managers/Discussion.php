<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\Discussion\DiscussionRepository;
use Flarum\User\UserRepository;
use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Class Discussion
 * @package V17Development\FlarumSeo\Managers
 */
class Discussion
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

        try {
            // Find discussion
            $discussion = $this->discussionRepository->findOrFail($discussionId);

            // Find first post
            $post = $discussion->firstPost()->get()->getDictionary();

            $firstPost = array_shift($post);

            $this->createTags($discussion, $firstPost);
        }
        catch (\Exception $e) {
            // Do nothing. It just did not work
        }
    }

    /**
     * Create tags
     * @param $discussion
     * @param $firstPost
     */
    private function createTags($discussion, $firstPost)
    {
        // Update ld-json
        $this->parent
            ->setSchemaJson('@type', "DiscussionForumPosting")

            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Get last posted on
        $lastPostedOn = $firstPost !== null ? $firstPost->getAttribute('edited_at') : $discussion->getAttribute('last_posted_at');

        // Set short description
        $this->parent
            ->setTitle($discussion->getAttribute('title'), true)
            ->setPublishedOn($discussion->getAttribute('created_at'));

        // Set discussion description, only when a first post exists
        if($firstPost !== null) {
            $content = $firstPost->formatContent();

            // Set page description
            $this->parent
                ->setDescription($content)

                // Set page image
                ->setImageFromContent($content);
        }

        // Add updated
        if($lastPostedOn !== null)
        {
            $this->parent->setUpdatedOn($lastPostedOn);
        }

        // Update topic url
        $this->parent->setUrl('/d/' . $discussion->getAttribute('id') . '-' . $discussion->getAttribute('slug'));

        try {
            // Add author to the page meta data
            $findUser = $this->userRepository->findOrFail($discussion->getAttribute('user_id'));

            // Set author data if found
            if ($findUser !== null) {
                // author: https://schema.org/author typeof: https://schema.org/Person
                $this->parent->setSchemaJson('author', [
                    "@type" => "Person",
                    "name" => $findUser->getAttribute('display_name'),
                    "url" => $this->parent->getApplicationPath('/u/' . $findUser->getAttribute('username'))
                ]);
            }
        } catch (\Exception $e) {
            // User does not exists anymore
        }
    }
}