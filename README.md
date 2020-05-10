![](https://img.shields.io/github/issues/v17development/flarum-seo.svg) [![Total Downloads](https://poser.pugx.org/v17development/flarum-seo/downloads)](https://packagist.org/packages/v17development/flarum-seo) ![](https://img.shields.io/github/stars/v17development/flarum-seo.svg) ![](https://img.shields.io/github/license/v17development/flarum-seo.svg) ![](https://img.shields.io/packagist/v/v17development/flarum-seo.svg)

# Flarum SEO
First Flarum extension that add SEO tags to your Flarum forum.

## Installation
If you like to install this extension, run the following command:
```
composer require v17development/flarum-seo
```

## Updating
If you like to update the package:
```
composer update v17development/flarum-seo
```

## Adding SEO tags to the following pages:
- Home page
- Tags page (if extension is enabled)
- Discussion page
- User profile
- Pages page (if extension is enabled)

## Works with
This extension will work with the following extensions enabled or disabled. All extensions are not required, but it will work together if they are installed and enabled:
- *Flarum likes* created by **Flarum** https://github.com/flarum/likes
- *Flarum tags* created by **Flarum** https://github.com/flarum/tags
- *Selected Post Best answer* created by **FriendsOfFlarum** https://discuss.flarum.org/d/21894-friendsofflarum-best-answer
- *Sitemap* created by **FriendsOfFlarum** https://discuss.flarum.org/d/14941-fof-sitemap
- *Pages* created by **FriendsOfFlarum** https://discuss.flarum.org/d/18301-friendsofflarum-pages

## How do the results look like in Google?
Potential it could look like this, after Google reindex your site. This could take a while before Google or any other crawler does this. The following screenshots are in Dutch, but you get the concept:
![How it looks like](https://i.ibb.co/BtwR4Zn/preview.png)

## How long will changes take effect?
It depends. Recrawling can take a few days, up to a few weeks until most of your results are updated. Use the [FriendsOfFlarum Sitemap](https://discuss.flarum.org/d/14941-fof-sitemap) to let Google know what discussions there are on your forum. You may speed it up by manually update a search result Google via the [Google Search Console](https://search.google.com/search-console/about), but that is no gurantee that the search result will be updated directly.

[Read more about how you can let Google recrawl your site](https://support.google.com/webmasters/answer/6065812)

## Using following SEO methods:
The extension will use the following SEO methods:
- Default HTML meta tags:
  - application-name
  - description
  - keywords
  - language
- Adds ``robots.txt`` to your forum, when Sitemap extension of FriendsOfFlarum is enabled, the link to your sitemap.xml will appear in the robots.txt
- The Open Graph protocol (for social media, http://ogp.me):
  - og:type
  - og:title
  - og:description
  - og:url
  - article:published_time
  - article:updated_time
 
- Schema.org SEO standards (most used by Search engines)
  - WebPage https://schema.org/WebPage
  - QAPage (default) https://schema.org/QAPage
  - DiscussionForumPosting (when Question-Answer SEO results are disabled) https://schema.org/DiscussionForumPosting
  - CollectionPage https://schema.org/CollectionPage
  - ProfilePage https://schema.org/ProfilePage

## You like what I did?
You may like to [buy me a coffee](https://www.buymeacoffee.com/jaspervriends) and support my work :)
