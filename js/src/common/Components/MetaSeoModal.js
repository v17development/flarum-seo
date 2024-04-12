import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";
import Switch from "flarum/components/Switch";
import saveSettings from "flarum/utils/saveSettings";
import Stream from "flarum/utils/Stream";

export default class MetaSeoModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.hasChanges = false;
    this.closeText = "Close";
    this.loading = false;

    this.newDomain = Stream("");
  }

  title() {
    return "SEO settings - Meta";
  }

  content() {
    return (
      <div>
        <div className="Modal-body">
          <div className="Form">Nice!</div>
        </div>
        <div style="padding: 25px 30px; text-align: center;">Heyoh!</div>
        <div style="padding: 25px 30px; text-align: center;">
          {this.closeDialogButton()}
        </div>
      </div>
    );
  }

  closeDialogButton() {
    return (
      <Button
        type="submit"
        className="Button Button--primary"
        loading={this.loading}
      >
        {this.closeText}
      </Button>
    );
  }

  // Close or save setting
  onsubmit(e) {
    if (this.hasChanges) {
      this.hide();
      return;
    }

    this.loading = true;

    // saveSettings(data).then(this.onsaved.bind(this));
  }

  onsaved() {
    this.hide();
  }
}
