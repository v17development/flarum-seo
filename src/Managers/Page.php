<?php
namespace V17Development\FlarumSeo\Managers;

use FoF\Pages\PageRepository;
use V17Development\FlarumSeo\Listeners\PageListener;

/**
 * Class Page
 * @package V17Development\FlarumSeo\Managers
 */
class Page
{
    /**
     * @var PageListener
     */
    protected $parent;

    /**
     * @var PageRepository
     */
    protected $pageRepository;

    /**
     * @param PageRepository $pageRepository
     */
    public function __construct(PageRepository $pageRepository) {
        $this->pageRepository = $pageRepository;
    }

    /**
     * Page constructor.
     * @param PageListener $parent
     * @param $page
     */
    public function handle(PageListener $parent, $page)
    {
        $this->parent = $parent;

        try {
            // Find page
            $page = $this->pageRepository->findOrFail($page);

            // Create tags
            $this->createTags($page);
        }
        catch (\Exception $e) {
            // Do nothing. It just did not work
        }
    }

    /**
     * Create tags
     */
    private function createTags($page)
    {
        // Published on
        $publishedOn = (new \DateTime($page->getAttribute('time')))->format("c");

        // Modified on
        $modifiedOn = ($page->getAttribute('edit_time') !== NULL ? (new \DateTime($page->getAttribute('edit_time')))->format("c") : false);

        // Description
        $content = ($page->getAttribute('is_html') ? $page->getAttribute('content') : $page->getAttribute('contentHtml'));

        $this->parent
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

        if($modifiedOn) {
            $this->parent->setUpdatedOn($modifiedOn);
        }
    }
}