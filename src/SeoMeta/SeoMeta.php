<?php

namespace V17Development\FlarumSeo\SeoMeta;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;

class SeoMeta extends AbstractModel
{
    protected $table = 'seo_meta';

    /**
     * {@inheritdoc}
     */
    protected $dates = ['created_at', 'updated_at'];

    public static function build(int $objectId, string $objectType, bool $autoUpdate = true)
    {
        $seoMeta = new static();
        $seoMeta->object_id = $objectId;
        $seoMeta->object_type = $objectType;
        $seoMeta->auto_update_data = $autoUpdate;
        $seoMeta->created_at = Carbon::now();

        return $seoMeta;
    }
}
