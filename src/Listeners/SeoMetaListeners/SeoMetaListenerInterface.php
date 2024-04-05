<?php

namespace V17Development\FlarumSeo\Listeners\SeoMetaListeners;

interface SeoMetaListenerInterface
{
    /**
     * Handles the specific event of a model being updated
     */
    public function handle($event);

    /**
     * Handles the model and updates properties
     * 
     * Should be public since it can be reused in Page
     */
    public function updateMeta($meta, $model);
}
