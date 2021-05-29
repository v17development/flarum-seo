<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\User\UserRepository;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Profile page
 * 
 * @package V17Development\FlarumSeo\Managers
 */
class Profile
{
    /**
     * @var PageListener
     */
    protected $parent;

    /**
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @param UserRepository $userRepository
     * @param TranslatorInterface $translator
     */
    public function __construct(UserRepository $userRepository, TranslatorInterface $translator)
    {
        $this->userRepository = $userRepository;
        $this->translator = $translator;
    }
    
    /**
     * @param PageListener $parent
     * @param $username
     */
    public function handle(PageListener $parent, $username)
    {
        $this->parent = $parent;

        try {
            // Find user
            $user = is_numeric($username) ? $this->userRepository->findOrFail($username) : $this->userRepository->findByIdentification($username);

            // Create tags
            $this->createTags($user);
        } catch (\Exception $e) {

        }
    }

    /**
     * Create tags
     */
    private function createTags($user)
    {
        if($user === null) return;

        $joinedAt = (new \DateTime($user->getAttribute('joined_at')))->format("c");

        // Profile title
        $profileTitle = $this->translator->trans("v17development-flarum-seo.forum.profile_title", [
            'username' => $user->getAttribute('display_name'),
        ]);

        // Profile description
        $profileDescription = $this->translator->trans("v17development-flarum-seo.forum.profile_description", [
            'username' => $user->getAttribute('display_name'),
            'discussion_count' => $user->getAttribute('discussion_count'),
            'comment_count' => $user->getAttribute('comment_count')
        ]);

        $this->parent
            // Page type
            ->setMetaPropertyTag('og:type', 'profile')
            ->setMetaPropertyTag('profile:username', $user->getAttribute('username'))

            // Add Schema.org metadata: ProfilePage https://schema.org/ProfilePage
            ->setSchemaJson('@type', 'ProfilePage')
            ->setSchemaJson('name', $user->getAttribute('display_name'))
            ->setSchemaJson('dateCreated', $joinedAt);

        // Add avatar
        if($user->getAttribute('avatar_url') !== null)
        {
            $this->parent->setImage($user->getAttribute('avatar_url'));
        }

        // Add bio if exists
        if($user->getAttribute('bio') !== null)
        {
            $this->parent->setSchemaJson('about', $user->getAttribute('bio'));
        }

        $this->parent
            ->setSchemaJson('commentCount', $user->getAttribute('comment_count'))

            // Description
            ->setTitle($profileTitle)

            // Description
            ->setDescription($profileDescription)

            // Profile URL
            ->setUrl('/u/' . $user->getAttribute('username'))

            // Canonical url
            ->setCanonicalUrl('/u/' . $user->getAttribute('username'));
    }
}