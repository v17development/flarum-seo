<?php

namespace V17Development\FlarumSeo\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use V17Development\FlarumSeo\Api\Serializers\SeoMetaSerializer;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;

class ShowSeoMetaController extends AbstractShowController
{
    use DispatchEventsTrait;

    /**
     * {@inheritdoc}
     */
    public $serializer = SeoMetaSerializer::class;

    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        // Make sure the person can access the agents
        $actor->assertCan('seo.canConfigure');

        $id = Arr::get($request->getQueryParams(), 'id', null);
        $objectType = Arr::get($request->getQueryParams(), 'object_type' . null);

        // Make sure the ID part is numeric
        if (is_null($id) || !is_numeric($id)) {
            throw new ValidationException([
                'message' => "Invalid slug/id combination"
            ]);
        }

        // Find SeoMeta by it's unique ID
        if (is_null($objectType)) {
            return SeoMeta::findOrFail($id);
        }

        // Find SeoMeta by a object-type combination
        $seoMeta = SeoMeta::findByObjectTypeOrCreate(
            $objectType,
            $id
        );

        $this->dispatchEventsFor($seoMeta, $actor);

        return $seoMeta;
    }
}
