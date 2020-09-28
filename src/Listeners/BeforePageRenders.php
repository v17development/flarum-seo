<?php

namespace V17Development\FlarumSeo\Listeners;

use Flarum\Extend\ExtenderInterface;
use Illuminate\Contracts\Container\Container;
use Flarum\Extension\Extension;

class BeforePageRenders implements ExtenderInterface
{
    private static $isAdmin = false;

    public function extend(Container $container, Extension $extension = null)
    {
        $container->resolving(
            function ($object, $app) {
                // Checking for admin dashboard
                if(!self::$isAdmin && !is_array($object) && strpos(get_class($object), 'Flarum\Admin') === 0) {
                    self::$isAdmin = true;
                }

                // Only execute Extend::finish on the forum pages, not the admin ones
                if(!self::$isAdmin && !is_array($object) && get_class($object) === 'Illuminate\View\Compilers\BladeCompiler') {
                    \V17Development\FlarumSeo\Extend::finish($this);
                }
            }
        );
    }
}
