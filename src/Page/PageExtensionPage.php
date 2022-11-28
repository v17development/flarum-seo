<?php

namespace V17Development\FlarumSeo\Page;

use FoF\Pages\PageRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoProperties;

class PageExtensionPage implements PageDriverInterface
{
    /**
     * @var PageRepository
     */
    protected $pageRepository;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @param PageRepository $pageRepository
     * @param TranslatorInterface $translator
     */
    public function __construct(PageRepository $pageRepository, TranslatorInterface $translator)
    {
        $this->pageRepository = $pageRepository;
        $this->translator = $translator;
    }

    public function extensionDependencies(): array
    {
        return ['fof-pages'];
    }

    public function handleRoutes(): array
    {
        return ['pages.home'];
    }

    /**
     * @param ServerRequestInterface $request
     */
    public function handle(
        ServerRequestInterface $request,
        SeoProperties $properties
    ) {
        $pageId = Arr::get($request->getQueryParams(), 'id');

        try {
            $page = $this->pageRepository->findOrFail($pageId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Do nothing, no model found
            return;
        }

        // Published on
        $publishedOn = (new \DateTime($page->getAttribute('time')))->format("c");

        // Modified on
        $modifiedOn = ($page->getAttribute('edit_time') !== NULL ? (new \DateTime($page->getAttribute('edit_time')))->format("c") : false);

        // Description
        $content = ($page->getAttribute('is_html') ? $page->getAttribute('content') : $page->getAttribute('contentHtml'));

        $properties
            // Add Schema.org metadata: WebPage https://schema.org/WebPage
            ->setSchemaJson('@type', 'WebPage')
            ->setSchemaJson('text', e(strip_tags($content)))

            // Published on
            ->setPublishedOn($publishedOn)

            // Tag URL
            ->setUrl('/p/' . $page->getAttribute('id') . '-' . $page->getAttribute('slug'))

            // Description
            ->setDescription($content)

            // Canonical url
            ->setCanonicalUrl('/p/' . $page->getAttribute('id'));

        if ($modifiedOn) {
            $this->parent->setUpdatedOn($modifiedOn);
        }
    }
}
