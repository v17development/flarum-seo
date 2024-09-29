import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";
import Switch from "flarum/components/Switch";
import Stream from "flarum/utils/Stream";
import Alert from "flarum/common/components/Alert";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import FieldSet from "flarum/components/FieldSet";
import countKeywords from "../../admin/utils/countKeywords";
import clsx from "clsx";

export default class MetaSeoModal extends Modal {
  initialized = true;
  initialLoading = false;

  oninit(vnode) {
    super.oninit(vnode);

    // Open dialog
    if (this.attrs.object) {
      // Get SeoMeta relationship
      if (!this.attrs.object.seoMeta) {
        this.initialized = false;

        app.alerts.show(
          Alert,
          {
            type: "error",
            title: "This object is not a supported SeoMeta object",
            controls: [
              <a
                class="Button Button--link"
                href="https://community.v17.dev/knowledgebase/46"
                target={"_blank"}
              >
                Documentation
              </a>,
            ],
          },
          "Please open this dialog using the objectType and objectId properties or register the object relationship instead."
        );

        setTimeout(() => {
          this.hide();
        }, 100);
        return;
      }

      this.meta = this.attrs.object.seoMeta();
    } else {
      this.initializeLoad();
    }

    this.hasChanges = false;
    this.closeText = "Close";
    this.closeInfoText = null;
    this.loading = false;

    this.enableCustomTwitter = false;
    this.enableCustomOpenGraph = false;
    this.wasManaged = true;
    this.seoTagsOpened = false;

    // Define options
    this.initializeData();
  }

  initializeData() {
    if (!this.meta) return;

    this.autoUpdateData = Stream(this.meta.autoUpdateData());
    this.wasManaged = this.meta.autoUpdateData() === true;

    this.metaTitle = Stream(this.meta.title());
    this.description = Stream(this.meta.description());
    this.keywords = Stream(this.meta.keywords());
    this.robotsNoindex = Stream(this.meta.robotsNoindex());
    this.robotsNofollow = Stream(this.meta.robotsNofollow());
    this.robotsNoarchive = Stream(this.meta.robotsNoarchive());
    this.robotsNoimageindex = Stream(this.meta.robotsNoimageindex());
    this.robotsNosnippet = Stream(this.meta.robotsNosnippet());
    this.twitterTitle = Stream(this.meta.twitterTitle());
    this.twitterDescription = Stream(this.meta.twitterDescription());
    this.twitterImage = Stream(this.meta.twitterImage());
    this.twitterImageSource = Stream(this.meta.twitterImageSource());
    this.openGraphTitle = Stream(this.meta.openGraphTitle());
    this.openGraphDescription = Stream(this.meta.openGraphDescription());
    this.openGraphImage = Stream(this.meta.openGraphImage());
    this.openGraphImageSource = Stream(this.meta.openGraphImageSource());
    this.estimatedReadingTime = Stream(this.meta.estimatedReadingTime());
    this.createdAt = Stream(this.meta.createdAt());
    this.updatedAt = Stream(this.meta.updatedAt());

    this.enableCustomTwitter =
      this.twitterTitle() !== null ||
      this.twitterDescription() !== null ||
      this.twitterImageSource() !== "auto"
        ? true
        : false;

    this.enableCustomOpenGraph =
      this.openGraphTitle() !== null || this.openGraphDescription() !== null
        ? true
        : false;
  }

  title() {
    return "SEO settings - Meta";
  }

  className() {
    return "Modal Modal-SEO-settings";
  }

  initializeLoad() {
    this.initialLoading = true;

    app.store
      .find("seo_meta", `${this.attrs.objectType}-${this.attrs.objectId}`)
      .then((data) => {
        this.isLoading = false;
        this.meta = data;
        this.initialLoading = false;

        this.initializeData();
      })
      .then(() => {
        m.redraw();
      });
  }

  content() {
    // Hide due to invalid relationship or loading data
    if (!this.initialized || this.initialLoading) {
      return <div>{LoadingIndicator.component({})}</div>;
    }

    return (
      <div>
        <div className="Modal-body" onkeyup={() => this.updateHasChanges()}>
          <div className="Form">
            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Auto update meta tags</div>
                <div className="helpText">
                  {
                    "When enabled, this items meta tags are automatically updated when the object changes."
                  }
                </div>
              </div>
              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  {Switch.component(
                    {
                      state: this.autoUpdateData(),
                      onchange: (value) => {
                        this.autoUpdateData(value);
                        this.updateHasChanges();
                      },
                    },
                    "Update object SEO on change"
                  )}
                </div>
              </div>
            </div>

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Meta title</div>
                <div className="helpText">Title in search engines.</div>
              </div>

              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  <input
                    className="FormControl"
                    bidi={this.metaTitle}
                    placeholder="Enter page title"
                    disabled={this.autoUpdateData()}
                  />

                  {this.autoUpdateData() && (
                    <div className="ManagedText">
                      <i className="fas fa-check" /> Managed
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}> Meta description</div>
                <div className="helpText">
                  Describes the item and shown in search engines.
                </div>
              </div>

              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  <textarea
                    className="FormControl"
                    bidi={this.description}
                    placeholder="Add a few keywords"
                    disabled={this.autoUpdateData()}
                  />

                  {this.autoUpdateData() && (
                    <div className="ManagedText">
                      <i className="fas fa-check" /> Managed
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Keywords</div>
                <div className="helpText">
                  {"Enter one or more keywords that describes this item."}
                </div>
              </div>

              <div className="SeoItemContent">
                <textarea
                  className="FormControl"
                  bidi={this.keywords}
                  placeholder="Add a few keywords"
                />
                <div
                  className={clsx(
                    "SeoItemContent-helpertext",
                    countKeywords(this.keywords() ?? "") == false && "invalid"
                  )}
                >
                  <b>Note: Separate keywords with a comma.</b> Example:{" "}
                  <i>flarum, web development, forum, apples, security</i>
                </div>
              </div>
            </div>

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Meta image</div>
                <div className="helpText">Displays an image.</div>
              </div>

              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  <input
                    className="FormControl"
                    bidi={this.openGraphImage}
                    placeholder="Enter image URL"
                    disabled={
                      this.autoUpdateData() &&
                      this.openGraphImageSource() === "auto"
                    }
                  />

                  {/* Show managed tag */}
                  {this.autoUpdateData() &&
                    this.openGraphImageSource() !== "custom" && (
                      <div className="ManagedText">
                        <i className="fas fa-check" /> Managed
                      </div>
                    )}

                  {!this.autoUpdateData() &&
                    this.returnFoFUploadButton((fileUrl) => {
                      this.openGraphImage(fileUrl);
                      this.openGraphImageSource("fof-upload");
                    })}

                  {/* Show managed by message */}
                  {this.openGraphImageSource() !== "auto" &&
                    this.openGraphImageSource() !== "custom" && (
                      <div className="SeoItemContent-helpertext">
                        Image source managed by {this.openGraphImageSource()}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Robots */}
            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Robots</div>
                <div className="helpText">
                  Robot-crawling settings for this item.
                </div>
              </div>

              <div className="SeoItemContent">
                <div
                  class={clsx(
                    "SeoTags-dropdown-container",
                    this.seoTagsOpened && "SeoTags-dropdown-open"
                  )}
                >
                  <div
                    className="SeoTags"
                    onclick={() => (this.seoTagsOpened = !this.seoTagsOpened)}
                  >
                    {this.returnTag(
                      !this.robotsNoindex(),
                      "Allow indexing page",
                      "Page indexing not allowed"
                    )}
                    {this.returnTag(
                      !this.robotsNofollow(),
                      "Allow follow links",
                      "Link following not allowed"
                    )}
                    {this.robotsNoarchive() &&
                      this.returnTag(false, "", "Archiving pages not allowed")}
                    {this.robotsNoimageindex() &&
                      this.returnTag(false, "", "Image indexing not allowed")}
                    {this.robotsNosnippet() &&
                      this.returnTag(
                        false,
                        "",
                        "Taking text-snippets not allowed"
                      )}
                  </div>

                  <div className={"SeoTags-dropdown"}>
                    {Switch.component(
                      {
                        state: !this.robotsNoindex(),
                        onchange: (value) => {
                          this.robotsNoindex(!value);
                          this.updateHasChanges();
                        },
                      },
                      "Allow indexing page"
                    )}
                    {Switch.component(
                      {
                        state: !this.robotsNofollow(),
                        onchange: (value) => {
                          this.robotsNofollow(!value);
                          this.updateHasChanges();
                        },
                      },
                      "Allow following links to different pages"
                    )}
                    {Switch.component(
                      {
                        state: this.robotsNoarchive(),
                        onchange: (value) => {
                          this.robotsNoarchive(value);
                          this.updateHasChanges();
                        },
                      },
                      "Disable archiving page (noarchive)"
                    )}
                    {Switch.component(
                      {
                        state: this.robotsNoimageindex(),
                        onchange: (value) => {
                          this.robotsNoimageindex(value);
                          this.updateHasChanges();
                        },
                      },
                      "Disable indexing images on this page (noimageindex)"
                    )}
                    {Switch.component(
                      {
                        state: this.robotsNosnippet(),
                        onchange: (value) => {
                          this.robotsNosnippet(value);
                          this.updateHasChanges();
                        },
                      },
                      "Disable text-snippes on page (nosnippet)"
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Estimated reading time</div>
                <div className="helpText">
                  Estimated reading time in seconds.
                </div>
              </div>

              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  <input
                    className="FormControl"
                    bidi={this.estimatedReadingTime}
                    placeholder="Reading time in seconds"
                    type="number"
                    disabled={this.autoUpdateData()}
                  />

                  {this.autoUpdateData() && (
                    <div className="ManagedText">
                      <i className="fas fa-check" /> Managed
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Twitter card</div>
              </div>

              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  {Switch.component(
                    {
                      state: !this.enableCustomTwitter,
                      onchange: (value) => (this.enableCustomTwitter = !value),
                      disabled: this.autoUpdateData(),
                    },
                    "Auto generate Twitter card"
                  )}

                  {this.autoUpdateData() && (
                    <div className="ManagedText">
                      <i className="fas fa-check" /> Managed
                    </div>
                  )}
                </div>
              </div>
            </div>

            {this.enableCustomTwitter && (
              <div className="SeoItemContainer">
                <div className="SeoItemInfo">
                  <div class={"SeoItemInfo-title"}>Twitter title</div>
                </div>

                <div className="SeoItemContent">
                  <div className="ManagedContainer">
                    <input
                      className="FormControl"
                      bidi={this.twitterTitle}
                      placeholder={this.metaTitle()}
                      disabled={this.autoUpdateData()}
                    />
                  </div>
                </div>
              </div>
            )}

            {this.enableCustomTwitter && (
              <div className="SeoItemContainer">
                <div className="SeoItemInfo">
                  <div class={"SeoItemInfo-title"}>Twitter description</div>
                </div>

                <div className="SeoItemContent">
                  <div className="ManagedContainer">
                    <textarea
                      className="FormControl"
                      bidi={this.twitterDescription}
                      placeholder={this.description()}
                      disabled={this.autoUpdateData()}
                    />
                  </div>
                </div>
              </div>
            )}

            {this.enableCustomTwitter && (
              <div className="SeoItemContainer">
                <div className="SeoItemInfo">
                  <div class={"SeoItemInfo-title"}>Twitter image</div>
                  <div className="helpText">Displays an image on Twitter.</div>
                </div>

                <div className="SeoItemContent">
                  <div className="ManagedContainer">
                    <input
                      className="FormControl"
                      bidi={this.twitterImage}
                      placeholder={this.openGraphImage() ?? "Enter image URL"}
                      disabled={
                        this.autoUpdateData() && this.twitterImage() === "auto"
                      }
                    />

                    {this.returnFoFUploadButton((fileUrl) => {
                      this.twitterImage(fileUrl);
                      this.twitterImageSource("fof-upload");
                    })}

                    {/* Show managed by message */}
                    {this.twitterImageSource() !== "auto" &&
                      this.twitterImageSource() !== "custom" && (
                        <div className="SeoItemContent-helpertext">
                          Image source managed by {this.twitterImageSource()} -{" "}
                          <a
                            href="#"
                            onclick={(e) => {
                              e.preventDefault();

                              this.twitterImage(null);
                              this.twitterImageSource("auto");
                              this.updateHasChanges();
                            }}
                          >
                            Reset image
                          </a>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            <div className="SeoItemContainer">
              <div className="SeoItemInfo">
                <div class={"SeoItemInfo-title"}>Open Graph tags</div>
              </div>

              <div className="SeoItemContent">
                <div className="ManagedContainer">
                  {Switch.component(
                    {
                      state: !this.enableCustomOpenGraph,
                      onchange: (value) =>
                        (this.enableCustomOpenGraph = !value),
                      disabled: this.autoUpdateData(),
                    },
                    "Auto generate Open Graph tags"
                  )}

                  {this.autoUpdateData() && (
                    <div className="ManagedText">
                      <i className="fas fa-check" /> Managed
                    </div>
                  )}
                </div>
              </div>
            </div>

            {this.enableCustomOpenGraph && (
              <div className="SeoItemContainer">
                <div className="SeoItemInfo">
                  <div class={"SeoItemInfo-title"}>Open Graph title</div>
                </div>

                <div className="SeoItemContent">
                  <div className="ManagedContainer">
                    <input
                      className="FormControl"
                      bidi={this.openGraphTitle}
                      placeholder={this.metaTitle()}
                      disabled={this.autoUpdateData()}
                    />
                  </div>
                </div>
              </div>
            )}

            {this.enableCustomOpenGraph && (
              <div className="SeoItemContainer">
                <div className="SeoItemInfo">
                  <div class={"SeoItemInfo-title"}>Open Graph description</div>
                </div>

                <div className="SeoItemContent">
                  <div className="ManagedContainer">
                    <textarea
                      className="FormControl"
                      bidi={this.openGraphDescription}
                      placeholder="Custom Twitter description"
                      disabled={this.autoUpdateData()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style="padding: 25px 30px; text-align: center;">
          {this.closeInfoText && (
            <div style="margin-bottom: 15px; font-size: 12px;">
              <b>Note:</b> {this.closeInfoText}
            </div>
          )}
          {this.closeDialogButton()}
        </div>
      </div>
    );
  }

  returnFoFUploadButton(onSelect) {
    let fofUploadButton = null;

    if (
      "fof-upload" in flarum.extensions &&
      app.forum.attribute("fof-upload.canUpload")
    ) {
      const {
        components: { Uploader, FileManagerModal },
      } = require("@fof-upload");

      const uploader = new Uploader();

      fofUploadButton = (
        <Button
          class="UploadButton Button"
          onclick={async () => {
            app.modal.show(
              FileManagerModal,
              {
                uploader: uploader,
                onSelect: (files) => {
                  const file = app.store.getById("files", files[0]);

                  onSelect(file.url());
                  this.updateHasChanges();
                },
              },
              true
            );
          }}
        >
          Upload file
        </Button>
      );
    }

    return fofUploadButton;
  }

  returnTag(isEnabled, enabledText, disabledText) {
    return (
      <div className={clsx("SeoTag", !isEnabled && "SeoTagDisabled")}>
        {isEnabled ? enabledText : disabledText}
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

  updateHasChanges() {
    this.closeText =
      !this.wasManaged && this.autoUpdateData() ? "Save & auto-fill" : "Save";

    // Transform custom tags to managed tags
    if (!this.wasManaged && this.autoUpdateData()) {
      this.closeInfoText =
        "This change will revert custom changes and fill the meta-tags with item-data.";
    }

    this.hasChanges = true;
  }

  submitData() {
    let data = {};

    data.autoUpdateData = this.autoUpdateData();

    data.title = this.metaTitle();
    data.description = this.description();

    // Add keywords
    if (this.keywords() !== "") {
      data.keywords = this.keywords() ?? null;
    }

    // Add robot settings
    data.robotsNoindex = this.robotsNoindex();
    data.robotsNofollow = this.robotsNofollow();
    data.robotsNoarchive = this.robotsNoarchive();
    data.robotsNoimageindex = this.robotsNoimageindex();
    data.robotsNosnippet = this.robotsNosnippet();

    // Add Twitter info
    if (this.twitterTitle() !== "") {
      data.twitterTitle = this.twitterTitle() ?? null;
    }

    if (this.twitterDescription() !== "") {
      data.twitterDescription = this.twitterDescription() ?? null;
    }

    if (this.twitterImage() !== "") {
      data.twitterImage = this.twitterImage();
    }

    if (this.twitterImageSource() !== "auto") {
      data.twitterImageSource = this.twitterImageSource() ?? null;
    }

    // Open graph
    if (this.openGraphTitle() !== "") {
      data.openGraphTitle = this.openGraphTitle() ?? null;
    }

    if (this.openGraphDescription() !== "") {
      data.openGraphDescription = this.openGraphDescription() ?? null;
    }
    if (this.openGraphImage() !== "") {
      data.openGraphImage = this.openGraphImage() ?? null;
    }

    if (this.openGraphImageSource() !== "auto") {
      data.openGraphImageSource = this.openGraphImageSource() ?? null;
    }

    if (this.estimatedReadingTime() !== "") {
      data.estimatedReadingTime = this.estimatedReadingTime() ?? null;
    }

    return data;
  }

  // Close or save setting
  onsubmit(e) {
    e.preventDefault();

    if (!this.hasChanges) {
      this.hide();
      return;
    }

    this.loading = true;

    this.meta
      .save(this.submitData())
      .then(() => {
        app.alerts.show({ type: "success" }, "Saved!");
        this.hide();
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        this.saving = false;
        m.redraw();
      });
  }

  onsaved() {
    this.hide();
  }
}
