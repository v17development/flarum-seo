import app from "flarum/forum/app";
import DiscussionControls from "flarum/forum/utils/DiscussionControls";
import Button from "flarum/forum/components/Button";
import { extend } from "flarum/common/extend";
import MetaSeoModal from "../common/Components/MetaSeoModal";
import SeoMeta from "../common/Models/SeoMeta";
import Discussion from "flarum/common/models/Discussion";
import Model from "flarum/common/Model";

export * from "../common/extend";

app.initializers.add("v17development-flarum-seo", () => {
  extend(
    DiscussionControls,
    "moderationControls",
    function (items, discussion) {
      if (!app.forum.attribute("canConfigureSeo")) return;

      items.add(
        "manageSeo",
        Button.component(
          {
            icon: "fas fa-search",
            onclick: () =>
              app.modal.show(MetaSeoModal, {
                objectType: "discussions",
                objectId: discussion.id(),
              }),
          },
          app.translator.trans(
            "v17development-flarum-seo.forum.controls.configure_seo"
          )
        ),
        -1000
      );
    }
  );

  // Register SeoMeta model
  app.store.models.seoMeta = SeoMeta;

  // Register SeoMeta relations
  Discussion.prototype.seoMeta = Model.hasOne("seoMeta");
});
