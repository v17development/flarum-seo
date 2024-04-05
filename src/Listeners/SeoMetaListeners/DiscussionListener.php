<?php

namespace V17Development\FlarumSeo\Listeners\SeoMetaListeners;

use Flarum\Discussion\Event as DiscussionEvent;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;
use V17Development\FlarumSeo\SeoProperties;

/**
 * Listen to discussion creation, update or deleted
 */
class DiscussionListener implements SeoMetaListenerInterface
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
        $meta = SeoMeta::findOneByModel($event->discussion);

        // Find and delete meta-data
        if ($event::class === DiscussionEvent\Deleting::class) {
            // Meta existed, delete
            if ($meta) {
                $meta->delete();
            }

            return;
        }

        // Create new meta by model
        if (!$meta) {
            $meta = SeoMeta::buildByModel($event->discussion);
        }

        // Do not auto update
        if (!$meta->auto_update_data) {
            return;
        }

        $this->updateMeta($meta, $event->discussion);

        // Update
        $meta->save();
    }

    /**
     * Public function to update 
     */
    public function updateMeta($meta, $discussion)
    {
        $meta->title = $discussion->title;

        $meta->created_at = $discussion->created_at;

        $firstPost = $discussion->firstPost;

        // If a discussion has a first post, use edited_at time if intial post was more recent edited than the last post was posted 
        if ($firstPost) {
            $meta->updated_at = $firstPost->edited_at > $discussion->last_posted_at ? $firstPost->edited_at : $discussion->last_posted_at;
        } else {
            $meta->updated_at = $discussion->last_posted_at;
        }

        // Set discussion description and image
        if ($firstPost) {
            $content = $firstPost->formatContent();

            // Set page description
            $meta->description = $this->seoProperties->generateDescriptionFromContent($content);

            // Only update image if source was set to auto and is not managed by a different extension
            if (!$meta->open_graph_image_source || $meta->open_graph_image_source === 'auto') {
                // Set page image
                if ($image = $this->seoProperties->getImageFromContent($content)) {
                    $meta->open_graph_image = $image;
                    $meta->open_graph_image_source = 'auto';
                }
            }
        }
    }
}
