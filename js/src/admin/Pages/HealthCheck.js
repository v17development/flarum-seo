import Page from 'flarum/components/Page';
import SeoSettings from "../components/Forms/SeoSettings";
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import Header from "../components/Header";

export default class HealthCheck extends Page {
    init() {
        this.settings = app.data.settings;
    }

    view() {
        return (
            <div className="FlarumSEO">
                {Header.component()}

                <div className="container">
                    <p>A quick health-check</p>

                    <table className="seo-check-table">
                        <thead>
                            <tr>
                                <td>Technique</td>
                                <td width="150">Status</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.forumDescription()}
                        {this.siteUsesSSL()}
                        {this.discussionPostSet()}
                        {this.socialMediaImage()}
                        {this.hasSitemap()}
                        {this.registeredSearchEngines()}
                        {this.robotsTxt()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // Forum description
    forumDescription()
    {
        let passed = typeof this.settings.forum_description !== "undefined" && this.settings.forum_description !== '';
        let reason = 'You did not set-up a forum description yet';

        // Check minimal 20 characters
        if(passed && this.settings.forum_description.length <= 20) {
            passed = false;
            reason = 'Your forum description is lower then 20 characters. Please expand it for better search results.';
        }

        // Check description is not default text
        if(passed && this.settings.forum_description.indexOf('This is beta software') >= 0) {
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

    // Does the site has SSL as default transport?
    siteUsesSSL()
    {
        let passed = app.forum.attribute('baseUrl').indexOf('https://') >= 0 ? true : 'must';

        return (
            <tr>
                <td>
                    Your site has a secure connection available (SSL/TLS)
                    {this.notPassedError(passed, 'Your website is not set to use SSL/TLS as default transport layer. Most search engines won\'t index your website if you have no secure connection available.', 'How to set up SSL', this.getSettingUrl('discussion-post'))}
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

        if(app.data.settings.extensions_enabled.indexOf('flagrow-sitemap') === -1) {
            passed = false;
        }

        return (
            <tr>
                <td>
                    Your forum has a sitemap available
                    {this.notPassedError(passed, 'It is very recommended to install the Flagrow sitemap extension!', 'Read more about adding a sitemap', app.route('seoSitemap'))}
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

    // Register your forum
    registeredSearchEngines()
    {
        let passed = typeof this.settings.seo_reviewed_search_engines !== "undefined";

        return (
            <tr>
                <td>
                    Register your forum to search engines
                    {this.notPassedError(passed, 'You will need to review this to pass.', 'More information', app.route('seoSearchEngines'))}
                </td>
                {this.passed(passed)}
            </tr>
        );
    }

    // Get setting URL
    getSettingUrl(setting = '')
    {
        if(setting === '') {
            return app.route('seoSettings');
        }

        return app.route('seoSingleSetting', {
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
                        onclick: () => m.route(url),
                        children: buttonText
                    })}
                    {/*<a href={ '#/seo/' + (url ? 'setting/' + url : 'settings') } className="Button">{buttonText}</a>*/}
                </div>
            </div>
        );
    }
}