<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Tags\TagRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoProperties;

class TagPage implements PageDriverInterface
{
    /**
     * @var TagRepository $tagRepository
     */
    protected $tagRepository;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @param TagRepository $tagRepository
     */
    public function __construct(TagRepository $tagRepository, TranslatorInterface $translator)
    {
        $this->tagRepository = $tagRepository;
        $this->translator = $translator;
    }

    /**
     * Seo Extender
     */
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
            $tagId = $this->tagRepository->getIdForSlug($tagId);
        }

        try {
            // Find tag
            $tag = $this->tagRepository->findOrFail($tagId);

            if (!method_exists($tag, "getAttribute")) return;

            $lastPostedAt = (new \DateTime($tag->last_posted_at))->format("c");

            // Get Tag description
            $tagDescription = $tag->description ?? $this->translator->trans('flarum-tags.forum.tag.meta_description_text', ['{tag}' => $tag->name]);

            // The tag plugin does not set page titles... Then we'll do that
            $properties
                ->setTitle($tag->name);

            $properties
                // Add Schema.org metadata: CollectionPage https://schema.org/CollectionPage
                ->setSchemaJson('@type', 'CollectionPage')
                ->setSchemaJson('about', $tagDescription)
                ->setUpdatedOn($lastPostedAt)

                // Tag URL
                ->setUrl('/t/' . $tag->slug)

                // Description
                ->setDescription($tagDescription)

                // Canonical url
                ->setCanonicalUrl('/t/' . $tag->slug);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing. It just did not work
        }
    }
}
