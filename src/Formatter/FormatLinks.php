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
        $this->internalDomain = parse_url($this->app->url());

        // Define list of domain URLs that are allowed to follow
        $this->doFollowList = array_merge($this->getDoFollowList(), [$this->app->url()]);
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
            $url = parse_url($attributes['url']);

            // Do we add a nofollow?
            $attributes['rel'] = "ugc noopener" . ($this->addNofollow($url) ? " nofollow" : "");

            // Open link in new tab
            $attributes['target'] = $this->openInNewTab($url) ? "_blank" : "_self";

            return $attributes;
        });
    }

    /**
     * Do we need to add a nofollow to this link?
     * 
     * @param array $url
     */
    private function addNofollow(array $url) {
        return !isset($url['host']) || !in_array($url['host'], $this->doFollowList);
    }

    /**
     * Is the link an internal link?
     * 
     * @param array $url
     */
    private function openInNewTab(array $url) {
        return !isset($url['host']) || $this->internalDomain['host'] != $url['host'];
    }

    /**
     * Load the do-follow list
     */
    public function getDoFollowList()
    {
        return json_decode($this->settings->get("seo_dofollow_domains", []), true) ?? [];
    }
}
