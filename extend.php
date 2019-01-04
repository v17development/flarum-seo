<?php

namespace V17Development\FlarumSeo;

use Flarum\Extend;
use Extend\Locales;
use Extend\Routes;
use Illuminate\Contracts\Events\Dispatcher;
use V17Development\FlarumSeo\Controller\Robots;
use V17Development\FlarumSeo\Listeners\PageListener;

return [
    (new Extend\Frontend('forum'))
        ->content(PageListener::class),
    (new Extend\Routes('forum'))
        ->get('/robots.txt', 'v17development-flarum-seo', Robots::class),
    new Extend\Locales(__DIR__ . '/locale')
];
