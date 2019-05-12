import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';
import saveSettings from 'flarum/utils/saveSettings';

export default class CrawlPostModal extends Modal {
    init()
    {
        super.init();

        this.value = typeof app.data.settings.seo_post_crawler === "undefined" ? false : app.data.settings.seo_post_crawler;
        this.startValue = this.value;
        this.closeText = 'Close';
        this.loading = false;
    }

    title() {
        return 'Post crawl settings';
    }

    content() {
        return (
            <div>
                <div className="Modal-body">
                    <div className="Form">
                        <b>Read this dialog carefully.</b> This function will only be executed on a page refresh on a discussion. You can enable this feature.

                        <div style="padding: 10px 0;">
                            <b style="display: block; padding-bottom: 10px;"><span style="display: inline-block; width: 25px;"><i className="fas fa-check"></i></span>Only index the main post (default)</b>
                            Search engine will only show the main post in the search results. It won't affect loading speed when you navigate to it via forum links.
                        </div>

                        <div style="padding: 10px 0;">
                            <b style="display: block; padding-bottom: 10px;"><span style="display: inline-block; width: 25px;"><i className="fas fa-check-double"></i></span> Index all posts in a discussion (setting enabled)</b>
                            Search engines will understand the discussions and are even able to show some relevant posts underneath the search results. When you have the extension '<a href="https://flagrow.io/extensions/wiwatsrt/flarum-ext-best-answer" target="_blank">best answer</a>' installed and enabled on your forum, it will mark the discussion as 'answered' on the search results and redirect the user to that specific post. <b>However, depending on your server settings, this can be heavier</b>. It may cost some performance, so it depends on how fast your server is to enable this feature.<br />
                            <br />
                            Generated results will be cached on your server and will be refreshed once an hour. So it will only affect the first page load.
                        </div>
                    </div>
                </div>
                <div style="padding: 25px 30px; text-align: center;">
                    <b style="display: block; padding-bottom: 10px;">Do you want to enable this feature?</b>

                    <div style="display: inline-block;">
                        {Switch.component({
                            state: this.value,
                            onchange: (value) => this.change(value),
                            children: 'Crawl all posts (it\'s slower on page refresh, but has better search results)',
                        })}
                    </div>
                </div>
                <div style="padding: 25px 30px; text-align: center;">
                    {this.closeDialogButton()}
                </div>
            </div>
        );
    }

    change(value)
    {
        this.value = value;

        this.closeText = this.value !== this.startValue ? 'Save changes' : 'Close';
    }

    closeDialogButton() {
        return (
            <Button
                type="submit"
                className="Button Button--primary"
                loading={this.loading}>
                {this.closeText}
            </Button>
        );
    }

    // Close or save setting
    onsubmit(e) {
        if(this.value === this.startValue) {
            this.hide();
            return;
        }

        this.loading = true;

        let data = app.data.settings;
        data.seo_post_crawler = this.value;

        saveSettings(data).then(
            this.onsaved.bind(this)
        );
    }

    onsaved() {
        this.hide();
    }
}