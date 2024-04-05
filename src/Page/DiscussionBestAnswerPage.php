<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Discussion\DiscussionRepository;
use Flarum\Extension\ExtensionManager;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\UserRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

class DiscussionBestAnswerPage implements PageDriverInterface
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
     * @var ExtensionManager
     */
    protected $extensionManager;

    /**
     * @var UrlGenerator
     */
    protected $urlGenerator;

    /**
     * @var Discussion
     */
    protected $discussionFallback;

    /**
     * @param SettingsRepositoryInterface $settingsRepositoryInterface
     * @param DiscussionRepository $discussionRepository
     * @param TranslatorInterface $translator
     * @param ExtensionManager $extensionManager
     * @param UrlGenerator $urlGenerator
     * @param Discussion $discussionFallback
     */
    public function __construct(
        SettingsRepositoryInterface $settingsRepositoryInterface,
        DiscussionRepository $discussionRepository,
        UserRepository $userRepository,
        ExtensionManager $extensionManager,
        UrlGenerator $urlGenerator,
        Discussion $discussionFallback
    ) {
        $this->settingsRepositoryInterface = $settingsRepositoryInterface;
        $this->discussionRepository = $discussionRepository;
        $this->userRepository = $userRepository;
        $this->extensionManager = $extensionManager;
        $this->urlGenerator = $urlGenerator;
        $this->discussionFallback = $discussionFallback;
    }

    public function extensionDependencies(): array
    {
        return ['flarum-tags'];
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
        // Simple discussion tags is set up
        if ($this->settingsRepositoryInterface->get('seo_post_crawler', 0) == 0) return;

        // Get discussion ID from params
        $discussionId = Arr::get($request->getQueryParams(), 'id');

        try {
            // Find discussion
            $discussion = $this->discussionRepository->findOrFail($discussionId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing, no model found
            return;
        }

        // Fallback to simple discussions for not-answer tags
        $enableBestAnswer = $this->extensionManager->isEnabled('fof-best-answer');

        if ($enableBestAnswer && $discussion->tags()->where('is_qna', true)->count() === 0) {
            $this->discussionFallback->handle($request, $properties);
            return;
        }

        $enableLikes = $this->extensionManager->isEnabled('flarum-likes');
        $firstPost = $discussion->firstPost()->first();

        if ($firstPost) {
            $content = $firstPost->formatContent($request);
        }

        // Get seo-meta-date
        $seoMeta = SeoMeta::findByModelOrCreate(
            $discussion,
            // Meta didn't exist yet, create one
            function (SeoMeta $meta) use ($discussion, $firstPost, $properties, $content) {
                $meta->title = $discussion->title;

                $meta->created_at = $discussion->created_at;

                $meta->updated_at = $firstPost ? $firstPost->edited_at : $discussion->last_posted_at;

                // Set discussion description and image
                if ($content) {
                    // Set page description
                    $meta->description = $properties->generateDescriptionFromContent($content);

                    // Set page image
                    if ($image = $properties->getImageFromContent($content)) {
                        $meta->open_graph_image = $image;
                        $meta->open_graph_image_source = 'auto';
                    }
                }
            }
        );

        // Update ld-json
        $properties
            ->setSchemaJson('@type', "QAPage")

            // Set page type article
            ->setMetaPropertyTag('og:type', 'article');

        // Generate data
        $properties->generateTagsFromMetaData($seoMeta);

        // Get posted on and Last posted on
        $bestAnswerId = $enableBestAnswer ? $discussion->best_answer_post_id : null;

        // Update topic url
        $properties->setUrl($this->urlGenerator->to('forum')->route('discussion', ['id' => $discussion->id . '-' . $discussion->slug]), false);

        // Schema
        $mainEntity = [
            '@type' => 'Question',
            'name' => $seoMeta->title,
            'text' => $firstPost !== null ? $content : '',
            'dateCreated' => $seoMeta->created_at,
            'author' => [
                "@type" => "Person",
                "name" => $discussion->user() ? $discussion->user()->first()->getDisplayNameAttribute() : null
            ],
            'answerCount' => $discussion->comment_count - 1
        ];

        // Generate a breadcrum if discussion has tags
        if ($discussion->tags()->count() >= 1) {
            $tags = $discussion->tags()->get()->all();
            $properties->generateSchemaBreadcrumb(array_map(function ($tag) {
                return [
                    'name' => $tag->name,
                    'url' => $this->urlGenerator->to('forum')->route('tag', ['slug' => $tag->slug])
                ];
            }, $tags));
        }

        // Only add suggested answers property if there are posts
        $mainEntity['suggestedAnswer'] = [];

        // Get all public comments for this discussion
        $posts = $discussion->posts()->where([
            'type' => 'comment',
            'is_private' => false
        ])
            ->where('number', '>', '1')->get();

        foreach ($posts as $post) {
            // Temp post
            $generatedPost = [
                '@type' => 'Answer',
                'text' => $post->formatContent(),
                'dateCreated' => (new \DateTime($post->created_at))->format("c"),
                'url' => $this->urlGenerator->to('forum')->route('discussion', ['id' => $discussion->id . '-' . $discussion->slug, 'near' => $post->number]),
                'author' => [
                    "@type" => "Person",
                    "name" => $post->user ? $post->user->display_name : null
                ]
            ];

            // Upvote/like count
            $generatedPost['upvoteCount'] = $enableLikes ? $post->likes->count() : 0;

            // Set accepted answer
            if ($bestAnswerId === $post->id) {
                $mainEntity['acceptedAnswer'] = $generatedPost;
            }
            // Add to answers
            else {
                $mainEntity['suggestedAnswer'][] = $generatedPost;
            }
        }

        $properties->setSchemaJson('mainEntity', $mainEntity);
    }
}
