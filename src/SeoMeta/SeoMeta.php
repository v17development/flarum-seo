<?php

namespace V17Development\FlarumSeo\SeoMeta;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Foundation\EventGeneratorTrait;
use Illuminate\Database\Eloquent\Model;
use V17Development\FlarumSeo\SeoMeta\Event\Created;

class SeoMeta extends AbstractModel
{
    use EventGeneratorTrait;

    protected $table = 'seo_meta';

    protected $fillable = [
        'object_id',
        'object_type',

        // Other data
        'title',
        'description',
        'keywords',
        'created_at',
        'updated_at'
    ];

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
     * Boot the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::created(function (self $seoMeta) {
            $seoMeta->raise(new Created($seoMeta));
        });
    }


    /**
     * Find the SEO meta by object type
     * 
     * @param string $objectType Name of the object
     * @param string $objectId ID of the object
     */
    public static function findByObjectType(string $objectType, int $objectId): Model
    {
        return self::firstOrCreate([
            'object_type' => $objectType,
            'object_id' => $objectId
        ]);
    }

    /**
     * Find the SEO meta by object type
     * 
     * @param string $objectType Name of the object
     * @param string $objectId ID of the object
     */
    public static function findByObjectTypeOrFail(string $objectType, int $objectId): Model
    {
        return self::where([
            ['object_type', '=', $objectType],
            ['object_id', '=', $objectId]
        ])->firstOrFail();
    }

    /**
     * Find the SEO meta by object type
     * 
     * @param string $objectType Name of the object
     * @param string $objectId ID of the object
     */
    public static function findByObjectTypeOrCreate(string $objectType, int $objectId, callable|null $fillables = null): Model
    {
        $query = self::where([
            ['object_type', '=', $objectType],
            ['object_id', '=', $objectId]
        ]);

        // No fillables
        if ($fillables === null) {
            return $query->firstOr(function () use ($objectType, $objectId): Model {
                $data = SeoMeta::build($objectType, $objectId);

                $data->save();

                return $data;
            });
        }

        return $query->firstOr(function () use ($objectType, $objectId, $fillables): Model {
            $data = SeoMeta::build($objectType, $objectId);

            $fillables($data);

            $data->save();

            return $data;
        });
    }

    /**
     * Find by slug
     * 
     * Could be used to add dynamic tags to pages that do not have a database row
     * For example: a blog home/overview page, knowledge base page, tags overview page etc.
     * 
     * @param string $objectType Name of the object
     * @param string $objectId ID of the object
     */
    public static function findOrCreateBySlug(string $pageSlug, callable|null $fillables = null): Model
    {
        return self::findByObjectTypeOrCreate(str_replace("-", "_", $pageSlug), -1, $fillables);
    }


    /**
     * Find the SEO meta of an object from a model
     * 
     * @param Model $model The model
     */
    public static function findOneByModel(Model $model): ?Model
    {
        return self::where([
            'object_type' => $model->getTable(),
            'object_id' => $model->getKey()
        ])->first();
    }

    /**
     * Find the SEO meta of an object from a model
     * 
     * @param Model $model The model
     */
    public static function buildByModel(Model $model): ?Model
    {
        return self::build($model->getTable(), $model->getKey());
    }

    /**
     * Find or create the SEO meta of an object from a model
     * 
     * @param Model $model The model
     */
    public static function findByModelOrCreate(Model $model, array|callable $fillables = []): Model
    {
        // Is an array with defaults
        if (!is_callable($fillables)) {
            return self::firstOrCreate([
                'object_type' => $model->getTable(),
                'object_id' => $model->getKey()
            ], $fillables);
        }

        return self::where([
            'object_type' => $model->getTable(),
            'object_id' => $model->getKey()
        ])->firstOr(function () use ($model, $fillables): Model {
            $data = SeoMeta::build($model->getTable(), $model->getKey());

            $fillables($data);

            $data->save();

            return $data;
        });
    }
}
