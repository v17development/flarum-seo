import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';
import saveSettings from 'flarum/utils/saveSettings';

export default class RobotsModal extends Modal {
    init()
    {
        super.init();

        this.value = typeof app.data.settings.seo_robots_text === "undefined" ? '' : app.data.settings.seo_robots_text;
        this.startValue = this.value;

        this.closeText = 'Close';
        this.loading = false;
    }

    title() {
        return 'Custom robots.txt';
    }

    content() {
        return (
            <div>
                <div className="Modal-body">
                    {m('textarea', {
                        className: "FormControl",
                        value: this.value,
                        placeholder: 'Add text to the robots.txt',
                        rows: 15,
                        oninput: (event) => {
                            this.change(event.target.value);
                        }
                    })}
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
        data.seo_robots_text = this.value;

        saveSettings(data).then(
            this.onsaved.bind(this)
        );
    }

    onsaved() {
        this.hide();
    }
}