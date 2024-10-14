<?php

namespace V17Development\FlarumSeo;

use Illuminate\Support\Collection;
use V17Development\FlarumSeo\Page\PageDriverInterface;

interface SeoExtenderManagerInterface
{
    public function addExtender(string $name, PageDriverInterface $extender): void;

    public function getExtenders(string $routeName = null): array;

    public function getActiveExtenders(): Collection;
}
