<?php

namespace V17Development\FlarumSeo;

interface SeoExtenderManagerInterface
{
    public function getDrivers(bool $inverse = false);
}
