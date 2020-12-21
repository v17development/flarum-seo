import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import Header from "../components/Header";
import saveSettings from 'flarum/utils/saveSettings';

export default class HealthCheck extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.settings = app.data.settings;
    this.saving = false;
  }

  view() {
    return (
      <div>
        <p className="seo-intro">A quick SEO-health-check overview. If you have questions, ask your question the official <a href="https://discuss.flarum.org/d/18316-flarum-seo" target="_blank">Flarum forums <i className="fas fa-external-link-alt"/></a>. When you have issues, <a href="https://github.com/v17development/flarum-seo/issues" target="_blank">create a new issue <i className="fas fa-external-link-alt"/></a>.</p>
        <p className="seo-intro">Are you a developer with some free time left? Contribute to the project <a href="https://github.com/v17development/flarum-seo" target="_blank">on GitHub <i className="fas fa-external-link-alt"/></a>. Have you have built a Flarum Extension and you'd like to use the SEO tools from this extension? Please <a href="https://community.v17.dev/knowledgebase/22" target="_blank">read the documentation <i className="fas fa-external-link-alt"/></a>.</p>

        <p className="seo-intro">For optimal search engine results, make sure all checks are green.</p>

        <table className="seo-check-table">
          <thead>
            <tr>
              <td>Technique</td>
              <td width="150">Status</td>
            </tr>
          </thead>
          <tbody>
            {this.forumDescription()}
            {this.forumKeywords()}
            {this.siteUsesSSL()}
            {this.discussionPostSet()}
            {this.socialMediaImage()}
            {this.hasSitemap()}
            {this.registeredSearchEngines()}
            {this.robotsTxt()}
            {this.tagsAvailable()}
            {this.reviewAgain()}
          </tbody>
        </table>
      </div>
    );
  }

  // Forum description
  forumDescription()
  {
    let passed = typeof this.settings.forum_description !== "undefined" && this.settings.forum_description !== '' ? true : 'must';
    let reason = 'You did not set up a forum description yet!';

    // Check minimal 20 characters
    if(passed === true && this.settings.forum_description.length <= 20) {
      passed = false;
      reason = 'Your forum description is lower then 20 characters. Please expand it for better search results.';
    }

    // Check description is not default text
    if(passed === true && this.settings.forum_description.indexOf('This is beta software') >= 0) {
      passed = 'must';
      reason = 'You did not change the default forum description after installation!';
    }

    return (
      <tr>
        <td>
          Your forum has a description
          {this.notPassedError(passed, reason, 'Update description', this.getSettingUrl('description'))}
        </td>
        {this.passed(passed, 'description')}
      </tr>
    );
  }

  // Forum keywords
  forumKeywords()
  {
    let passed = typeof this.settings.forum_keywords !== "undefined" && this.settings.forum_keywords !== '' ? true : false;
    let reason = 'You did not set up a forum keywords yet!';

    return (
      <tr>
        <td>
          Your forum has keywords set up
          {this.notPassedError(passed, reason, 'Update keywords', this.getSettingUrl('keywords'))}
        </td>
        {this.passed(passed, 'keywords')}
      </tr>
    );
  }

  // Does the site has SSL as default transport?
  siteUsesSSL()
  {
    let passed = app.forum.attribute('baseUrl').indexOf('https://') >= 0 ? true : 'must';

    return (
      <tr>
        <td>
          Your site has a secure connection available (SSL/TLS)
          {this.notPassedError(
            passed, 
            'Your forum does not force a SSL/TLS connection (a secure connection to your website). Most search engines won\'t index your website or lower your ranking if you have no secure connection available.', 
            'How to set up SSL', 
            app.route('extension', {
              id: 'v17development-seo',
              page: 'ssl'
            })
          )}
        </td>
        {this.passed(passed)}
      </tr>
    );
  }

  // Discussion post crawl settings
  discussionPostSet()
  {
    let passed = typeof this.settings.seo_reviewed_post_crawler !== "undefined";

    return (
      <tr>
        <td>
          Review discussion post crawl settings
          {this.notPassedError(passed, 'You will need to review this setting to pass.', 'Review post settings', this.getSettingUrl('discussion-post'))}
        </td>
        {this.passed(passed)}
      </tr>
    );
  }

  // Review bot settings
  socialMediaImage()
  {
    let passed = true;

    if(typeof this.settings.seo_social_media_image_path === "undefined" || this.settings.seo_social_media_image_path === null) {
        passed = false;
    }

    return (
      <tr>
        <td>
          Set Up a social media image
          {this.notPassedError(passed, 'You did not set a social media image for your forum. It is recommended to set one. Your favicon will now be used as preview on social media.', 'Update image', this.getSettingUrl('social-media'))}
        </td>
        {this.passed(passed)}
      </tr>
    );
  }

  // Review bot settings
  hasSitemap()
  {
    let passed = true;

    if(app.data.settings.extensions_enabled.indexOf('flagrow-sitemap') === -1 && app.data.settings.extensions_enabled.indexOf('fof-sitemap') === -1) {
      passed = false;
    }

    return (
      <tr>
        <td>
          Your forum has a sitemap available
          {this.notPassedError(
            passed, 
            'It is highly recommended to install the FriendsOfFlarum sitemap extension!', 
            'Read more about adding a sitemap',
            app.route('extension', {
              id: 'v17development-seo',
              page: 'sitemap'
            })
          )}
        </td>
        {this.passed(passed)}
      </tr>
    );
  }

  // Robots.txt is available
  robotsTxt()
  {
    return (
      <tr>
        <td>
          Your forum has a <b>robots.txt</b> available. <a href={app.forum.attribute('baseUrl') + "/robots.txt"} target="_blank" className="robots-link">Open robots.txt <i className="fas fa-external-link-alt"></i></a>
        </td>
        {this.passed(true)}
      </tr>
    );
  }

  // Robots.txt is available
  tagsAvailable()
  {
    return (
      <tr>
        <td>
          Your forum has <b>meta tags</b> available (generated by this plugin)
        </td>
        {this.passed(true)}
      </tr>
    );
  }

  // Register your forum
  registeredSearchEngines()
  {
    let passed = typeof this.settings.seo_reviewed_search_engines !== "undefined";

    return (
      <tr>
        <td>
          Register your forum to search engines
          {this.notPassedError(
            passed, 
            'You will need to review this to pass.', 
            'More information', 
            app.route('extension', {
              id: 'v17development-seo',
              page: 'search-engines'
            })
          )}
        </td>
        {this.passed(passed)}
      </tr>
    );
  }

  // Review again
  reviewAgain()
  {
    let passed = true;

    // Set current date
    let nextReviewDate = new Date();

    // Check if previous review date exists
    if(typeof app.data.settings.seo_review_settings === "undefined") {
      passed = false;
    }else{
      // Ok, it exists. Set the review date
      nextReviewDate = new Date(app.data.settings.seo_review_settings * 1000);
    }

    // Date passed?
    if(passed && Math.floor(Date.now() / 1000) > app.data.settings.seo_review_settings) {
      passed = false;
    }

    return (
      <tr>
        <td>
          Review your SEO settings every two months. Next review needed on <b>{nextReviewDate.toDateString()}</b>
          {this.notPassedError(passed, 'It is time to re-review your SEO settings.', 'Ok! I reviewed them!', () => {
            let now = new Date();
            let nextDate = Math.floor(new Date(now.getFullYear(), now.getMonth() + 2, 1) / 1000);

            this.saveSingleSetting('seo_review_settings', nextDate);
          })}
        </td>
        {this.passed(passed)}
      </tr>
    );
  }

  // Get setting URL
  getSettingUrl(setting = '')
  {
    if(setting === '') {
      return app.route('extension', {
        id: 'v17development-seo',
      });
    }

    return app.route('extension', {
      id: 'v17development-seo',
      page: 'settings',
      setting: setting
    });
  }

  // Passed or not
  passed(passed)
  {
    if(passed === 'must') {
      return (
        <td className='row-must'>
          <i class="fas fa-exclamation-circle"/> Warning!
        </td>
      );
    }

    if(!passed) {
      return (
        <td className='row-warning'>
          <i class="fas fa-exclamation-circle"/> Warning!
        </td>
      );
    }

    return (
      <td className='row-passed'>
        <i class="fas fa-check"/> All set!
      </td>
    );
  }

  // General not-passed error
  notPassedError(passed, reason, buttonText = 'Update setting', url = app.route('seoSettings')) {
    if(passed === true) return;

    return (
      <div className="row-not-passed-error">
        {reason}

        <div className="button-container">
          {Button.component({
            className: 'Button',
            onclick: () => {
              if(typeof url === 'string') {
                m.route.set(url);
              }else{
                url();
              }
            }
          }, buttonText)}
        </div>
      </div>
    );
  }

  // Save
  saveSingleSetting(setting, value)
  {
    if (this.saving) return;

    this.saving = true;

    let data = {};
    data[setting] = value;

    saveSettings(data)
      .then(() => {
        app.alerts.show({type: 'success'}, app.translator.trans('core.admin.basics.saved_message'));
      })
      .catch(() => {})
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }
}