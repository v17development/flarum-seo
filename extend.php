<?php

namespace JasperVriends\FlarumSeo;

use Flarum\Extend;
use Extend\Locales;
use Extend\Routes;
use Illuminate\Contracts\Events\Dispatcher;
use JasperVriends\FlarumSeo\Controller\Robots;
use JasperVriends\FlarumSeo\Listeners\PageListener;

return [
    (new Extend\Frontend('forum'))
        ->content(PageListener::class),
    (new Extend\Routes('forum'))
        ->get('/robots.txt', 'jaspervriends-flarum-seo', Robots::class),
    new Extend\Locales(__DIR__ . '/locale')
];
