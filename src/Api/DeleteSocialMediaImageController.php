<?php
namespace V17Development\FlarumSeo\Api;

use Flarum\Settings\SettingsRepositoryInterface;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\EmptyResponse;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\Paths;

class DeleteSocialMediaImageController extends AbstractDeleteController
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var Paths
     */
    protected $paths;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings, Paths $paths)
    {
        $this->settings = $settings;
        $this->paths = $paths;
    }
    /**
     * {@inheritdoc}
     */
    protected function delete(ServerRequestInterface $request)
    {
        $request->getAttribute('actor')->assertAdmin();

        $path = $this->settings->get('seo_social_media_image_path');
        $this->settings->set('seo_social_media_image_path', null);
        $uploadDir = new Filesystem(new Local($this->paths->public.'/assets'));
        if ($uploadDir->has($path)) {
            $uploadDir->delete($path);
        }
        return new EmptyResponse(204);
    }
}
