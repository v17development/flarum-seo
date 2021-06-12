import Component from 'flarum/common/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Switch from 'flarum/components/Switch';
import UploadImageButton from 'flarum/components/UploadImageButton';
import CrawlPostModal from "../Modals/CrawlPostModal";
import RobotsModal from "../Modals/RobotsModal";
import countKeywords from '../../utils/countKeywords';
import Stream from 'flarum/utils/Stream';
import DoFollowListModal from '../Modals/DoFollowListModal';
import Select from 'flarum/components/Select';

export default class SeoSettings extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.saving = false;

    this.fields = [
      'forum_title',
      'forum_description',
      'forum_keywords',
      'seo_allow_all_bots',
      'seo_twitter_card_size'
    ];
    this.values = {};

    const settings = app.data.settings;
    this.fields.forEach(key => this.values[key] = Stream(settings[key] || ""));

    this.allowBotsValue = settings.seo_allow_all_bots !== "0";

    // Cheat 'seo_social_media_imageUrl'
    // Todo: Find a better way
    app.forum.data.attributes.seo_social_media_imageUrl = app.forum.attribute('baseUrl') + '/assets/' + app.data.settings.seo_social_media_image_path;

    this.showField = 'all';

    // Single field
    if(m.route.param('setting') !== undefined) {
      this.showField = m.route.param('setting');
    }
  }

  // Create the form
  view() {
    return (
      <div>
        {this.infoText()}

        <form onsubmit={this.onsubmit.bind(this)} className="BasicsPage">
          {FieldSet.component({
            label: app.translator.trans('core.admin.basics.forum_description_heading'),
            className: this.showField !== 'all' && this.showField !== 'description' ? 'hidden' : '',
          }, [
            <div className="helpText">
              {app.translator.trans('core.admin.basics.forum_description_text')}
            </div>,
            <textarea className="FormControl" bidi={this.values.forum_description} />,
            this.showField === "description" && Button.component({
              type: 'submit',
              className: 'Button Button--primary',
              loading: this.saving,
              disabled: !this.changed()
            }, app.translator.trans('core.admin.settings.submit_button'))
          ])}

          {FieldSet.component({
            label: "Forum keywords",
            className: this.showField !== 'all' && this.showField !== 'keywords' ? 'hidden' : ''
          }, [
            <div className="helpText">
              {"Enter one or more keywords that describes your forum."}
            </div>,
            <textarea className="FormControl" bidi={this.values.forum_keywords} placeholder="Add a few keywords" />,
            <div className="helpText" 
              style={{
                color: countKeywords(this.values.forum_keywords()) == false ? "red" : null
              }}>
              <b>Note: Separate keywords with a comma.</b> Example: <i>flarum, web development, forum, apples, security</i>
            </div>,
            this.showField === "keywords" && Button.component({
              type: 'submit',
              className: 'Button Button--primary',
              loading: this.saving,
              disabled: !this.changed()
            }, app.translator.trans('core.admin.settings.submit_button'))
          ])}

          {FieldSet.component({
              label: 'Twitter card size',
              className: this.showField !== 'all' ? 'hidden' : ''
          }, [
            <div className="helpText">
              When your forum is shared on Twitter, it will have an image (if a social media image has been set up). This can be a big card with a big image, or a small card (summary) with a smaller image. 
            </div>,
            Select.component({
              options: {
                'large': 'Large card (large image)',
                'summary': 'Summary card (smaller image)',
              },
              value: this.values.seo_twitter_card_size() || 'large',
              onchange: (val) => {
                this.values.seo_twitter_card_size(val);
                this.hasChanges = true;
              }
            }),
            Button.component({
              type: 'submit',
              className: 'Button Button--primary',
              loading: this.saving,
              disabled: !this.changed()
            }, app.translator.trans('core.admin.settings.submit_button'))
          ])}

          {FieldSet.component({
              label: 'Social media image',
              className: 'social-media-uploader ' + (this.showField !== 'all' && this.showField !== 'social-media' ? 'hidden' : '')
          }, [
            <div className="helpText">
              Expecting a square image. Recommended size is 1200x1200 pixels. Otherwise use a landscape image, recommended size is 1200x630.<br /><br />This image will be used by Social Media when a user shares a page on your website (Facebook, Twitter, Reddit).
            </div>,
            UploadImageButton.component({
              name: 'seo_social_media_image'
            })
          ])}

          {FieldSet.component({
            label: 'Discussion post crawl settings',
            className: this.showField !== 'all' && this.showField !== 'discussion-post' ? 'hidden' : ''
          }, [
            <div className="helpText">
              This is an important setting about crawling your discussion posts in search results.
            </div>,
            Button.component({
              className: 'Button',
              onclick: () => app.modal.show(CrawlPostModal)
            }, 'Setup post crawl settings')
          ])}

          {FieldSet.component({
            label: 'No-follow links',
            className: this.showField !== 'all' ? 'hidden' : '',
          }, [
            <div className="helpText">
              All links to external domains will receive a '<i>nofollow</i>' attribute by default. This will make sure people do not spam your forum with links to other domains in order to get more referrals.
            </div>,
            <div className="helpText">
              With this setting you are able to add domains to the 'do-follow' list. For example, you can add <i>flarum.org</i> to make sure links to this website do not receive a 'nofollow' attribute. <a href={"https://community.v17.dev/knowledgebase/36"} target={"_blank"}>Learn more</a>.
            </div>,
            <div style="height: 5px;"></div>,
            <div>
              {Button.component({
                className: 'Button',
                loading: this.saving,
                onclick: () => app.modal.show(DoFollowListModal)
              }, 'Open domain do-follow list')}
            </div>
          ])}

          {FieldSet.component({
            label: 'Open external links in new tab',
            className: this.showField !== 'all' ? 'hidden' : '',
          }, [
            <div className="helpText">
              This extension will also make sure that external links (to other domains) open in a new tab. Currently it is not possible to disable this setting.
            </div>,
          ])}

          {FieldSet.component({
            label: 'Edit robots.txt',
            className: this.showField !== 'all' && this.showField !== 'robots' ? 'hidden' : '',
          }, [
            <div className="helpText">
              You can edit your robot.txt here. Please note, writing nonsense could result that crawlers won't visit your site.<br />
              <br />
              When you've <a href="https://discuss.flarum.org/d/14941-fof-sitemap" target="_blank">FriendsOfFlarum Sitemap</a> installed and enabled, it will be automatically added to your robots.txt
            </div>,
            <div style="height: 5px;"></div>,
            Switch.component({
              state: this.allowBotsValue,
              onchange: (value) => this.saveAllowBots(value),
            }, 'Allow all bots & crawl full site directory (if you enable this Profile Pages will also get Indexed)'),
            <div style="height: 5px;"></div>,
            <div>
              {Button.component({
                className: 'Button',
                loading: this.saving,
                onclick: () => app.modal.show(RobotsModal)
              }, 'Edit robots.txt content')} <a href={app.forum.attribute('baseUrl') + "/robots.txt"} target="_blank" className="robots-link">Open robots.txt <i className="fas fa-external-link-alt"></i></a>
            </div>
          ])}

          {FieldSet.component({
              label: 'Updated this setting?',
              className: this.showField === 'all' ? 'hidden' : '',
          }, [
            <div className="helpText">
              When you think you're ready, click the button below to re-check the status of this setting.
            </div>,
            Button.component({
              className: 'Button',
              icon: 'fas fa-sync',
              loading: this.saving,
              onclick: () => m.route.set(app.route('extension', {
                id: 'v17development-seo',
              }))
            }, 'Back to overview and re-check')
          ])}
        </form>
      </div>
    );
  }

  infoText() {
    if(this.showField !== 'all') {
      return;
    }

    return (
      <div>
        <p>This page contains some other settings from around the admin area. However, it's good to have a good overview about these settings. Do not forget to do the SEO check.</p>

        <p>Check all your settings when you first setup this extensions. Maintain them to get the best search results.</p>
      </div>
    );
  }

  // Settings changed
  changed() {
    return this.fields.some(key => this.values[key]() !== app.data.settings[key]);
  }

  // Save settings!
  onsubmit(e) {
    e.preventDefault();

    if (this.saving) return;

    this.saving = true;
    app.alerts.dismiss(this.successAlert);

    const settings = {};

    this.fields.forEach(key => settings[key] = this.values[key]());

    // Set twitter card size to large
    if(settings.seo_twitter_card_size === "") {
      settings.seo_twitter_card_size = "large";
    }

    saveSettings(settings)
      .then(() => app.alerts.show({type: 'success' },  app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {})
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }

  // Save allow bots
  saveAllowBots(value) {
    if (this.saving) return;

    this.saving = true;
    this.allowBotsValue = value;

    let data = {};
    data.seo_allow_all_bots = value;

    saveSettings(data)
      .then(() => app.alerts.show({type: 'success' },  app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {})
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }

  // Save allow bots
  saveSingleSetting(setting, value) {
    if (this.saving) return;

    this.saving = true;

    let data = {};
    data[setting] = value;

    saveSettings(data)
      .then(() => app.alerts.show({type: 'success' },  app.translator.trans('core.admin.settings.saved_message')))
      .catch(() => {})
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }
}
