<?php
namespace V17Development\FlarumSeo\Api;

use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use League\Flysystem\MountManager;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Api\Controller\ShowForumController;

class UploadSocialMediaImageController extends ShowForumController
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
    public function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));
        $file = array_get($request->getUploadedFiles(), 'seo_social_media_image');
        $tmpFile = tempnam($this->app->storagePath().'/tmp', 'site-image');
        $file->moveTo($tmpFile);

        $mount = new MountManager([
            'source' => new Filesystem(new Local(pathinfo($tmpFile, PATHINFO_DIRNAME))),
            'target' => new Filesystem(new Local($this->app->publicPath().'/assets')),
        ]);

        if (($path = $this->settings->get('seo_social_media_image_path')) && $mount->has($file = "target://$path")) {
            $mount->delete($file);
        }

        $uploadName = 'site-image-'.Str::lower(Str::random(8)).'.png';
        $mount->move('source://'.pathinfo($tmpFile, PATHINFO_BASENAME), "target://$uploadName");
        $this->settings->set('seo_social_media_image_path', $uploadName);
        return parent::data($request, $document);
    }
}