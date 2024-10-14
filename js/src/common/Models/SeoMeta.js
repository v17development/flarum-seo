import Model from "flarum/common/Model";
import mixin from "flarum/common/utils/mixin";

export default class SeoMeta extends mixin(Model, {
  // Object info
  objectType: Model.attribute("objectType"),
  objectId: Model.attribute("objectId"),

  // Auto update data
  autoUpdateData: Model.attribute("autoUpdateData"),

  // Default HTML Tags
  title: Model.attribute("title"),
  description: Model.attribute("description"),
  keywords: Model.attribute("keywords"),

  // Robots
  robotsNoindex: Model.attribute("robotsNoindex"),
  robotsNofollow: Model.attribute("robotsNofollow"),
  robotsNoarchive: Model.attribute("robotsNoarchive"),
  robotsNoimageindex: Model.attribute("robotsNoimageindex"),
  robotsNosnippet: Model.attribute("robotsNosnippet"),

  // Twitter tags
  twitterTitle: Model.attribute("twitterTitle"),
  twitterDescription: Model.attribute("twitterDescription"),
  twitterImage: Model.attribute("twitterImage"),
  twitterImageSource: Model.attribute("twitterImageSource"),

  // Open Graph tags
  openGraphTitle: Model.attribute("openGraphTitle"),
  openGraphDescription: Model.attribute("openGraphDescription"),
  openGraphImage: Model.attribute("openGraphImage"),
  openGraphImageSource: Model.attribute("openGraphImageSource"),

  // Extra
  estimatedReadingTime: Model.attribute("estimatedReadingTime"),

  // Row info
  createdAt: Model.attribute("createdAt"),
  updatedAt: Model.attribute("updatedAt"),
}) {
  apiEndpoint() {
    return "/seo_meta" + (this.exists ? "/" + this.data.id : "");
  }
}
