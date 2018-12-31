<?php
/**
 * Created by Jasper Vriends
 * www.vriends.co - GitHub @jaspervriends
 */
namespace JasperVriends\FlarumSeo\Managers;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Discussion\DiscussionRepository;
use Flarum\User\UserRepository;

use JasperVriends\FlarumSeo\Listeners\PageListener;

/**
 * Class ProfileManager
 * @package JasperVriends\FlarumSeo\Managers
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

        // Find user
        $this->user = is_numeric($username) ? $this->userRepository->findOrFail($username) : $this->userRepository->findByIdentification($username);

        // Is canonical URL?
        $this->isCanonical = is_numeric($username);

        // Create tags
        $this->createTags();
    }

    /**
     * Create tags
     */
    private function createTags()
    {
        if($this->user === null) return;

        $joinedAt = (new \DateTime($this->user->getAttribute('joined_at')))->format("c");

        // Profile title
        $profileTitle = $this->translator->trans("jaspervriends-flarum-seo.forum.profile_title", [
            '{username}' => $this->user->getAttribute('username'),
        ]);

        // Profile description
        $profileDescription = $this->translator->trans("jaspervriends-flarum-seo.forum.profile_description", [
            '{username}' => $this->user->getAttribute('username'),
            '{discussion_count}' => $this->user->getAttribute('discussion_count'),
            '{comment_count}' => $this->user->getAttribute('comment_count')
        ]);


        $this->parent
            // Page type
            ->setMetaPropertyTag('og:type', 'profile')

            // Add Schema.org metadata: ProfilePage https://schema.org/ProfilePage
            ->setSchemaJson('@type', 'ProfilePage')
            ->setSchemaJson('name', $this->user->getAttribute('username'))
            ->setSchemaJson('dateCreated', $joinedAt);

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
            ->setCanonicalUrl('/u/' . ($this->isCanonical ? $this->user->getAttribute('username') : $this->user->getAttribute('id')));
    }
}