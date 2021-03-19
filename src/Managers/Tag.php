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

    /**
     * @var TagRepository $tagRepository
     */
    protected $tagRepository;

    /**
     * @param TagRepository $tagRepository
     */
    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @param PageListener $parent
     * @param $tag
     */
    public function handle(PageListener $parent, $tagId)
    {
        // I do support it, but it didn't work
        if(!is_numeric($tagId))
        {
            $tagId = $this->tagRepository->getIdForSlug($tagId);
        }

        try {
            // Find tag
            $tag = $this->tagRepository->findOrFail($tagId);
            
            if(!method_exists($tag, "getAttribute")) return;

            $lastPostedAt = (new \DateTime($tag->getAttribute('last_posted_at')))->format("c");

            // The tag plugin does not set page titles... Then we'll do that
            $parent
                ->setPageTitle($tag->getAttribute('name'))
                ->setTitle($tag->getAttribute('name'));

            $parent
                // Add Schema.org metadata: CollectionPage https://schema.org/CollectionPage
                ->setSchemaJson('@type', 'CollectionPage')
                ->setSchemaJson('about', $tag->getAttribute('description'))
                ->setUpdatedOn($lastPostedAt)

                // Tag URL
                ->setUrl('/t/' . $tag->getAttribute('slug'))

                // Description
                ->setDescription($tag->getAttribute('description'))

                // Canonical url
                ->setCanonicalUrl('/t/' . $tag->getAttribute('slug'));
        }
        catch (\Exception $e) {
            // Do nothing. It just did not work
        }
    }
}