<?php

namespace V17Development\FlarumSeo;

use Flarum\Extend;
use Extend\Locales;
use Extend\Routes;
use Illuminate\Contracts\Events\Dispatcher;
use V17Development\FlarumSeo\Api\DeleteSocialMediaImageController;
use V17Development\FlarumSeo\Api\UploadSocialMediaImageController;
use V17Development\FlarumSeo\Controller\Robots;
use V17Development\FlarumSeo\Listeners\PageListener;

return [
    (new Extend\Frontend('forum'))
        ->content(PageListener::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__ . '/less/Admin.less'),
    (new Extend\Routes('forum'))
        ->get('/robots.txt', 'v17development-flarum-seo', Robots::class),
    (new Extend\Routes('api'))
        ->post('/seo_social_media_image', 'pages.index', UploadSocialMediaImageController::class)
        ->delete('/seo_social_media_image', 'pages.index', DeleteSocialMediaImageController::class),
    new Extend\Locales(__DIR__ . '/locale')
];
