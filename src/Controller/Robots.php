<?php
namespace V17Development\FlarumSeo\Controller;

use Flarum\Settings\SettingsRepositoryInterface;

use Illuminate\View\Factory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response;

/**
 * Class Robots
 * @package V17Development\FlarumSeo\Controller
 */
class Robots implements RequestHandlerInterface
{
    protected $settings;

    /**
     * Robots constructor.
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @return string
     */
    private function output()
    {
        $output  = "User-agent: *";
        $output .= PHP_EOL . "Allow: /";

        // Get extensions enabled
        $extensionsEnabled = json_decode($this->settings->get('extensions_enabled'), true);

        // If sitemap extension is enabled, add sitemap.xml
        if (in_array('flagrow-sitemap', $extensionsEnabled))
        {
            $url = app('flarum.config')['url'];

            $output .= PHP_EOL . PHP_EOL . "Sitemap: ". $url ."/sitemap.xml";
        }

        return $output;
    }

    /**
     * @param ServerRequestInterface $request
     * @return mixed
     */
    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        $response = new Response();
        $response->getBody()->write($this->output());
        return $response->withHeader('Content-Type', 'text/plain');
    }
}