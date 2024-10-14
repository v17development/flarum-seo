<?php

namespace V17Development\FlarumSeo\Api;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Serializer\ForumSerializer;

class AttachForumSerializerAttributes
{
    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(private SettingsRepositoryInterface $settings)
    {
    }

    /**
     * @param ForumSerializer $serializer
     * @param array $model
     * @param array $attributes
     */
    public function __invoke(ForumSerializer $serializer, $model, $attributes)
    {
        $actor = $serializer->getActor();

        $attributes['canConfigureSeo'] = (bool) $actor->hasPermissionLike('seo.canConfigure');

        return $attributes;
    }
}
