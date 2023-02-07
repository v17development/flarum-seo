<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Tags\TagRepository;
use Flarum\User\UserRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoProperties;

class ProfilePage implements PageDriverInterface
{
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

    public function extensionDependencies(): array
    {
        return [];
    }

    public function handleRoutes(): array
    {
        return ['user'];
    }

    /**
     * @param ServerRequestInterface $request
     */
    public function handle(
        ServerRequestInterface $request,
        SeoProperties $properties
    ) {
        $username = Arr::get($request->getQueryParams(), 'username');

        try {
            $user = is_numeric($username) ? $this->userRepository->findOrFail($username) : $this->userRepository->findByIdentification($username);

            // Make sure there's a user
            if ($user === null) return;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing. It just did not work
            return;
        }

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

        $properties
            // Page type
            ->setMetaPropertyTag('og:type', 'profile')
            ->setMetaPropertyTag('profile:username', $user->getAttribute('username'))

            // Add Schema.org metadata: ProfilePage https://schema.org/ProfilePage
            ->setSchemaJson('@type', 'ProfilePage')
            ->setSchemaJson('name', $user->getAttribute('display_name'))
            ->setSchemaJson('dateCreated', $joinedAt);

        // Add avatar
        if ($user->getAttribute('avatar_url') !== null) {
            $properties->setImage($user->getAttribute('avatar_url'));
        }

        // Add bio if exists
        if ($user->getAttribute('bio') !== null) {
            $properties->setSchemaJson('about', $user->getAttribute('bio'));
        }

        $properties
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
