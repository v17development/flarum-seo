<?php

namespace V17Development\FlarumSeo\Page;

use V17Development\FlarumSeo\Page\PageDriverInterface;
use V17Development\FlarumSeo\SeoExtenderManagerInterface;

class PageManager implements SeoExtenderManagerInterface
{
    protected $drivers = [];

    public function addDriver(string $name, PageDriverInterface $driver)
    {
        $this->drivers[$name] = $driver;
    }

    public function getDrivers(bool $inverse = false)
    {
        // Filter available drivers
        $filtered = array_filter($this->drivers, function (PageDriverInterface $driver) {
            if (count($driver->extensionDependencies())) return true;

            foreach ($driver->extensionDependencies() as $extensionId) {
                if (!$this->extensions->isEnabled($extensionId)) {
                    return false;
                }
            }

            return true;
        });

        if ($inverse) {
            return array_diff_key($this->drivers, $filtered);
        }

        return $filtered;
    }
}
