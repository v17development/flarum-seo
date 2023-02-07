<?php

namespace V17Development\FlarumSeo\SeoMeta;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Illuminate\Database\Eloquent\Model;

class SeoMeta extends AbstractModel
{
    protected $table = 'seo_meta';

    protected $fillable = ['object_id', 'object_type'];

    /**
     * {@inheritdoc}
     */
    protected $dates = ['created_at', 'updated_at'];

    public static function build(string $objectType, int $objectId, bool $autoUpdate = true)
    {
        $seoMeta = new static();
        $seoMeta->object_id = $objectId;
        $seoMeta->object_type = $objectType;
        $seoMeta->auto_update_data = $autoUpdate;
        $seoMeta->created_at = Carbon::now();

        return $seoMeta;
    }

    /**
     * Find the SEO meta by object type
     * 
     * @param string $objectType Name of the object
     * @param string $objectId ID of the object
     */
    public static  function findByObjectType(string $objectType, int $objectId): Model
    {
        return self::firstOrCreate([
            'object_type' => $objectType,
            'object_id' => $objectId
        ]);
    }

    /**
     * Find the SEO meta of an object from a model
     * 
     * @param Model $model The model
     */
    public static  function findOneByModel(Model $model): ?Model
    {
        return self::where([
            'object_type' => $model->getTable(),
            'object_id' => $model->getKey()
        ])->firstOrNull();
    }

    /**
     * Find or create the SEO meta of an object from a model
     * 
     * @param Model $model The model
     */
    public static  function findByModelOrCreate(Model $model): Model
    {
        return self::firstOrCreate([
            'object_type' => $model->getTable(),
            'object_id' => $model->getKey()
        ]);
    }
}
