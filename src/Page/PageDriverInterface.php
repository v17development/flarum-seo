<?php

namespace V17Development\FlarumSeo\Page;

use Psr\Http\Message\ServerRequestInterface;
use V17Development\FlarumSeo\SeoProperties;

interface PageDriverInterface
{
    /**
     * A list of Flarum extension IDs for extensions that should be enabled for this metric to be applied.
     */
    public function extensionDependencies(): array;

    /**
     * A list of route names that will be handled
     *
     * Empty array if handles for all routes
     */
    public function handleRoutes(): array;

    /**
     * Handle page SEO
     */
    public function handle(ServerRequestInterface $request, SeoProperties $seo);
}
