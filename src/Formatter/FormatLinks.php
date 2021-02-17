<?php

namespace V17Development\FlarumSeo\Formatter;

use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;
use Psr\Http\Message\ServerRequestInterface as Request;

class FormatLinks
{
    /**
     * @var Application
     */
    protected $app;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var internalDomain array
     */
    protected $internalDomain = [];

    /**
     * @var urls
     */
    protected $doFollowList = [];

    /**
     * @param Application $app
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(Application $app, SettingsRepositoryInterface $settings)
    {
        $this->app = $app;

        $this->settings = $settings;

        // Current forum domain
        $this->internalDomain = $this->urlToDomain($this->app->url());

        // Define list of domain URLs that are allowed to follow
        $this->doFollowList = array_merge($this->getDoFollowList(), [$this->internalDomain]);
    }

    /**
     * @param Renderer $renderer
     * @param $context
     * @param $xml
     * @param Request $request
     */
    public function __invoke(Renderer $renderer, $context, $xml, Request $request = null)
    {
        return Utils::replaceAttributes($xml, 'URL', function ($attributes) {
            $domain = $this->urlToDomain($attributes['url']);

            // Do we add a nofollow?
            $attributes['rel'] = "ugc noopener" . ($this->addNofollow($domain) ? " nofollow" : "");

            // Open link in new tab
            $attributes['target'] = $this->openInNewTab($domain) ? "_blank" : "_self";

            return $attributes;
        });
    }

    /**
     * Do we need to add a nofollow to this link?
     * 
     * @param string $domain
     */
    private function addNofollow(string $domain) {
        return !isset($domain) || !in_array($domain, $this->doFollowList);
    }

    /**
     * Is the link an internal link?
     * 
     * @param string $domain
     */
    private function openInNewTab(string $domain) {
        return !isset($domain) || $this->internalDomain != $domain;
    }

    /**
     * Load the do-follow list
     */
    public function getDoFollowList()
    {
        return json_decode($this->settings->get("seo_dofollow_domains", ""), true) ?? [];
    }

    /**
     * Get domain (and strip subdomains, if any)
     */
    private function urlToDomain($url) {
        // Parse URL
        $url = parse_url($url);

        // Invalid URL
        if(!isset($url['host'])) {
            return '';
        }

        // Strip subdomains
        return implode('.', array_slice(explode(".", $url['host']), -2, 2, true));
    }
}
