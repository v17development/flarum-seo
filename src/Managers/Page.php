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
    // Parent and Page Repository
    protected $parent;
    protected $pageRepository;

    // Current tag
    protected $page = null;

    /**
     * Page constructor.
     * @param PageListener $parent
     * @param $page
     */
    public function __construct(PageListener $parent, $page)
    {
        $this->parent = $parent;
        $this->pageRepository = new PageRepository();

        try {
            // Find page
            $this->page = $this->pageRepository->findOrFail($page);
        }
        catch (\Exception $e) {
            // Do nothing. It just did not work
            return false;
        }

        // Create tags
        $this->createTags();
    }

    /**
     * Create tags
     */
    private function createTags()
    {
        if($this->page === null || !method_exists($this->page, "getAttribute")) return;

        // Published on
        $publishedOn = (new \DateTime($this->page->getAttribute('time')))->format("c");

        // Modified on
        $modifiedOn = ($this->page->getAttribute('edit_time') !== NULL ? (new \DateTime($this->page->getAttribute('edit_time')))->format("c") : false);

        // Description
        $content = ($this->page->getAttribute('is_html') ? $this->page->getAttribute('content') : $this->page->getAttribute('contentHtml'));

        $this->parent
            // Add Schema.org metadata: WebPage https://schema.org/WebPage
            ->setSchemaJson('@type', 'WebPage')
            ->setSchemaJson('text', e(strip_tags($content)))

            // Published on
            ->setPublishedOn($publishedOn)

            // Tag URL
            ->setUrl('/p/' . $this->page->getAttribute('id') . '-' . $this->page->getAttribute('slug'))

            // Description
            ->setDescription($content)

            // Canonical url
            ->setCanonicalUrl('/p/' . $this->page->getAttribute('id'));

        if($modifiedOn) {
            $this->parent->setUpdatedOn($modifiedOn);
        }
    }
}