# Flarum SEO
First Flarum extension that add SEO tags to your Flarum forum.

## WORK STILL IN PROGRESS
While I'm still working on this plugin and I still wait for the results to show up in Google, the results in Google by using this plugin are for your own risk.

### Adding SEO tags to the following pages:
- Home page
- Tags page (if extension is enabled)
- Discussion page
- User profile

### Default: Question-Answer results for discussions
By default, this extension creates an Question Answer result in Google and other supported search engines using the QAPage schema.org tags. However, this setting will load all posts with usernames and likes. There is no caching for this yet. 

This can be heavy for your server. When this makes your forum slow, you can turn back to the default SEO and check if that helps. The only way (right now) is to go to your ``database``, then the table ``settings``, and add the key 'disable_fancy_discussion_seo' with the value ``1``.

### Works with
This extension will work with the following extensions enabled or disabled. All extensions are not required, but it will work together if they are installed and enabled:
- *Flarum likes* of **Flarum** https://github.com/flarum/likes
- *Flarum tags* of **Flarum** https://github.com/flarum/tags
- *Selected Post Best answer* of **WiwatSrt** https://discuss.flarum.org/d/3868-select-post-best-answer

### Using following SEO methods:
- Default HTML meta tags:
  - application-name
  - description
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
