<?php
namespace V17Development\FlarumSeo\Api;

use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\AssertPermissionTrait;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;
use Flarum\Api\Controller\AbstractDeleteController;

class DeleteSocialMediaImageController extends AbstractDeleteController
{
    use AssertPermissionTrait;
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @var Application
     */
    protected $app;
    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings, Application $app)
    {
        $this->settings = $settings;
        $this->app = $app;
    }
    /**
     * {@inheritdoc}
     */
    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));
        $path = $this->settings->get('seo_social_media_image_path');
        $this->settings->set('seo_social_media_image_path', null);
        $uploadDir = new Filesystem(new Local($this->app->publicPath().'/assets'));
        if ($uploadDir->has($path)) {
            $uploadDir->delete($path);
        }
        return new EmptyResponse(204);
    }
}
