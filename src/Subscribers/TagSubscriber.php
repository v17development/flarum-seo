<?php

namespace V17Development\FlarumSeo\Subscribers;

use Flarum\Tags\Event as TagEvent;
use Flarum\Tags\Tag;
use Symfony\Contracts\Translation\TranslatorInterface;
use V17Development\FlarumSeo\SeoMeta\Event\Created;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

/**
 * Subscribe to tags creation, update or deleted
 */
class TagSubscriber
{
    public function __construct(private SeoProperties $seoProperties) {}

    /**
     * Subscribe function
     * 
     * @param $events
     */
    public function subscribe($events)
    {
        $events->listen(\Flarum\Tags\Event\Deleting::class, [$this, 'onModelEvent']);
        $events->listen(\Flarum\Tags\Event\Saving::class, [$this, 'onModelEvent']);
        $events->listen(Created::class, [$this, 'onMetaCreated']);
    }

    /**
     * Handle model event
     *
     * @param $event
     */
    public function onModelEvent($event)
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
     * Handle meta created event
     * 
     * @param Created $event
     */
    public function onMetaCreated(Created $event)
    {
        // Only update meta data if object type matches
        if ($event->objectType !== 'tags') return;

        // Find tag
        $tag = Tag::find($event->objectId);

        $this->updateMeta($event->seoMeta, $tag);

        $event->seoMeta->save();
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
