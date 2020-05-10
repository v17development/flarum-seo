<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\Discussion\DiscussionRepository;
use Flarum\User\UserRepository;

use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Class Profile
 * @package V17Development\FlarumSeo\Managers
 */
class Profile
{
    // Parent and User Repository
    protected $parent;
    protected $userRepository;
    protected $translator;

    // Current profile
    private $user = null;
    private $isCanonical = false;

    /**
     * Discussion constructor.
     * @param PageListener $parent
     * @param UserRepository $userRepository
     * @param $username
     */
    public function __construct(PageListener $parent, UserRepository $userRepository, $username)
    {
        $this->parent = $parent;
        $this->userRepository = $userRepository;
        $this->translator = app('translator');

        try {
            // Find user
            $this->user = is_numeric($username) ? $this->userRepository->findOrFail($username) : $this->userRepository->findByIdentification($username);

            // Is canonical URL?
            $this->isCanonical = is_numeric($username);

            // Create tags
            $this->createTags();
        } catch (\Exception $e) {

        }
    }

    /**
     * Create tags
     */
    private function createTags()
    {
        if($this->user === null) return;

        $joinedAt = (new \DateTime($this->user->getAttribute('joined_at')))->format("c");

        // Profile title
        $profileTitle = $this->translator->trans("v17development-flarum-seo.forum.profile_title", [
            '{username}' => $this->user->getAttribute('display_name'),
        ]);

        // Profile description
        $profileDescription = $this->translator->trans("v17development-flarum-seo.forum.profile_description", [
            '{username}' => $this->user->getAttribute('display_name'),
            '{discussion_count}' => $this->user->getAttribute('discussion_count'),
            '{comment_count}' => $this->user->getAttribute('comment_count')
        ]);


        $this->parent
            // Page type
            ->setMetaPropertyTag('og:type', 'profile')
            ->setMetaPropertyTag('profile:username', $this->user->getAttribute('username'))

            // Add Schema.org metadata: ProfilePage https://schema.org/ProfilePage
            ->setSchemaJson('@type', 'ProfilePage')
            ->setSchemaJson('name', $this->user->getAttribute('display_name'))
            ->setSchemaJson('dateCreated', $joinedAt);

        // Add avatar
        if($this->user->getAttribute('avatar_url') !== null)
        {
            $this->parent->setImage($this->user->getAttribute('avatar_url'));
        }

        // Add bio if exists
        if($this->user->getAttribute('bio') !== null)
        {
            $this->parent->setSchemaJson('about', $this->user->getAttribute('bio'));
        }

        $this->parent
            ->setSchemaJson('commentCount', $this->user->getAttribute('comment_count'))

            // Description
            ->setTitle($profileTitle)

            // Description
            ->setDescription($profileDescription)

            // Profile URL
            ->setUrl('/u/' . $this->user->getAttribute('username'))

            // Canonical url
            ->setCanonicalUrl('/u/' . $this->user->getAttribute('username'));
    }
}