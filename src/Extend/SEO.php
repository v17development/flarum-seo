<?php

namespace V17Development\FlarumSeo\Extend;

use Flarum\Extension\Extension;
use Flarum\Extend\ExtenderInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;
use V17Development\FlarumSeo\Page\PageManager;

class SEO implements ExtenderInterface
{
    // Driverlist
    protected $drivers = [];
    // Extender list
    protected $extenders = [];

    /**
     * Register a new driver
     * Register a new extender
     *
     * @param string $name Unique driver name
     * @param string $name Unique extender name
     * @param string $extender Extender class
     */
    public function addDriver(string $name, string $driver)
    public function addExtender(string $name, string $extender)
    {
        $this->drivers[$name] = $driver;
        $this->extenders[$name] = $extender;

        return $this;
    }

    /**
     * Unregister existing driver
     * Remove existing extender
     *
     * @param string $name Driver name
     * @param string $name Extender name
     */
    public function unregisterDriver(string $name)
    public function removeExtender(string $name)
    {
        // Only unregister if driver existed
        if (isset($this->drivers[$name])) {
            unset($this->drivers[$name]);
        }
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
            foreach ($this->drivers as $name => $driver) {
                $page->addDriver($name, $container->make($driver));
            }

            return $page;
        });
    }
}
