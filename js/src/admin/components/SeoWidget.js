import DashboardWidget from 'flarum/components/DashboardWidget';
import Button from 'flarum/components/Button';

export default class SeoWidget extends DashboardWidget {
  oninit(vnode) {
    super.oninit(vnode);

    this.needsReview = false;

    if(typeof app.data.settings.seo_review_settings === "undefined") {
      this.needsReview = true;
    }

    // Date passed?
    if(!this.needsReview && Math.floor(Date.now() / 1000) > app.data.settings.seo_review_settings) {
      this.needsReview = true;
    }
  }

  className() {
    return 'SeoWidget ' + (this.needsReview ? 'needs-review' : '');
  }

  content() {
    return (
      <div>
        <i className="fas fa-check seo-check-icon"></i> It's time to review your SEO settings!

        {Button.component({
          className: '',
          icon: 'far fa-thumbs-up',
          onclick: () => m.route.set("extension/v17development-seo")
        }, 'Do the health-check!')}
      </div>
    );
  }
}