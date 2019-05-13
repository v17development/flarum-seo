import Page from 'flarum/components/Page';
import SeoSettings from "../components/Forms/SeoSettings";
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';
import Header from "../components/Header";

export default class RegisterToSearchEngines extends Page {
    init() {
        this.saving = false;
        this.hasConfirmed = app.data.settings.seo_reviewed_search_engines === "1";
    }

    view() {
        return (
            <div className="FlarumSEO">
                {Header.component()}

                <div className="container">
                    <h2>Register your forum to search engines</h2>
                    <p>The best thing you can do is letting search engines know you exits! This page will guide you how to add your forum to the biggest search engines.</p>

                    <p>These steps will advice you to have a sitemap available. If you do not have a sitemap yet, <a href="#/seo/sitemap">click here to read more why you should add one</a>.</p>

                    <div>
                        <h4>Add your website to the Google search results</h4>
                        <p>If you want to add your website to Google, go to the <a href="https://search.google.com/search-console" target="_blank">Google Search Console <i className="fas fa-external-link-alt"></i></a>. You will need to add the site and you'll need to do a verification that you are the owner of the domain.</p>

                        <p>When you choose the domain, make sure to decide if you use the 'www' subdomain in the search results. This cannot be changed afterwards. Don't register your website twice as it will not help you to get higher ranking. It will result into getting inconsistent search results.</p>

                        <p>When your site is added to the Google Search Console, go to <b>Sitemaps</b> in the menu. Send your <b>sitemap.xml</b> to Google to make sure they will keep checking it and crawl pages.</p>
                    </div>

                    <div>
                        <h4>Add your website to the Bing search results</h4>
                        <p>If you want to add your website to Bing, go to the <a href="https://www.bing.com/toolbox/webmaster" target="_blank">Bing Webmaster Tools <i className="fas fa-external-link-alt"></i></a> and fill in the required fields (not all fields are required! Most of them are optional).</p>

                        <p>Make sure you add the sitemap URL. After you did the site verification you are set and Bing will index your site.</p>
                    </div>

                    <div>
                        <h4>Add your website to the Yandex search results</h4>
                        <p>If you want to add your website to Yandex, go to the <a href="https://webmaster.yandex.com" target="_blank">Yandex.Webmaster <i className="fas fa-external-link-alt"></i></a> and follow the steps.</p>

                        <p>Also, make sure to add a sitemap here too.</p>
                    </div>

                    <div>
                        <h4>Add your website to the Yahoo search results</h4>
                        <p>If you want to add your website to Yahoo, you don't need to do anything <b>if you have already set up Bing</b>. Yahoo uses the same search results as Bing.</p>
                    </div>

                    <div className="clear"></div>
                    {Button.component({
                        className: 'Button pull-right ' + (this.hasConfirmed ? 'hidden' : ''),
                        onclick: () => this.confirm(),
                        icon: 'fas fa-check',
                        loading: this.saving,
                        children: 'I have read this'
                    })}
                </div>
            </div>
        );
    }

    confirm()
    {
        this.saveSingleSetting('seo_reviewed_search_engines', true);
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
                this.hasConfirmed = true;
                app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
            })
            .catch(() => {})
            .then(() => {
                this.saving = false;
                m.redraw();
            });
    }
}