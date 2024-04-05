<?php

namespace V17Development\FlarumSeo\Listeners\SeoMetaListeners;

use Flarum\Tags\Event as TagEvent;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

/**
 * Listen to tags creation, update or deleted
 */
class TagListener implements SeoMetaListenerInterface
{
    public function __construct(private SeoProperties $seoProperties)
    {
    }

    /**
     * Get triggered
     *
     * @param $event
     */
    public function handle($event)
    {
        // Find meta
        $meta = SeoMeta::findOneByModel($event->tag);

        // Find and delete meta-data
        if ($event::class === TagEvent\Deleting::class) {
            // Meta existed, delete
            if ($meta) {
                $meta->delete();
            }

            return;
        }

        // Create new meta by model
        if (!$meta) {
            $meta = SeoMeta::buildByModel($event->tag);
        }

        // Do not auto update
        if (!$meta->auto_update_data) {
            return;
        }

        $this->updateMeta($meta, $event->tag);

        // Update
        $meta->save();
    }

    /**
     * Public function to update 
     */
    public function updateMeta($meta, $tag)
    {
        $meta->title = $tag->name;

        $meta->created_at = $tag->created_at ?? new \DateTime('');

        $meta->updated_at = $tag->last_posted_at;

        // Set discussion description and image
        $description = $tag->description ?? resolve(TranslatorInterface::class)->trans('flarum-tags.forum.tag.meta_description_text', ['{tag}' => $tag->name]);

        // Get Tag description
        $meta->description = $this->seoProperties->generateDescriptionFromContent($description);
    }
}
