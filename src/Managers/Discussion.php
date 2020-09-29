<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\Discussion\DiscussionRepository;
use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Class Discussion
 * @package V17Development\FlarumSeo\Managers
 */
class Discussion
{
    // Parent and Discussion Repository
    protected $parent;
    protected $discussionRepository;

    // Current discussion
    protected $discussionId = null;
    protected $discussion = null;
    protected $firstPost = null;

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

        // Found discussion and discussion
        $this->findDiscussion();

        // Discussion not found
        if($this->discussion === null) return;

        // Create tags
        $this->createTags();
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
            if($this->discussion === null)
            {
                return false;
            }

            // Find first post
            $post = $this->discussion->firstPost()->get()->getDictionary();

            $this->firstPost = array_shift($post);

            // First post not found
            if($this->firstPost === null) {
                return false;
            }
        }
        catch (\Exception $e) {
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
        // Update ld-json
        $this->parent
            ->setSchemaJson('@type', "DiscussionForumPosting")

            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Get last posted on
        $lastPostedOn = $this->firstPost !== null ? $this->firstPost->getAttribute('edited_at') : $this->discussion->getAttribute('last_posted_at');

        // Set short description
        $this->parent
            ->setTitle($this->discussion->getAttribute('title'), true)
            ->setPublishedOn($this->discussion->getAttribute('created_at'));

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
        if($lastPostedOn !== null)
        {
            $this->parent->setUpdatedOn($lastPostedOn);
        }

        // Update topic url
        $this->parent->setUrl('/d/' . $this->discussion->getAttribute('id') . '-' . $this->discussion->getAttribute('slug'));

        try {
            // Add author to the page meta data
            $findUser = $this->parent->getUser($this->discussion->getAttribute('user_id'));

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