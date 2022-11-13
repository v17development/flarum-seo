<?php

namespace V17Development\FlarumSeo\Page;

use Flarum\Extension\ExtensionManager;
use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoExtenderManagerInterface;

class PageManager implements SeoExtenderManagerInterface
{
    /**
     * @var array
     */
    protected $drivers = [];

    /**
     * @var ExtensionManager
     */
    protected $extensionManager;

    /**
     * @param ExtensionManager $extensionManager
     */
    public function __construct(ExtensionManager $extensionManager)
    {
        $this->extensionManager = $extensionManager;
    }

    public function addDriver(string $name, PageDriverInterface $driver)
    {
        $this->drivers[$name] = $driver;
    }

    public function getDrivers(string $routeName = null)
    {
        // Filter available drivers
        return array_filter($this->drivers, function (PageDriverInterface $driver) use ($routeName) {
            // Filter drivers that require extensions to be enabled
            foreach ($driver->extensionDependencies() as $extensionId) {
                if (!$this->extensionManager->isEnabled($extensionId)) {
                    return false;
                }
            }

            // Check if driver should be handled
            if (!is_null($routeName) && count($driver->handleRoutes()) !== 0 && !in_array($routeName, $driver->handleRoutes())) {
                return false;
            }

            return true;
        });
    }
}
