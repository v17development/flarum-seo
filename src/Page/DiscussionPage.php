<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Discussion\DiscussionRepository;
use Flarum\Extension\ExtensionManager;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\UserRepository;
use Illuminate\Support\Arr;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

class DiscussionPage implements PageDriverInterface
{
    use DispatchEventsTrait;

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
     * @var ExtensionManager
     */
    protected $extensionManager;

    /**
     * @var UrlGenerator
     */
    protected $urlGenerator;

    /**
     * @param SettingsRepositoryInterface $settingsRepositoryInterface
     * @param DiscussionRepository $discussionRepository
     * @param TranslatorInterface $translator
     */
    public function __construct(
        SettingsRepositoryInterface $settingsRepositoryInterface,
        DiscussionRepository $discussionRepository,
        UserRepository $userRepository,
        ExtensionManager $extensionManager,
        UrlGenerator $urlGenerator,
        Dispatcher $events
    ) {
        $this->settingsRepositoryInterface = $settingsRepositoryInterface;
        $this->discussionRepository = $discussionRepository;
        $this->userRepository = $userRepository;
        $this->extensionManager = $extensionManager;
        $this->urlGenerator = $urlGenerator;
        $this->events = $events;
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
        // Get discussion ID from params
        $discussionId = Arr::get($request->getQueryParams(), 'id');

        try {
            // Find discussion
            $discussion = $this->discussionRepository->findOrFail($discussionId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing, no model found
            return;
        }

        $tagsEnabled = $this->extensionManager->isEnabled('flarum-tags');
        $enableBestAnswer = $this->extensionManager->isEnabled('fof-best-answer');

        // Do not continue discussion matches a FriendsOfFlarum BestAnswer discussion (if enabled)
        if (
            $this->settingsRepositoryInterface->get('seo_post_crawler', 0) == 1 &&
            $tagsEnabled && (!$enableBestAnswer || ($enableBestAnswer && $discussion->tags()->where('is_qna', true)->count() >= 1))
        ) {
            return;
        }

        // Get seo-meta-date
        $seoMeta = SeoMeta::findByModelOrCreate(
            $discussion
        );

        // Run events in case the model was created
        $this->dispatchEventsFor($seoMeta);

        // Update ld-json
        $properties
            ->setSchemaJson('@type', "DiscussionForumPosting")

            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Generate data
        $properties->generateTagsFromMetaData($seoMeta);

        // Update topic url
        $properties->setUrl($this->urlGenerator->to('forum')->route('discussion', ['id' => $discussion->id . '-' . $discussion->slug]), false);

        try {
            // Add author to the page meta data
            $user = $discussion->user()->first();

            // Set author data if found
            if ($user !== null) {
                // author: https://schema.org/author typeof: https://schema.org/Person
                $properties->setSchemaJson('author', [
                    "@type" => "Person",
                    "name" => $user->getDisplayNameAttribute(),
                    "url" => $this->urlGenerator->to('forum')->route('user', ['username' => $user->username])
                ]);
            }
        } catch (\Exception $e) {
            // User does not exists anymore
        }

        // Generate a breadcrum if discussion has tags
        if ($tagsEnabled && $discussion->tags->count() >= 1) {
            $properties->generateSchemaBreadcrumb(
                $discussion->tags->map(fn($tag) => [
                    'name' => $tag->name,
                    'url' => $this->urlGenerator->to('forum')->route('tag', ['slug' => $tag->slug])
                ])->toArray()
            );
        }
    }
}
