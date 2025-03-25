<?php

namespace V17Development\FlarumSeo;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Serializer\BasicDiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion as FlarumDiscussion;
use Flarum\Extend;
use V17Development\FlarumSeo\Api\AttachForumSerializerAttributes;
use V17Development\FlarumSeo\ConfigureLinks;
use V17Development\FlarumSeo\Api\Serializers\SeoMetaSerializer;
use V17Development\FlarumSeo\Controller\Robots;
use V17Development\FlarumSeo\Formatter\FormatLinks;
use V17Development\FlarumSeo\Extend\SEO;
use V17Development\FlarumSeo\Listeners\PageListener;
use V17Development\FlarumSeo\Page as SeoPage;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;

// Listen events
$events = (new Extend\Event);

// Listen to discussion updates
$events
  ->subscribe(Subscribers\DiscussionSubscriber::class);

// Listen to post updates
$events
  ->subscribe(Subscribers\PostSubscriber::class);

// Add events for Tag extension
if (class_exists("Flarum\Tags\Tag")) {
  $events->subscribe(Subscribers\TagSubscriber::class);
}

return [
  (new Extend\Frontend('forum'))
    ->content(PageListener::class)
    ->js(__DIR__ . '/js/dist/forum.js')
    ->css(__DIR__ . '/less/Forum.less'),

  (new Extend\Frontend('admin'))
    ->js(__DIR__ . '/js/dist/admin.js')
    ->css(__DIR__ . '/less/Admin.less'),

  (new Extend\Routes('forum'))
    ->get('/robots.txt', 'v17development-flarum-seo', Robots::class),

  (new Extend\Routes('api'))
    ->post('/seo_social_media_image', 'seo.socialmedia.upload', Api\Controllers\UploadSocialMediaImageController::class)
    ->delete('/seo_social_media_image', 'seo.socialmedia.delete', Api\Controllers\DeleteSocialMediaImageController::class)

    ->get('/seo_meta', 'seo_meta.overview', Api\Controllers\ListSeoMetaController::class)
    ->get('/seo_meta/{id:\d+}', 'seo_meta.get', Api\Controllers\ShowSeoMetaController::class)
    ->patch('/seo_meta/{id:\d+}', 'seo_meta.update', Api\Controllers\UpdateSeoMetaController::class)
    ->get('/seo_meta/{object_type}-{id}', 'seo_meta.get_by_type', Api\Controllers\ShowSeoMetaController::class),

  new Extend\Locales(__DIR__ . '/locale'),

  (new Extend\Formatter)
    ->render(FormatLinks::class)
    ->configure(ConfigureLinks::class),

  // Add Seo Meta model relation
  (new Extend\Model(FlarumDiscussion::class))
    ->relationship('seoMeta', function (AbstractModel $model) {
      return $model->hasOne(SeoMeta::class, 'object_id', 'id')
        ->where('object_type', 'discussions');
    }),

  (new Extend\ApiSerializer(BasicDiscussionSerializer::class))
    ->hasOne('seoMeta', SeoMetaSerializer::class),

  (new Extend\ApiController(ShowDiscussionController::class))
    ->addInclude('seoMeta'),

  (new SEO())
    ->addExtender('index', SeoPage\IndexPage::class)
    ->addExtender('profile', SeoPage\ProfilePage::class)
    ->addExtender('tags', SeoPage\TagPage::class)
    ->addExtender('page_extension', SeoPage\PageExtensionPage::class)
    ->addExtender('discussion', SeoPage\DiscussionPage::class)
    ->addExtender('discussion_best_answer', SeoPage\DiscussionBestAnswerPage::class),

  // Add support ticket language relation to the forum and add attributes to the forum
  (new Extend\ApiSerializer(ForumSerializer::class))
    ->attributes(AttachForumSerializerAttributes::class),

  // Add events
  $events
];
