<?php

namespace JasperVriends\FlarumSeo;

use Flarum\Extend;
use Extend\Locales;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->content(PageListener::class),
    new Extend\Locales(__DIR__ . '/locale')
];
