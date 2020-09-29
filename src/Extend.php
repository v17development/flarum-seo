<?php

namespace V17Development\FlarumSeo;

use V17Development\FlarumSeo\Listeners\PageListener;
use V17Development\FlarumSeo\Listeners\BeforePageRenders;

/**
 * FlarumSeo Extender
 * 
 * Read more:
 * https://community.v17.dev/knowledgebase/22-extending-the-seo-extension
 */
class Extend {
    // SEO container
    private static $container = null;
    
    /**
     * Initializing extender. For internal user only.
     */
    public static function init(PageListener $container) {
        if(self::$container !== null) throw new \Exception("SEO Container has been initialized already");

        // Set container
        self::$container = $container;
    }

    /**
     * Page title
     * 
     * @param string $title Sets title
     * @param boolean $updatePageTitle Update page title as well
     * @param bool $useAsHeadLine Only true if you want to use this as headline
     */
    public static function setTitle(string $title, $updatePageTitle = true, bool $useAsHeadLine = false) {
        if(self::$container === null) self::throwError("setTitle");

        self::$container->setTitle($title, $useAsHeadLine);

        // Update page title as well
        if($updatePageTitle) {
            self::$container->setPageTitle($title);
        }
    }

    /**
     * Page description
     * 
     * @param string $description The description will automatically be 'dotted' if too long
     */
    public static function setDescription(string $description) {
        if(self::$container === null) self::throwError("setDescription");

        self::$container->setDescription($description);
    }

    /**
     * Page full URL
     * 
     * @param string $url The path or url of the page (if it is the full url, set $addApplicationUrl to false)
     * @param bool $addApplicationUrl Adds application before the URL if true
     */
    public static function setUrl(string $url, bool $addApplicationUrl = true) {
        if(self::$container === null) self::throwError("setUrl");
        
        self::$container->setUrl($url, $addApplicationUrl);
    }

    /**
     * Page canonical URL
     * 
     * @param string $path The path after the application URL
     * 
     * Example: /topic/5-some-title
     */
    public static function setCanonicalUrl(string $path) {
        if(self::$container === null) self::throwError("setCanonicalUrl");
        
        self::$container->setCanonicalUrl($path);
    }

    /**
     * Page keywords
     * 
     * @param array $keywords An array of keywords that describes the page
     * 
     * Example: ["keyword 1", "flarum", "site", "blog"]
     */
    public static function setKeywords(array $keywords) {
        if(self::$container === null) self::throwError("setKeywords");
        
        self::$container->setKeywords($keywords);
    }

    /**
     * Social media image
     * 
     * @param string $imageUrl Path to an image
     */
    public static function setImage(string $imageUrl) {
        if(self::$container === null) self::throwError("setImage");
        
        self::$container->setImage($imageUrl);
    }

    /**
     * Page published on
     * 
     * @param string $datetime The full date time
     * 
     * Example: 2020-08-22 14:14:00
     */
    public static function setPublishedOn(string $datetime) {
        if(self::$container === null) self::throwError("setPublishedOn");
        
        self::$container->setPublishedOn($datetime);
    }

    /**
     * Page last updated on
     * 
     * @param string $datetime The full date time
     * 
     * Example: 2020-08-25 18:55:00
     */
    public static function setUpdatedOn(string $datetime) {
        if(self::$container === null) self::throwError("setUpdatedOn");
        
        self::$container->setUpdatedOn($datetime);
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
    public static function setMetaPropertyTag(string $key, $value) {
        if(self::$container === null) self::throwError("setMetaPropertyTag");
        
        self::$container->setMetaPropertyTag($key, $value);
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
    public static function setMetaTag(string $key, $value) {
        if(self::$container === null) self::throwError("setMetaTag");
        
        self::$container->setMetaTag($key, $value);
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
    public static function setSchemaJson(string $key, $value) {
        if(self::$container === null) self::throwError("setSchemaJson");
        
        self::$container->setSchemaJson($key, $value);
    }

    /**
     * Finish and add all parameters
     * 
     * Do not call this class
     */
    public static function finish($caller) {
        if(self::$container === null) self::throwError("finish");
        if(get_class($caller) !== "V17Development\FlarumSeo\Listeners\BeforePageRenders") throw new \Exception("V17Development\FlarumSeo\Extend::finish(..): Do not call this class");
        
        self::$container->finish();
    }

    /**
     * Container was not yet initialized
     */
    private static function throwError($caller) {
        throw new \Exception("V17Development\FlarumSeo\Extend::" . $caller . "(..): Container was not yet initialized.");
    }
}