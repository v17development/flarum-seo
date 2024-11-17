<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Tags\TagRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

class TagPage implements PageDriverInterface
{
    use DispatchEventsTrait;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @param TagRepository $tagRepository
     */
    public function __construct(
        TranslatorInterface $translator,
        Dispatcher $events
    ) {
        $this->events = $events;
        $this->translator = $translator;
    }

    public function extensionDependencies(): array
    {
        return ['flarum-tags'];
    }

    public function handleRoutes(): array
    {
        return ['tag'];
    }

    /**
     * @param ServerRequestInterface $request
     */
    public function handle(
        ServerRequestInterface $request,
        SeoProperties $properties
    ) {
        $tagId = Arr::get($request->getQueryParams(), 'slug');

        // I do support it, but it didn't work
        if (!is_numeric($tagId)) {
            $tagId = resolve(TagRepository::class)->getIdForSlug($tagId);
        }

        try {
            $tag = resolve(TagRepository::class)->findOrFail($tagId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing, no model found
            return;
        }

        $seoMeta = SeoMeta::findByModelOrCreate($tag);

        // Run events in case the model was created
        $this->dispatchEventsFor($seoMeta);

        $properties->generateTagsFromMetaData($seoMeta);

        $properties
            // Add Schema.org metadata: CollectionPage https://schema.org/CollectionPage
            ->setSchemaJson('@type', 'CollectionPage')
            ->setSchemaJson('about', $seoMeta->description)
            // Tag URL
            ->setUrl('/t/' . $tag->slug)

            // Canonical url
            ->setCanonicalUrl('/t/' . $tag->slug);
    }
}
