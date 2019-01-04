![](https://img.shields.io/github/issues/jaspervriends/flarum-seo.svg) ![](https://img.shields.io/github/forks/jaspervriends/flarum-seo.svg) ![](https://img.shields.io/github/stars/jaspervriends/flarum-seo.svg) ![](https://img.shields.io/github/license/jaspervriends/flarum-seo.svg) ![](https://img.shields.io/badge/version-0.1%20beta-yellow.svg)

# Flarum SEO
First Flarum extension that add SEO tags to your Flarum forum.

## WORK STILL IN PROGRESS
While I'm still working on this plugin and I still wait for the results to show up in Google, the results in Google by using this plugin are for your own risk.

## Installation
If you like to install this extension, run the following command:
```
composer require jaspervriends/flarum-seo
```

## Adding SEO tags to the following pages:
- Home page
- Tags page (if extension is enabled)
- Discussion page
- User profile

## Default: Question-Answer results for discussions
By default, this extension creates an Question Answer result for discussions in Google and other supported search engines using the QAPage schema.org tags. Check the screenshot below how that looks like. However, this setting will load all posts with usernames and likes. There is no caching for this yet. 

This can be heavy for your server. When this makes your forum slow, you can turn back to the default SEO and check if that helps. The only way (right now) is to go to your ``database``, then the table ``settings``, and add the key ``disable_fancy_discussion_seo`` with the value ``1``.

## Works with
This extension will work with the following extensions enabled or disabled. All extensions are not required, but it will work together if they are installed and enabled:
- *Flarum likes* of **Flarum** https://github.com/flarum/likes
- *Flarum tags* of **Flarum** https://github.com/flarum/tags
- *Selected Post Best answer* of **WiwatSrt** https://discuss.flarum.org/d/3868-select-post-best-answer
- *Sitemap* of **Flagrow** https://discuss.flarum.org/d/14941-flagrow-sitemap

## How do the results look like in Google?
Potential it should look like this, after Google reindex your site. This could take a while before Google or any other crawler does this. The following screenshots are in Dutch, but you get the concept:
![How it looks like](https://i.ibb.co/BtwR4Zn/preview.png)

## How long will changes take effect?
It depends. Recrawling can take a few days, up to a few weeks until most of your results are updated. Use the [Flagrow Sitemap](https://discuss.flarum.org/d/14941-flagrow-sitemap) to let Google know what discussions there are on your forum. You may speed it up by manually update a search result Google via the [Google Search Console](https://search.google.com/search-console/about), but that is no gurantee that the search result will be updated directly.

[Read more about how you can let Google recrawl your site](https://support.google.com/webmasters/answer/6065812)

## Using following SEO methods:
The extension will use the following SEO methods:
- Default HTML meta tags:
  - application-name
  - description
- Adds ``robots.txt`` to your forum, when Sitemap extension of Flagrow is enabled, the link to your sitemap.xml will appear in the robots.txt
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
