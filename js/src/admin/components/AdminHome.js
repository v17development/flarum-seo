import Page from 'flarum/components/Page';
import SeoSettings from "./Forms/SeoSettings";
import Button from 'flarum/components/Button';

export default class AdminHome extends Page {
    init() {
        this.settings = app.data.settings;
    }

    view() {
        return (
            <div className="FlarumSEO">
                <div className="seo-header container">
                    {Button.component({
                        className: 'Button pull-right',
                        onclick: () => m.route(app.route('seoSettings')),
                        icon: 'fas fa-cogs',
                        children: 'SEO settings'
                    })}

                    <h2>Search Engine Optimization</h2>

                    <div className="clear"/>
                </div>

                <div className="container">
                    <p>Review your search engine optimalization settings</p>

                    <table className="seo-check-table">
                        <thead>
                            <tr>
                                <td>Technique</td>
                                <td width="150">Status</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.forumDescription()}
                        {this.discussionPostSet()}
                        {this.socialMediaImage()}
                        {this.hasSitemap()}
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
            reason = 'Your forum descriptions is lower then 20 characters. Please expand it for better search results.';
        }

        return (
            <tr>
                <td>
                    Forum has a description
                    {this.notPassedError(passed, reason, 'Update description', 'description')}
                </td>
                {this.passed(passed, 'description')}
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
                    Review discussion post crawl settings {this.notPassedError(passed, 'You will need to review this setting to pass.', 'Review post settings', 'discussion-post')}
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
                    Setup a social media image {this.notPassedError(passed, 'You did not set a social media image for your forum. It is recommended to set one. Your favicon will now be used as preview on social media.', 'Update image', 'social-media')}
                </td>
                {this.passed(passed)}
            </tr>
        );
    }

    // Review bot settings
    hasSitemap()
    {
        let passed = true;

        // if(typeof this.settings.seo_social_media_image_path === "undefined" || this.settings.seo_social_media_image_path === null) {
        passed = false;
        // }

        return (
            <tr>
                <td>
                    Your forum has a sitemap available{this.notPassedError(passed, 'It is very recommended to install the Flagrow sitemap extension!', 'Read more about adding a sitemap', 'sitemap')}
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

    // Passed or not
    passed(passed)
    {
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
    notPassedError(passed, reason, buttonText = 'Update setting', url = false) {
        if(passed) return;

        return (
            <div className="row-not-passed-error">
                {reason}

                <div className="button-container">
                    <a href={ '#/seo/' + (url ? 'setting/' + url : 'settings') } className="Button">{buttonText}</a>
                </div>
            </div>
        );
    }
}