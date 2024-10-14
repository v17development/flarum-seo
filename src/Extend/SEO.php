<?php

namespace V17Development\FlarumSeo\Extend;

use Flarum\Extension\Extension;
use Flarum\Extend\ExtenderInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;
use V17Development\FlarumSeo\Page\PageManager;

class SEO implements ExtenderInterface
{
    // Extender list
    protected $extenders = [];

    /**
     * Register a new extender
     *
     * @param string $name Unique extender name
     * @param string $extender Extender class
     */
    public function addExtender(string $name, string $extender)
    {
        $this->extenders[$name] = $extender;

        return $this;
    }

    /**
     * Remove existing extender
     *
     * @param string $name Extender name
     */
    public function removeExtender(string $name)
    {
        // Forget extender
        Arr::forget($this->extenders, $name);

        return $this;
    }

    /**
     * Extender
     *
     * @param
     */
    public function extend(Container $container, Extension $extension = null)
    {
        $container->resolving(PageManager::class, function ($page) use ($container) {
            foreach ($this->extenders as $name => $extender) {
                $page->addExtender($name, $container->make($extender));
            }

            return $page;
        });
    }
}
