<?php

namespace V17Development\FlarumSeo\Extend;

use Flarum\Extension\Extension;
use Flarum\Extend\ExtenderInterface;
use Illuminate\Contracts\Container\Container;
use V17Development\FlarumSeo\Page\PageManager;

class SEO implements ExtenderInterface
{
    // Driverlist
    protected $drivers = [];

    /**
     * Register a new driver
     *
     * @param string $name Unique driver name
     */
    public function addDriver(string $name, string $driver)
    {
        $this->drivers[$name] = $driver;

        return $this;
    }

    /**
     * Unregister existing driver
     *
     * @param string $name Driver name
     */
    public function unregisterDriver(string $name)
    {
        // Only unregister if driver existed
        if (isset($this->drivers[$name])) {
            unset($this->drivers[$name]);
        }

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
            foreach ($this->drivers as $name => $driver) {
                $page->addDriver($name, $container->make($driver));
            }

            return $page;
        });
    }
}
