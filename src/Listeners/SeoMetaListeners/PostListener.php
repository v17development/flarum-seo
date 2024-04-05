<?php

namespace V17Development\FlarumSeo\Listeners\SeoMetaListeners;

use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

/**
 * Listen to discussion creation, update or deleted
 */
class PostListener
{
    public function __construct(
        private SeoProperties $seoProperties,
        private DiscussionListener $discussionListener
    ) {
    }

    /**
     * Get triggered
     *
     * @param $event
     */
    public function handle($event)
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

        $this->discussionListener->updateMeta($meta, $event->post->discussion);

        // Update
        $meta->save();
    }
}
