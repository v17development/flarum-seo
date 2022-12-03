<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Discussion\DiscussionRepository;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\UserRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoProperties;

class DiscussionSimpePage implements PageDriverInterface
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settingsRepositoryInterface;

    /**
     * @var DiscussionRepository
     */
    protected $discussionRepository;

    /**
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @param SettingsRepositoryInterface $settingsRepositoryInterface
     * @param DiscussionRepository $discussionRepository
     * @param TranslatorInterface $translator
     */
    public function __construct(
        SettingsRepositoryInterface $settingsRepositoryInterface,
        DiscussionRepository $discussionRepository,
        UserRepository $userRepository
    ) {
        $this->settingsRepositoryInterface = $settingsRepositoryInterface;
        $this->discussionRepository = $discussionRepository;
        $this->userRepository = $userRepository;
    }

    public function extensionDependencies(): array
    {
        return [];
    }

    public function handleRoutes(): array
    {
        return ['discussion'];
    }

    /**
     * @param ServerRequestInterface $request
     * @param SeoProperties $properties
     */
    public function handle(
        ServerRequestInterface $request,
        SeoProperties $properties
    ) {
        // Advanced discussion tags is set up
        if ($this->settingsRepositoryInterface->get('seo_post_crawler', 1) == 2) return;

        // Get discussion ID from params
        $discussionId = Arr::get($request->getQueryParams(), 'id');

        try {
            // Find discussion
            $discussion = $this->discussionRepository->findOrFail($discussionId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing, no model found
            return;
        }

        $firstPost = $discussion->firstPost()->first();

        // Update ld-json
        $properties
            ->setSchemaJson('@type', "DiscussionForumPosting")

            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Get last posted on
        $lastPostedOn = $firstPost !== null ? $firstPost->edited_at : $discussion->last_posted_at;

        // Set short description
        $properties
            ->setTitle($discussion->title, true)
            ->setPublishedOn($discussion->created_at);

        // Set discussion description, only when a first post exists
        if ($firstPost !== null) {
            $content = $firstPost->formatContent($request);

            // Set page description
            $properties
                ->setDescription($content);

            // Set page image
            if ($image = $properties->getImageFromContent($content)) {
                $properties->setImage($image);
            }
        }

        // Add updated
        if ($lastPostedOn !== null) {
            $properties->setUpdatedOn($lastPostedOn);
        }

        // Update topic url
        $properties->setUrl('/d/' . $discussion->id . '-' . $discussion->slug);

        try {
            // Add author to the page meta data
            $user = $discussion->user()->first();

            // Set author data if found
            if ($user !== null) {
                // author: https://schema.org/author typeof: https://schema.org/Person
                $properties->setSchemaJson('author', [
                    "@type" => "Person",
                    "name" => $user->getDisplayNameAttribute(),
                    "url" => $properties->withApplicationPath('/u/' . $user->username)
                ]);
            }
        } catch (\Exception $e) {
            // User does not exists anymore
        }
    }
}
