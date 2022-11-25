<?php

namespace V17Development\FlarumSeo;

use Flarum\Extend;
use V17Development\FlarumSeo\ConfigureLinks;
use V17Development\FlarumSeo\Api\DeleteSocialMediaImageController;
use V17Development\FlarumSeo\Api\UploadSocialMediaImageController;
use V17Development\FlarumSeo\Controller\Robots;
use V17Development\FlarumSeo\Formatter\FormatLinks;
use V17Development\FlarumSeo\Listeners\PageListener;
use V17Development\FlarumSeo\Extend\SEO;
use V17Development\FlarumSeo\Page\IndexPage;
use V17Development\FlarumSeo\Page\TagPage;

return [
    (new Extend\Frontend('forum'))
        ->content(PageListener::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/Admin.less'),
    (new Extend\Routes('forum'))
        ->get('/robots.txt', 'v17development-flarum-seo', Robots::class),
    (new Extend\Routes('api'))
        ->post('/seo_social_media_image', 'seo.socialmedia.upload', UploadSocialMediaImageController::class)
        ->delete('/seo_social_media_image', 'seo.socialmedia.delete', DeleteSocialMediaImageController::class),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Formatter)
        ->render(FormatLinks::class)
        ->configure(ConfigureLinks::class),

    (new SEO())
        ->addExtender('index', IndexPage::class)
        ->addExtender('tags', TagPage::class)
];
