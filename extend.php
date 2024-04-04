<?php

namespace V17Development\FlarumSeo;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion as FlarumDiscussion;
use Flarum\Extend;
use V17Development\FlarumSeo\ConfigureLinks;
use V17Development\FlarumSeo\Api\DeleteSocialMediaImageController;
use V17Development\FlarumSeo\Api\Serializers\SeoMetaSerializer;
use V17Development\FlarumSeo\Api\UploadSocialMediaImageController;
use V17Development\FlarumSeo\Controller\Robots;
use V17Development\FlarumSeo\Formatter\FormatLinks;
use V17Development\FlarumSeo\Listeners\PageListener;
use V17Development\FlarumSeo\Extend\SEO;
use V17Development\FlarumSeo\Page\DiscussionBestAnswerPage;
use V17Development\FlarumSeo\Page\Discussion;
use V17Development\FlarumSeo\Page\IndexPage;
use V17Development\FlarumSeo\Page\PageExtensionPage;
use V17Development\FlarumSeo\Page\ProfilePage;
use V17Development\FlarumSeo\Page\TagPage;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;

return [
    (new Extend\Frontend('forum'))
        ->content(PageListener::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/Admin.less'),

    (new Extend\Routes('forum'))
        ->get('/robots.txt', 'v17development-flarum-seo', Robots::class),

    (new Extend\Routes('api'))
        ->post('/seo_social_media_image', 'seo.socialmedia.upload', Api\Controllers\UploadSocialMediaImageController::class)
        ->delete('/seo_social_media_image', 'seo.socialmedia.delete', Api\Controllers\DeleteSocialMediaImageController::class),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Formatter)
        ->render(FormatLinks::class)
        ->configure(ConfigureLinks::class),

    // Seo Meta
    (new Extend\Model(FlarumDiscussion::class))
        ->relationship('seoMeta', function (AbstractModel $model) {
            return $model->hasOne(SeoMeta::class, 'object_id', 'id')
                ->whereObjectType('discussion');
        }),

    (new Extend\ApiSerializer(BasicDiscussionSerializer::class))
        ->hasOne('seoMeta', SeoMetaSerializer::class),

    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude('seoMeta'),

    (new SEO())
        ->addExtender('index', IndexPage::class)
        ->addExtender('profile', ProfilePage::class)
        ->addExtender('tags', TagPage::class)
        ->addExtender('page_extension', PageExtensionPage::class)
        ->addExtender('discussion', Discussion::class)
        ->addExtender('discussion_best_answer', DiscussionBestAnswerPage::class)
];
