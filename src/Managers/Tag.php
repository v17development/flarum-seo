<?php
namespace V17Development\FlarumSeo\Managers;

use Flarum\Tags\TagRepository;
use V17Development\FlarumSeo\Listeners\PageListener;


/**
 * Class Tag
 * @package V17Development\FlarumSeo\Managers
 */
class Tag
{
    // Parent and Tag Repository
    protected $parent;
    protected $tagRepository;

    // Current tag
    protected $tag;

    /**
     * Discussion constructor.
     * @param PageListener $parent
     * @param $tag
     */
    public function __construct(PageListener $parent, $tag)
    {
        $this->parent = $parent;
        $this->tagRepository = new TagRepository();

        // I do support it, but it didn't work
        if(!is_numeric($tag))
        {
            $tag = $this->tagRepository->getIdForSlug($tag);
        }

        try {
            // Find tag
            $this->tag = $this->tagRepository->findOrFail($tag);
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
        if(!method_exists($this->tag, "getAttribute")) return;

        $lastPostedAt = (new \DateTime($this->tag->getAttribute('last_posted_at')))->format("c");

        // The tag plugin does not set page titles... Then we'll do that
        $this->parent
            ->setPageTitle($this->tag->getAttribute('name'))
            ->setTitle($this->tag->getAttribute('name'));

        $this->parent
            // Add Schema.org metadata: CollectionPage https://schema.org/CollectionPage
            ->setSchemaJson('@type', 'CollectionPage')
            ->setSchemaJson('about', $this->tag->getAttribute('description'))
            ->setUpdatedOn($lastPostedAt)

            // Tag URL
            ->setUrl('/t/' . $this->tag->getAttribute('slug'))

            // Description
            ->setDescription($this->tag->getAttribute('description'))

            // Canonical url
            ->setCanonicalUrl('/t/' . $this->tag->getAttribute('slug'));
    }
}