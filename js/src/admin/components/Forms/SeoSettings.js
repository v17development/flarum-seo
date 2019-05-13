import Component from 'flarum/Component';
import FieldSet from 'flarum/components/FieldSet';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';
import UploadImageButton from 'flarum/components/UploadImageButton';
import CrawlPostModal from "../Modals/CrawlPostModal";
import RobotsModal from "../Modals/RobotsModal";

export default class SeoSettings extends Component {
    init() {
        this.saving = false;

        this.fields = [
            'forum_title',
            'forum_description',
            'seo_allow_all_bots'
        ];
        this.values = {};

        const settings = app.data.settings;
        this.fields.forEach(key => this.values[key] = m.prop(settings[key]));

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
                        children: [
                            <div className="helpText">
                                {app.translator.trans('core.admin.basics.forum_description_text')}
                            </div>,
                            <textarea className="FormControl" value={this.values.forum_description()} oninput={m.withAttr('value', this.values.forum_description)}/>,
                            Button.component({
                                type: 'submit',
                                className: 'Button Button--primary',
                                children: app.translator.trans('core.admin.basics.submit_button'),
                                loading: this.saving,
                                disabled: !this.changed()
                            })
                        ]
                    })}

                    {FieldSet.component({
                        label: 'Discussion post crawl settings',
                        className: this.showField !== 'all' && this.showField !== 'discussion-post' ? 'hidden' : '',
                        children: [
                            <div className="helpText">
                                This is an important setting about crawling your discussion posts in search results.
                            </div>,
                            Button.component({
                                className: 'Button',
                                children: 'Setup post crawl settings',
                                onclick: () => app.modal.show(new CrawlPostModal())
                            })
                        ]
                    })}

                    {FieldSet.component({
                        label: 'Social media image',
                        className: 'social-media-uploader ' + (this.showField !== 'all' && this.showField !== 'social-media' ? 'hidden' : ''),
                        children: [
                            <div className="helpText">
                                Expecting a square image. Recommended size is 1200x1200 pixels. Otherwise use a landscape image, recommended size is 1200x630.<br /><br />This image will be used by Social Media when a user shares a page on your website (Facebook, Twitter, Reddit).
                            </div>,
                            UploadImageButton.component({
                                name: 'seo_social_media_image'
                            })
                        ]
                    })}

                    {FieldSet.component({
                        label: 'Edit robots.txt',
                        className: this.showField !== 'all' && this.showField !== 'robots' ? 'hidden' : '',
                        children: [
                            <div className="helpText">
                                You can edit your robot.txt here. Please note, writing nonsense could result that crawlers won't visit your site.<br />
                                <br />
                                When you've <a href="https://discuss.flarum.org/d/14941-flagrow-sitemap" target="_blank">Flagrow Sitemap</a> installed and enabled, it will be automatically added to your robots.txt
                            </div>,
                            <div style="height: 5px;"></div>,
                            Switch.component({
                                state: this.allowBotsValue,
                                onchange: (value) => this.saveAllowBots(value),
                                children: 'Allow all bots & crawl full site directory',
                            }),
                            <div style="height: 5px;"></div>,
                            <div>
                                {Button.component({
                                    className: 'Button',
                                    children: 'Edit robots.txt content',
                                    loading: this.saving,
                                    onclick: () => app.modal.show(new RobotsModal())
                                })} <a href={app.forum.attribute('baseUrl') + "/robots.txt"} target="_blank" className="robots-link">Open robots.txt <i className="fas fa-external-link-alt"></i></a>
                            </div>
                        ]
                    })}

                    {FieldSet.component({
                        label: 'Updated this setting?',
                        className: this.showField === 'all' ? 'hidden' : '',
                        children: [
                            <div className="helpText">
                                When you think you're ready, click the button below to re-check the status of this setting.
                            </div>,
                            Button.component({
                                className: 'Button',
                                icon: 'fas fa-sync',
                                children: 'Back to overview and re-check',
                                loading: this.saving,
                                onclick: () => m.route(app.route('seo'))
                            })
                        ]
                    })}

                </form>
            </div>
        );
    }

    infoText()
    {
        if(this.showField !== 'all')
        {
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

        saveSettings(settings)
            .then(() => {
                app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
            })
            .catch(() => {})
            .then(() => {
                this.saving = false;
                m.redraw();
            });
    }

    // Save allow bots
    saveAllowBots(value)
    {
        if (this.saving) return;

        this.saving = true;
        this.allowBotsValue = value;

        let data = app.data.settings;
        data.seo_allow_all_bots = value;

        saveSettings(data)
            .then(() => {
                app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
            })
            .catch(() => {})
            .then(() => {
                this.saving = false;
                m.redraw();
            });
    }

    // Save allow bots
    saveSingleSetting(setting, value)
    {
        if (this.saving) return;

        this.saving = true;

        let data = app.data.settings;
        data[setting] = value;

        saveSettings(data)
            .then(() => {
                app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
            })
            .catch(() => {})
            .then(() => {
                this.saving = false;
                m.redraw();
            });
    }
}