/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/utils/countKeywords.js":
/*!******************************************!*\
  !*** ./src/admin/utils/countKeywords.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ countKeywords)
/* harmony export */ });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Check if the keywords field is filled in correctly
 * 
 * @param string _keywords 
 */
function countKeywords(_keywords) {
  // No keywords set up yet
  if (_keywords == "") return true;

  // Split all commas
  var keywords = _keywords.split(",");
  var status_ok = true;

  // Go through all keywords
  for (var _iterator = _createForOfIteratorHelperLoose(keywords), _step; !(_step = _iterator()).done;) {
    var keyword = _step.value;
    // Keywords shouldn't have more then three spaces
    if (keyword.split(" ").length > 4) {
      status_ok = false;
      break;
    }
  }
  ;

  // Seems allright
  return status_ok;
}

/***/ }),

/***/ "./src/common/Components/MetaSeoModal.js":
/*!***********************************************!*\
  !*** ./src/common/Components/MetaSeoModal.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MetaSeoModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Alert */ "flarum/common/components/Alert");
/* harmony import */ var flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/components/FieldSet */ "flarum/components/FieldSet");
/* harmony import */ var flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _admin_utils_countKeywords__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../admin/utils/countKeywords */ "./src/admin/utils/countKeywords.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");












var MetaSeoModal = /*#__PURE__*/function (_Modal) {
  function MetaSeoModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.initialized = true;
    _this.initialLoading = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(MetaSeoModal, _Modal);
  var _proto = MetaSeoModal.prototype;
  _proto.oninit = function oninit(vnode) {
    var _this2 = this;
    _Modal.prototype.oninit.call(this, vnode);

    // Open dialog
    if (this.attrs.object) {
      // Get SeoMeta relationship
      if (!this.attrs.object.seoMeta) {
        this.initialized = false;
        app.alerts.show((flarum_common_components_Alert__WEBPACK_IMPORTED_MODULE_7___default()), {
          type: "error",
          title: "This object is not a supported SeoMeta object",
          controls: [m("a", {
            "class": "Button Button--link",
            href: "https://community.v17.dev/knowledgebase/46",
            target: "_blank"
          }, "Documentation")]
        }, "Please open this dialog using the objectType and objectId properties or register the object relationship instead.");
        setTimeout(function () {
          _this2.hide();
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
  };
  _proto.initializeData = function initializeData() {
    if (!this.meta) return;
    this.autoUpdateData = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.autoUpdateData());
    this.wasManaged = this.meta.autoUpdateData() === true;
    this.metaTitle = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.title());
    this.description = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.description());
    this.keywords = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.keywords());
    this.robotsNoindex = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.robotsNoindex());
    this.robotsNofollow = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.robotsNofollow());
    this.robotsNoarchive = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.robotsNoarchive());
    this.robotsNoimageindex = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.robotsNoimageindex());
    this.robotsNosnippet = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.robotsNosnippet());
    this.twitterTitle = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.twitterTitle());
    this.twitterDescription = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.twitterDescription());
    this.twitterImage = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.twitterImage());
    this.twitterImageSource = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.twitterImageSource());
    this.openGraphTitle = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.openGraphTitle());
    this.openGraphDescription = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.openGraphDescription());
    this.openGraphImage = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.openGraphImage());
    this.openGraphImageSource = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.openGraphImageSource());
    this.estimatedReadingTime = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.estimatedReadingTime());
    this.createdAt = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.createdAt());
    this.updatedAt = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()(this.meta.updatedAt());
    this.enableCustomTwitter = this.twitterTitle() !== null || this.twitterDescription() !== null || this.twitterImageSource() !== "auto" ? true : false;
    this.enableCustomOpenGraph = this.openGraphTitle() !== null || this.openGraphDescription() !== null ? true : false;
  };
  _proto.title = function title() {
    return "SEO settings - Meta";
  };
  _proto.className = function className() {
    return "Modal Modal-SEO-settings";
  };
  _proto.initializeLoad = function initializeLoad() {
    var _this3 = this;
    this.initialLoading = true;
    app.store.find("seo_meta", this.attrs.objectType + "-" + this.attrs.objectId).then(function (data) {
      _this3.isLoading = false;
      _this3.meta = data;
      _this3.initialLoading = false;
      _this3.initializeData();
    }).then(function () {
      m.redraw();
    });
  };
  _proto.content = function content() {
    var _this4 = this,
      _this$keywords,
      _this$openGraphImage;
    // Hide due to invalid relationship or loading data
    if (!this.initialized || this.initialLoading) {
      return m("div", null, flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_8___default().component({}));
    }
    return m("div", null, m("div", {
      className: "Modal-body",
      onkeyup: function onkeyup() {
        return _this4.updateHasChanges();
      }
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Auto update meta tags"), m("div", {
      className: "helpText"
    }, "When enabled, this items meta tags are automatically updated when the object changes.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: this.autoUpdateData(),
      onchange: function onchange(value) {
        _this4.autoUpdateData(value);
        _this4.updateHasChanges();
      }
    }, "Update object SEO on change")))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Meta title"), m("div", {
      className: "helpText"
    }, "Title in search engines.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("input", {
      className: "FormControl",
      bidi: this.metaTitle,
      placeholder: "Enter page title",
      disabled: this.autoUpdateData()
    }), this.autoUpdateData() && m("div", {
      className: "ManagedText"
    }, m("i", {
      className: "fas fa-check"
    }), " Managed")))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, " Meta description"), m("div", {
      className: "helpText"
    }, "Describes the item and shown in search engines.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("textarea", {
      className: "FormControl",
      bidi: this.description,
      placeholder: "Add a few keywords",
      disabled: this.autoUpdateData()
    }), this.autoUpdateData() && m("div", {
      className: "ManagedText"
    }, m("i", {
      className: "fas fa-check"
    }), " Managed")))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Keywords"), m("div", {
      className: "helpText"
    }, "Enter one or more keywords that describes this item.")), m("div", {
      className: "SeoItemContent"
    }, m("textarea", {
      className: "FormControl",
      bidi: this.keywords,
      placeholder: "Add a few keywords"
    }), m("div", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_11__["default"])("SeoItemContent-helpertext", (0,_admin_utils_countKeywords__WEBPACK_IMPORTED_MODULE_10__["default"])((_this$keywords = this.keywords()) != null ? _this$keywords : "") == false && "invalid")
    }, m("b", null, "Note: Separate keywords with a comma."), " Example:", " ", m("i", null, "flarum, web development, forum, apples, security")))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Meta image"), m("div", {
      className: "helpText"
    }, "Displays an image.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("input", {
      className: "FormControl",
      bidi: this.openGraphImage,
      placeholder: "Enter image URL",
      disabled: this.autoUpdateData() && this.openGraphImageSource() === "auto"
    }), this.autoUpdateData() && this.openGraphImageSource() !== "custom" && m("div", {
      className: "ManagedText"
    }, m("i", {
      className: "fas fa-check"
    }), " Managed"), !this.autoUpdateData() && this.returnFoFUploadButton(function (fileUrl) {
      _this4.openGraphImage(fileUrl);
      _this4.openGraphImageSource("fof-upload");
    }), this.openGraphImageSource() !== "auto" && this.openGraphImageSource() !== "custom" && m("div", {
      className: "SeoItemContent-helpertext"
    }, "Image source managed by ", this.openGraphImageSource())))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Robots"), m("div", {
      className: "helpText"
    }, "Robot-crawling settings for this item.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      "class": (0,clsx__WEBPACK_IMPORTED_MODULE_11__["default"])("SeoTags-dropdown-container", this.seoTagsOpened && "SeoTags-dropdown-open")
    }, m("div", {
      className: "SeoTags",
      onclick: function onclick() {
        return _this4.seoTagsOpened = !_this4.seoTagsOpened;
      }
    }, this.returnTag(!this.robotsNoindex(), "Allow indexing page", "Page indexing not allowed"), this.returnTag(!this.robotsNofollow(), "Allow follow links", "Link following not allowed"), this.robotsNoarchive() && this.returnTag(false, "", "Archiving pages not allowed"), this.robotsNoimageindex() && this.returnTag(false, "", "Image indexing not allowed"), this.robotsNosnippet() && this.returnTag(false, "", "Taking text-snippets not allowed")), m("div", {
      className: "SeoTags-dropdown"
    }, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: !this.robotsNoindex(),
      onchange: function onchange(value) {
        _this4.robotsNoindex(!value);
        _this4.updateHasChanges();
      }
    }, "Allow indexing page"), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: !this.robotsNofollow(),
      onchange: function onchange(value) {
        _this4.robotsNofollow(!value);
        _this4.updateHasChanges();
      }
    }, "Allow following links to different pages"), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: this.robotsNoarchive(),
      onchange: function onchange(value) {
        _this4.robotsNoarchive(value);
        _this4.updateHasChanges();
      }
    }, "Disable archiving page (noarchive)"), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: this.robotsNoimageindex(),
      onchange: function onchange(value) {
        _this4.robotsNoimageindex(value);
        _this4.updateHasChanges();
      }
    }, "Disable indexing images on this page (noimageindex)"), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: this.robotsNosnippet(),
      onchange: function onchange(value) {
        _this4.robotsNosnippet(value);
        _this4.updateHasChanges();
      }
    }, "Disable text-snippes on page (nosnippet)"))))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Estimated reading time"), m("div", {
      className: "helpText"
    }, "Estimated reading time in seconds.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("input", {
      className: "FormControl",
      bidi: this.estimatedReadingTime,
      placeholder: "Reading time in seconds",
      type: "number",
      disabled: this.autoUpdateData()
    }), this.autoUpdateData() && m("div", {
      className: "ManagedText"
    }, m("i", {
      className: "fas fa-check"
    }), " Managed")))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Twitter card")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: !this.enableCustomTwitter,
      onchange: function onchange(value) {
        return _this4.enableCustomTwitter = !value;
      },
      disabled: this.autoUpdateData()
    }, "Auto generate Twitter card"), this.autoUpdateData() && m("div", {
      className: "ManagedText"
    }, m("i", {
      className: "fas fa-check"
    }), " Managed")))), this.enableCustomTwitter && m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Twitter title")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("input", {
      className: "FormControl",
      bidi: this.twitterTitle,
      placeholder: this.metaTitle(),
      disabled: this.autoUpdateData()
    })))), this.enableCustomTwitter && m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Twitter description")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("textarea", {
      className: "FormControl",
      bidi: this.twitterDescription,
      placeholder: this.description(),
      disabled: this.autoUpdateData()
    })))), this.enableCustomTwitter && m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Twitter image"), m("div", {
      className: "helpText"
    }, "Displays an image on Twitter.")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("input", {
      className: "FormControl",
      bidi: this.twitterImage,
      placeholder: (_this$openGraphImage = this.openGraphImage()) != null ? _this$openGraphImage : "Enter image URL",
      disabled: this.autoUpdateData() && this.twitterImage() === "auto"
    }), this.returnFoFUploadButton(function (fileUrl) {
      _this4.twitterImage(fileUrl);
      _this4.twitterImageSource("fof-upload");
    }), this.twitterImageSource() !== "auto" && this.twitterImageSource() !== "custom" && m("div", {
      className: "SeoItemContent-helpertext"
    }, "Image source managed by ", this.twitterImageSource(), " -", " ", m("a", {
      href: "#",
      onclick: function onclick(e) {
        e.preventDefault();
        _this4.twitterImage(null);
        _this4.twitterImageSource("auto");
        _this4.updateHasChanges();
      }
    }, "Reset image"))))), m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Open Graph tags")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: !this.enableCustomOpenGraph,
      onchange: function onchange(value) {
        return _this4.enableCustomOpenGraph = !value;
      },
      disabled: this.autoUpdateData()
    }, "Auto generate Open Graph tags"), this.autoUpdateData() && m("div", {
      className: "ManagedText"
    }, m("i", {
      className: "fas fa-check"
    }), " Managed")))), this.enableCustomOpenGraph && m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Open Graph title")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("input", {
      className: "FormControl",
      bidi: this.openGraphTitle,
      placeholder: this.metaTitle(),
      disabled: this.autoUpdateData()
    })))), this.enableCustomOpenGraph && m("div", {
      className: "SeoItemContainer"
    }, m("div", {
      className: "SeoItemInfo"
    }, m("div", {
      "class": "SeoItemInfo-title"
    }, "Open Graph description")), m("div", {
      className: "SeoItemContent"
    }, m("div", {
      className: "ManagedContainer"
    }, m("textarea", {
      className: "FormControl",
      bidi: this.openGraphDescription,
      placeholder: "Custom Twitter description",
      disabled: this.autoUpdateData()
    })))))), m("div", {
      style: "padding: 25px 30px; text-align: center;"
    }, this.closeInfoText && m("div", {
      style: "margin-bottom: 15px; font-size: 12px;"
    }, m("b", null, "Note:"), " ", this.closeInfoText), this.closeDialogButton()));
  };
  _proto.returnFoFUploadButton = function returnFoFUploadButton(_onSelect) {
    var _this5 = this;
    var fofUploadButton = null;
    if ("fof-upload" in flarum.extensions && app.forum.attribute("fof-upload.canUpload")) {
      var _require = __webpack_require__(/*! @fof-upload */ "@fof-upload"),
        _require$components = _require.components,
        Uploader = _require$components.Uploader,
        FileManagerModal = _require$components.FileManagerModal;
      var uploader = new Uploader();
      fofUploadButton = m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
        "class": "UploadButton Button",
        onclick: /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                app.modal.show(FileManagerModal, {
                  uploader: uploader,
                  onSelect: function onSelect(files) {
                    var file = app.store.getById("files", files[0]);
                    _onSelect(file.url());
                    _this5.updateHasChanges();
                  }
                }, true);
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))
      }, "Upload file");
    }
    return fofUploadButton;
  };
  _proto.returnTag = function returnTag(isEnabled, enabledText, disabledText) {
    return m("div", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_11__["default"])("SeoTag", !isEnabled && "SeoTagDisabled")
    }, isEnabled ? enabledText : disabledText);
  };
  _proto.closeDialogButton = function closeDialogButton() {
    return m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading
    }, this.closeText);
  };
  _proto.updateHasChanges = function updateHasChanges() {
    this.closeText = !this.wasManaged && this.autoUpdateData() ? "Save & auto-fill" : "Save";

    // Transform custom tags to managed tags
    if (!this.wasManaged && this.autoUpdateData()) {
      this.closeInfoText = "This change will revert custom changes and fill the meta-tags with item-data.";
    }
    this.hasChanges = true;
  };
  _proto.submitData = function submitData() {
    var data = {};
    data.autoUpdateData = this.autoUpdateData();
    data.title = this.metaTitle();
    data.description = this.description();

    // Add keywords
    if (this.keywords() !== "") {
      var _this$keywords2;
      data.keywords = (_this$keywords2 = this.keywords()) != null ? _this$keywords2 : null;
    }

    // Add robot settings
    data.robotsNoindex = this.robotsNoindex();
    data.robotsNofollow = this.robotsNofollow();
    data.robotsNoarchive = this.robotsNoarchive();
    data.robotsNoimageindex = this.robotsNoimageindex();
    data.robotsNosnippet = this.robotsNosnippet();

    // Add Twitter info
    if (this.twitterTitle() !== "") {
      var _this$twitterTitle;
      data.twitterTitle = (_this$twitterTitle = this.twitterTitle()) != null ? _this$twitterTitle : null;
    }
    if (this.twitterDescription() !== "") {
      var _this$twitterDescript;
      data.twitterDescription = (_this$twitterDescript = this.twitterDescription()) != null ? _this$twitterDescript : null;
    }
    if (this.twitterImage() !== "") {
      data.twitterImage = this.twitterImage();
    }
    if (this.twitterImageSource() !== "auto") {
      var _this$twitterImageSou;
      data.twitterImageSource = (_this$twitterImageSou = this.twitterImageSource()) != null ? _this$twitterImageSou : null;
    }

    // Open graph
    if (this.openGraphTitle() !== "") {
      var _this$openGraphTitle;
      data.openGraphTitle = (_this$openGraphTitle = this.openGraphTitle()) != null ? _this$openGraphTitle : null;
    }
    if (this.openGraphDescription() !== "") {
      var _this$openGraphDescri;
      data.openGraphDescription = (_this$openGraphDescri = this.openGraphDescription()) != null ? _this$openGraphDescri : null;
    }
    if (this.openGraphImage() !== "") {
      var _this$openGraphImage2;
      data.openGraphImage = (_this$openGraphImage2 = this.openGraphImage()) != null ? _this$openGraphImage2 : null;
    }
    if (this.openGraphImageSource() !== "auto") {
      var _this$openGraphImageS;
      data.openGraphImageSource = (_this$openGraphImageS = this.openGraphImageSource()) != null ? _this$openGraphImageS : null;
    }
    if (this.estimatedReadingTime() !== "") {
      var _this$estimatedReadin;
      data.estimatedReadingTime = (_this$estimatedReadin = this.estimatedReadingTime()) != null ? _this$estimatedReadin : null;
    }
    return data;
  }

  // Close or save setting
  ;
  _proto.onsubmit = function onsubmit(e) {
    var _this6 = this;
    e.preventDefault();
    if (!this.hasChanges) {
      this.hide();
      return;
    }
    this.loading = true;
    this.meta.save(this.submitData()).then(function () {
      app.alerts.show({
        type: "success"
      }, "Saved!");
      _this6.hide();
    })["catch"](function (e) {
      console.log(e);
    }).then(function () {
      _this6.saving = false;
      m.redraw();
    });
  };
  _proto.onsaved = function onsaved() {
    this.hide();
  };
  return MetaSeoModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/common/Models/SeoMeta.js":
/*!**************************************!*\
  !*** ./src/common/Models/SeoMeta.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeoMeta)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/mixin */ "flarum/common/utils/mixin");
/* harmony import */ var flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);



var SeoMeta = /*#__PURE__*/function (_mixin) {
  function SeoMeta() {
    return _mixin.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SeoMeta, _mixin);
  var _proto = SeoMeta.prototype;
  _proto.apiEndpoint = function apiEndpoint() {
    return "/seo_meta" + (this.exists ? "/" + this.data.id : "");
  };
  return SeoMeta;
}(flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()), {
  // Object info
  objectType: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("objectType"),
  objectId: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("objectId"),
  // Auto update data
  autoUpdateData: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("autoUpdateData"),
  // Default HTML Tags
  title: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("title"),
  description: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("description"),
  keywords: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("keywords"),
  // Robots
  robotsNoindex: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("robotsNoindex"),
  robotsNofollow: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("robotsNofollow"),
  robotsNoarchive: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("robotsNoarchive"),
  robotsNoimageindex: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("robotsNoimageindex"),
  robotsNosnippet: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("robotsNosnippet"),
  // Twitter tags
  twitterTitle: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("twitterTitle"),
  twitterDescription: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("twitterDescription"),
  twitterImage: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("twitterImage"),
  twitterImageSource: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("twitterImageSource"),
  // Open Graph tags
  openGraphTitle: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("openGraphTitle"),
  openGraphDescription: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("openGraphDescription"),
  openGraphImage: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("openGraphImage"),
  openGraphImageSource: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("openGraphImageSource"),
  // Extra
  estimatedReadingTime: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("estimatedReadingTime"),
  // Row info
  createdAt: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("createdAt"),
  updatedAt: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute("updatedAt")
}));


/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/utils/DiscussionControls */ "flarum/forum/utils/DiscussionControls");
/* harmony import */ var flarum_forum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/Button */ "flarum/forum/components/Button");
/* harmony import */ var flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_Components_MetaSeoModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Components/MetaSeoModal */ "./src/common/Components/MetaSeoModal.js");
/* harmony import */ var _common_Models_SeoMeta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Models/SeoMeta */ "./src/common/Models/SeoMeta.js");
/* harmony import */ var flarum_tags_common_models_Tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/tags/common/models/Tag */ "flarum/tags/common/models/Tag");
/* harmony import */ var flarum_tags_common_models_Tag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_tags_common_models_Tag__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/models/Discussion */ "flarum/common/models/Discussion");
/* harmony import */ var flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_8__);









flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add("v17development-flarum-seo", function () {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__.extend)((flarum_forum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default()), "moderationControls", function (items, discussion) {
    if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("canConfigureSeo")) return;
    items.add("manageSeo", flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      icon: "fas fa-search",
      onclick: function onclick() {
        return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().modal.show(_common_Components_MetaSeoModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          objectType: "discussions",
          objectId: discussion.id()
        });
      }
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans("v17development-flarum-seo.forum.controls.configure_seo")), -1000);
  });

  // Register SeoMeta model
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store).models.seoMeta = _common_Models_SeoMeta__WEBPACK_IMPORTED_MODULE_5__["default"];

  // Register SeoMeta relations
  (flarum_common_models_Discussion__WEBPACK_IMPORTED_MODULE_7___default().prototype).seoMeta = flarum_common_Model__WEBPACK_IMPORTED_MODULE_8___default().hasOne("seoMeta");
  (flarum_tags_common_models_Tag__WEBPACK_IMPORTED_MODULE_6___default().prototype).seoMeta = flarum_common_Model__WEBPACK_IMPORTED_MODULE_8___default().hasOne("seoMeta");
});

/***/ }),

/***/ "@fof-upload":
/*!**************************************************!*\
  !*** external "flarum.extensions['fof-upload']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.extensions['fof-upload'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Alert":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Alert']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Alert'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/models/Discussion":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/models/Discussion']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/models/Discussion'];

/***/ }),

/***/ "flarum/common/utils/mixin":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/utils/mixin']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/mixin'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/FieldSet":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/FieldSet']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/FieldSet'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/Button":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Button']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Button'];

/***/ }),

/***/ "flarum/forum/utils/DiscussionControls":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['forum/utils/DiscussionControls']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/utils/DiscussionControls'];

/***/ }),

/***/ "flarum/tags/common/models/Tag":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['tags/common/models/Tag']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['tags/common/models/Tag'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/Stream'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/clsx/dist/clsx.mjs":
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map