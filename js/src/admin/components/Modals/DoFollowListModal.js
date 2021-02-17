import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Stream from 'flarum/utils/Stream';

export default class DoFollowListModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.domainDoFollowList = [];

    this.baseUrl = this.getDomainFromBase();
    this.domainDoFollowList = typeof app.data.settings.seo_dofollow_domains === "undefined" ? Stream([]) : Stream(JSON.parse(app.data.settings.seo_dofollow_domains));

    this.startValue = this.domainDoFollowList;

    this.newDomain = Stream("");

    this.hasChanges = false;
    this.loading = false;
  }

  title() {
    return 'Do-follow list';
  }

  // Get domain from base URL
  getDomainFromBase() {
    let url = new URL(app.forum.data.attributes.baseUrl);
    
    const hostname = url.hostname.split(".");

    return hostname.slice(Math.max(hostname.length - 2, 0)).join(".");
  }

  content() {
    return (
      <div>
        <div className="Modal-body">
          <p>Enter the <b>hostnames</b> of the domains you want to add to the do-follow list.</p>

          <p>The domain you use for your Flarum instance is added to the list by default.</p>

          <p style={{ marginBottom: '15px' }}>
            <a href={"https://community.v17.dev/knowledgebase/36"} target={"_blank"}>Learn more</a> about the do-follow list.
          </p>

          <div className={"FlarumSEO-DoFollowList"}>
            <input type="text" value={this.baseUrl} readonly className={"FormControl"} />
            <Button className={"Button"} icon={"fas fa-times"} disabled />
          </div>

          {this.domainDoFollowList().map((domain, key) => {
            return (
              <div className={"FlarumSEO-DoFollowList"}>
                <input type="text" value={domain} onkeyup={(e) => this.updateDomain(key, e.target.value)} className={"FormControl"} />
                <Button className={"Button"} icon={"fas fa-times"} onclick={() => this.removeDomain(key)} />
              </div>
            )
          })}

          <div className={"FlarumSEO-DoFollowList"}>
            <input type="text" bidi={this.newDomain} placeholder={"Allow a domain"} onkeydown={(e) => { 
              if(e.keyCode === 13 && this.newDomain() !== '') {
                e.preventDefault();
                this.addDomain();
              }
             }} className={"FormControl"} />
            <Button className={`Button ${this.newDomain() !== '' ? 'Button--primary' : ''}`} icon={"fas fa-plus"} onclick={this.addDomain.bind(this)} />
          </div>
        </div>
        <div style="padding: 25px 30px; text-align: center;">
          <Button
            type="submit"
            className="Button Button--primary"
            loading={this.loading}>
            {this.hasChanges ? 'Save changes' : 'Close'}
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Add new domain to the list
   */
  addDomain() {
    // Check if the domain is already present
    if(this.domainDoFollowList().indexOf(this.newDomain()) >= 0) {
      alert("This domain is already present in your do-follow list.");

      this.newDomain("");
      return;
    }
    
    let updatedData = [...this.domainDoFollowList()];
    
    updatedData.push(this.newDomain());

    this.domainDoFollowList(updatedData);

    // Reset domain
    this.newDomain("");

    // Update the hasChanges
    this.hasChanges = true;
  }

  /**
   * Remove domain from the list
   * 
   * @param {number} key 
   */
  removeDomain(key) {
    let updatedData = [...this.domainDoFollowList()];
              
    updatedData.splice(key, 1);

    this.domainDoFollowList(updatedData);

    // Update the hasChanges
    this.hasChanges = true;
  }

  /**
   * Update domain
   * 
   * @param {*} e 
   */
  updateDomain(key, value) {
    let updatedData = [...this.domainDoFollowList()];
    updatedData[key] = value;

    this.domainDoFollowList(updatedData);

    // Update the hasChanges
    this.hasChanges = true;
  }

  // Close or save setting
  onsubmit(e) {
    if(!this.hasChanges) {
      this.hide();
      return;
    }

    this.loading = true;

    let data = {};
    data.seo_dofollow_domains = JSON.stringify(this.domainDoFollowList().filter(val => val !== ""));

    saveSettings(data).then(
      this.onsaved.bind(this)
    );
  }

  onsaved() {
    this.hide();
  }
}