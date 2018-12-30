<?php

namespace JasperVriends\FlarumSeo;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->content(Inject::class)
];