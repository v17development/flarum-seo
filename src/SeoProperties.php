<?php

namespace V17Development\FlarumSeo;

use V17Development\FlarumSeo\Listeners\PageListener;
use V17Development\FlarumSeo\SeoMeta\SeoMeta;

/**
 * FlarumSeo Properties Extender
 */
class SeoProperties
{
    // SEO container
    private $container = null;

    /**
     * Initializing extender. For internal user only.
     */
    public function __construct(PageListener $container)
    {
        // Set container
        $this->container = $container;
    }

    /**
     * Page title
     *
     * @param string $title Sets title
     * @param boolean $updatePageTitle Update page title as well
     * @param bool $useAsHeadLine Only true if you want to use this as headline
     */
    public function setTitle(string $title, $updatePageTitle = true, bool $useAsHeadLine = false): self
    {
        if ($this->container === null) self::throwError("setTitle");

        $this->container->setTitle($title, $useAsHeadLine);

        // Update page title as well
        if ($updatePageTitle) {
            $this->container->setPageTitle($title);
        }

        return $this;
    }

    /**
     * Page description
     *
     * @param string $content The description will automatically be 'dotted' if too long
     */
    public function setDescription(string|null $content = null): self
    {
        // Empty description
        if ($content === null) return $this;

        // Container not initialized
        if ($this->container === null) self::throwError("setDescription");

        // Set description
        $this->container->setDescription($content);

        return $this;
    }

    /**
     * Generate page description
     */
    public function generateDescriptionFromContent($content): string
    {
        $description = strip_tags($content);
        $description = trim(preg_replace('/\s+/', ' ', mb_substr($description, 0, 157))) . (mb_strlen($description) > 157 ? '...' : '');

        return $description;
    }

    /**
     * Page full URL
     *
     * @param string $url The path or url of the page (if it is the full url, set $addApplicationUrl to false)
     * @param bool $addApplicationUrl Adds application before the URL if true
     */
    public function setUrl(string $url, bool $prependApplicationUrl = true): self
    {
        if ($this->container === null) self::throwError("setUrl");

        $this->container->setUrl($url, $prependApplicationUrl);

        return $this;
    }

    /**
     * Page canonical URL
     *
     * @param string $path The path after the application URL
     *
     * Example: /topic/5-some-title
     */
    public function setCanonicalUrl(string $path, bool $prependApplicationUrl = true): self
    {
        if ($this->container === null) self::throwError("setCanonicalUrl");

        $this->container->setCanonicalUrl($path, $prependApplicationUrl);

        return $this;
    }

    /**
     * Page keywords
     *
     * @param array $keywords An array of keywords that describes the page
     *
     * Example: ["keyword 1", "flarum", "site", "blog"]
     */
    public function setKeywords(array $keywords): self
    {
        if ($this->container === null) self::throwError("setKeywords");

        $this->container->setKeywords($keywords);

        return $this;
    }

    /**
     * Social media image
     *
     * @param string|null $imageUrl Path to an image
     */
    public function setImage(?string $imageUrl): self
    {
        if ($this->container === null) self::throwError("setImage");

        if ($imageUrl) {
            $this->container->setImage($imageUrl);
        }

        return $this;
    }

    /**
     * Page published on
     *
     * @param string $datetime The full date time
     *
     * Example: 2020-08-22 14:14:00
     */
    public function setPublishedOn(string $datetime): self
    {
        if ($this->container === null) self::throwError("setPublishedOn");

        $this->container->setPublishedOn($datetime);

        return $this;
    }

    /**
     * Page last updated on
     *
     * @param string $datetime The full date time
     *
     * Example: 2020-08-25 18:55:00
     */
    public function setUpdatedOn(string $datetime): self
    {
        if ($this->container === null) self::throwError("setUpdatedOn");

        $this->container->setUpdatedOn($datetime);

        return $this;
    }

    /**
     * Adds or updates an 'og:' key
     *
     * @param string $key
     * @param string|array $value
     *
     * example:
     * - key: "og:site_name"
     * - value: "blog"
     */
    public function setMetaPropertyTag(string $key, $value): self
    {
        if ($this->container === null) self::throwError("setMetaPropertyTag");

        $this->container->setMetaPropertyTag($key, $value);

        return $this;
    }

    /**
     * Adds or updates a meta tag
     *
     * @param string $key
     * @param string|array $value
     *
     * example:
     * - key: "robots"
     * - value: "index, follow"
     */
    public function setMetaTag(string $key, $value): self
    {
        if ($this->container === null) self::throwError("setMetaTag");

        $this->container->setMetaTag($key, $value);

        return $this;
    }

    /**
     * Adds or updates a JSON schema key
     *
     * @param string $key
     * @param string|array $value
     *
     * example:
     * - key: "@type"
     * - value: "WebPage"
     */
    public function setSchemaJson(string $key, $value): self
    {
        if ($this->container === null) self::throwError("setSchemaJson");

        $this->container->setSchemaJson($key, $value);

        return $this;
    }

    /**
     * Returns current application full-path
     *
     * @param string $path
     */
    public function withApplicationPath(string $path)
    {
        return $this->container->getApplicationPath($path);
    }

    public function getImageFromContent(?string $content = null)
    {
        return $this->container->getImageFromContent($content);
    }

    public function getEstimatedReadingTime(string $content = null)
    {
        return $this->container->getEstimatedReadingTime($content);
    }

    /**
     * Generates a
     */
    public function generateSchemaBreadcrumb(array $tags): self
    {
        $this->container->setSchemaBreadcrumb($tags);

        return $this;
    }

    /**
     * Generate default tags from meta
     */
    public function generateTagsFromMetaData(SeoMeta $data)
    {
        $this->container->generateTagsFromMetaData($data);

        return $this;
    }

    /**
     * Container was not yet initialized
     */
    private static function throwError($caller)
    {
        throw new \Exception("SeoProperties::" . $caller . "(..): You're doing it wrong, container was improperly initialized. Please review Flarum SEO documentation.");
    }
}
