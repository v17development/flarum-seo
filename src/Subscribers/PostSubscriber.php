<?php

namespace V17Development\FlarumSeo\Subscribers;

use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;
use Flarum\Post\Event as PostEvent;

/**
 * Subscribe to post deleting, posted or revised
 */
class PostSubscriber
{
    public function __construct(
        private SeoProperties $seoProperties,
        private DiscussionSubscriber $discussionSubscriber
    ) {}

    /**
     * Subscribe to events
     * 
     * @param $events
     */
    public function subscribe($events)
    {
        $events->listen(PostEvent\Deleting::class, [$this, 'onModelEvent']);
        $events->listen(PostEvent\Posted::class, [$this, 'onModelEvent']);
        $events->listen(PostEvent\Revised::class, [$this, 'onModelEvent']);
    }

    /**
     * Handle model event
     *
     * @param $event
     */
    public function onModelEvent($event)
    {
        // Find meta
        $meta = SeoMeta::findOneByModel($event->post->discussion);

        // Create new meta by model
        if (!$meta) {
            $meta = SeoMeta::buildByModel($event->post->discussion);
        }

        // Do not auto update
        if (!$meta->auto_update_data) {
            return;
        }

        $this->discussionSubscriber->updateMeta($meta, $event->post->discussion);

        // Update
        $meta->save();
    }
}
