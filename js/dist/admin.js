/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/Pages/HealthCheck.js":
/*!****************************************!*\
  !*** ./src/admin/Pages/HealthCheck.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HealthCheck)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__);





var HealthCheck = /*#__PURE__*/function (_Page) {
  function HealthCheck() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(HealthCheck, _Page);
  var _proto = HealthCheck.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    this.settings = app.data.settings;
    this.saving = false;
  };
  _proto.view = function view() {
    return m("div", null, m("p", {
      className: "seo-intro"
    }, "A quick SEO-health-check overview. If you have questions, ask your question the official ", m("a", {
      href: "https://discuss.flarum.org/d/18316-flarum-seo",
      target: "_blank"
    }, "Flarum forums ", m("i", {
      className: "fas fa-external-link-alt"
    })), ". When you have issues, ", m("a", {
      href: "https://github.com/v17development/flarum-seo/issues",
      target: "_blank"
    }, "create a new issue ", m("i", {
      className: "fas fa-external-link-alt"
    })), "."), m("p", {
      className: "seo-intro"
    }, "Are you a developer with some free time left? Contribute to the project ", m("a", {
      href: "https://github.com/v17development/flarum-seo",
      target: "_blank"
    }, "on GitHub ", m("i", {
      className: "fas fa-external-link-alt"
    })), ". Have you have built a Flarum Extension and you'd like to use the SEO tools from this extension? Please ", m("a", {
      href: "https://community.v17.dev/knowledgebase/22",
      target: "_blank"
    }, "read the documentation ", m("i", {
      className: "fas fa-external-link-alt"
    })), "."), m("p", {
      className: "seo-intro"
    }, "For optimal search engine results, make sure all checks are green."), m("table", {
      className: "seo-check-table"
    }, m("thead", null, m("tr", null, m("td", null, "Technique"), m("td", {
      width: "150"
    }, "Status"))), m("tbody", null, this.forumDescription(), this.forumKeywords(), this.siteUsesSSL(), this.discussionPostSet(), this.socialMediaImage(), this.hasSitemap(), this.registeredSearchEngines(), this.robotsTxt(), this.tagsAvailable(), this.reviewAgain())));
  }

  // Forum description
  ;
  _proto.forumDescription = function forumDescription() {
    var passed = typeof this.settings.forum_description !== "undefined" && this.settings.forum_description !== '' ? true : 'must';
    var reason = 'You did not set up a forum description yet!';

    // Check minimal 20 characters
    if (passed === true && this.settings.forum_description.length <= 20) {
      passed = false;
      reason = 'Your forum description is lower then 20 characters. Please expand it for better search results.';
    }

    // Check description is not default text
    if (passed === true && this.settings.forum_description.indexOf('This is beta software') >= 0) {
      passed = 'must';
      reason = 'You did not change the default forum description after installation!';
    }
    return m("tr", null, m("td", null, "Your forum has a description", this.notPassedError(passed, reason, 'Update description', this.getSettingUrl('description'))), this.passed(passed, 'description'));
  }

  // Forum keywords
  ;
  _proto.forumKeywords = function forumKeywords() {
    var passed = typeof this.settings.forum_keywords !== "undefined" && this.settings.forum_keywords !== '' ? true : false;
    var reason = 'You did not set up a forum keywords yet!';
    return m("tr", null, m("td", null, "Your forum has keywords set up", this.notPassedError(passed, reason, 'Update keywords', this.getSettingUrl('keywords'))), this.passed(passed, 'keywords'));
  }

  // Does the site has SSL as default transport?
  ;
  _proto.siteUsesSSL = function siteUsesSSL() {
    var passed = app.forum.attribute('baseUrl').indexOf('https://') >= 0 ? true : 'must';
    return m("tr", null, m("td", null, "Your site has a secure connection available (SSL/TLS)", this.notPassedError(passed, 'Your forum does not force a SSL/TLS connection (a secure connection to your website). Most search engines won\'t index your website or lower your ranking if you have no secure connection available.', 'How to set up SSL', app.route('extension', {
      id: 'v17development-seo',
      page: 'ssl'
    }))), this.passed(passed));
  }

  // Discussion post crawl settings
  ;
  _proto.discussionPostSet = function discussionPostSet() {
    var passed = typeof this.settings.seo_reviewed_post_crawler !== "undefined";
    return m("tr", null, m("td", null, "Review discussion post crawl settings", this.notPassedError(passed, 'You will need to review this setting to pass.', 'Review post settings', this.getSettingUrl('discussion-post'))), this.passed(passed));
  }

  // Review bot settings
  ;
  _proto.socialMediaImage = function socialMediaImage() {
    var passed = true;
    if (typeof this.settings.seo_social_media_image_path === "undefined" || this.settings.seo_social_media_image_path === null) {
      passed = false;
    }
    return m("tr", null, m("td", null, "Set Up a social media image", this.notPassedError(passed, 'You did not set a social media image for your forum. It is recommended to set one. Your favicon will now be used as preview on social media.', 'Update image', this.getSettingUrl('social-media'))), this.passed(passed));
  }

  // Review bot settings
  ;
  _proto.hasSitemap = function hasSitemap() {
    var passed = true;
    if (app.data.settings.extensions_enabled.indexOf('flagrow-sitemap') === -1 && app.data.settings.extensions_enabled.indexOf('fof-sitemap') === -1) {
      passed = false;
    }
    return m("tr", null, m("td", null, "Your forum has a sitemap available", this.notPassedError(passed, 'It is highly recommended to install the FriendsOfFlarum sitemap extension!', 'Read more about adding a sitemap', app.route('extension', {
      id: 'v17development-seo',
      page: 'sitemap'
    }))), this.passed(passed));
  }

  // Robots.txt is available
  ;
  _proto.robotsTxt = function robotsTxt() {
    return m("tr", null, m("td", null, "Your forum has a ", m("b", null, "robots.txt"), " available. ", m("a", {
      href: app.forum.attribute('baseUrl') + "/robots.txt",
      target: "_blank",
      className: "robots-link"
    }, "Open robots.txt ", m("i", {
      className: "fas fa-external-link-alt"
    }))), this.passed(true));
  }

  // Robots.txt is available
  ;
  _proto.tagsAvailable = function tagsAvailable() {
    return m("tr", null, m("td", null, "Your forum has ", m("b", null, "meta tags"), " available (generated by this plugin)"), this.passed(true));
  }

  // Register your forum
  ;
  _proto.registeredSearchEngines = function registeredSearchEngines() {
    var passed = typeof this.settings.seo_reviewed_search_engines !== "undefined";
    return m("tr", null, m("td", null, "Register your forum to search engines", this.notPassedError(passed, 'You will need to review this to pass.', 'More information', app.route('extension', {
      id: 'v17development-seo',
      page: 'search-engines'
    }))), this.passed(passed));
  }

  // Review again
  ;
  _proto.reviewAgain = function reviewAgain() {
    var _this = this;
    var passed = true;

    // Set current date
    var nextReviewDate = new Date();

    // Check if previous review date exists
    if (typeof app.data.settings.seo_review_settings === "undefined") {
      passed = false;
    } else {
      // Ok, it exists. Set the review date
      nextReviewDate = new Date(app.data.settings.seo_review_settings * 1000);
    }

    // Date passed?
    if (passed && Math.floor(Date.now() / 1000) > app.data.settings.seo_review_settings) {
      passed = false;
    }
    return m("tr", null, m("td", null, "Review your SEO settings every two months. Next review needed on ", m("b", null, nextReviewDate.toDateString()), this.notPassedError(passed, 'It is time to re-review your SEO settings.', 'Ok! I reviewed them!', function () {
      var now = new Date();
      var nextDate = Math.floor(new Date(now.getFullYear(), now.getMonth() + 2, 1) / 1000);
      _this.saveSingleSetting('seo_review_settings', nextDate);
    })), this.passed(passed));
  }

  // Get setting URL
  ;
  _proto.getSettingUrl = function getSettingUrl(setting) {
    if (setting === void 0) {
      setting = '';
    }
    if (setting === '') {
      return app.route('extension', {
        id: 'v17development-seo'
      });
    }
    return app.route('extension', {
      id: 'v17development-seo',
      page: 'settings',
      setting: setting
    });
  }

  // Passed or not
  ;
  _proto.passed = function passed(_passed) {
    if (_passed === 'must') {
      return m("td", {
        className: "row-must"
      }, m("i", {
        "class": "fas fa-exclamation-circle"
      }), " Warning!");
    }
    if (!_passed) {
      return m("td", {
        className: "row-warning"
      }, m("i", {
        "class": "fas fa-exclamation-circle"
      }), " Warning!");
    }
    return m("td", {
      className: "row-passed"
    }, m("i", {
      "class": "fas fa-check"
    }), " All set!");
  }

  // General not-passed error
  ;
  _proto.notPassedError = function notPassedError(passed, reason, buttonText, url) {
    if (buttonText === void 0) {
      buttonText = 'Update setting';
    }
    if (url === void 0) {
      url = app.route('seoSettings');
    }
    if (passed === true) return;
    return m("div", {
      className: "row-not-passed-error"
    }, reason, m("div", {
      className: "button-container"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button',
      onclick: function onclick() {
        if (typeof url === 'string') {
          m.route.set(url);
        } else {
          url();
        }
      }
    }, buttonText)));
  }

  // Save
  ;
  _proto.saveSingleSetting = function saveSingleSetting(setting, value) {
    var _this2 = this;
    if (this.saving) return;
    this.saving = true;
    var data = {};
    data[setting] = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(function () {
      app.alerts.show({
        type: 'success'
      }, app.translator.trans('core.admin.settings.saved_message'));
    })["catch"](function () {}).then(function () {
      _this2.saving = false;
      m.redraw();
    });
  };
  return HealthCheck;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/Pages/RegisterToSearchEngines.js":
/*!****************************************************!*\
  !*** ./src/admin/Pages/RegisterToSearchEngines.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RegisterToSearchEngines)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");





var RegisterToSearchEngines = /*#__PURE__*/function (_Page) {
  function RegisterToSearchEngines() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RegisterToSearchEngines, _Page);
  var _proto = RegisterToSearchEngines.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    this.saving = false;
    this.hasConfirmed = app.data.settings.seo_reviewed_search_engines === "1";
  };
  _proto.view = function view() {
    var _this = this;
    return m("div", null, m("h2", null, "Submit your website to Search Engines"), m("p", null, "It is good practice to let Search Engines know your site is exists. This page will guide you in doing this succesfully."), m("p", null, "It is recommended to have a sitemap ready before completing this guide. If you don't have a sitemap yet, ", m("a", {
      href: "#/seo/sitemap"
    }, "click here to read more about them"), "."), m("div", null, m("h4", null, "Add your website to the Google search results"), m("p", null, "If you want to add your website to the Google search results, visit the ", m("a", {
      href: "https://search.google.com/search-console",
      target: "_blank"
    }, "Google Search Console ", m("i", {
      className: "fas fa-external-link-alt"
    })), ". You'll need to add your website and verify that you're the owner of the associated domain name."), m("p", null, "When you enter your domain you need to answer the following question for yourself: Do you want to use the 'www' sub-domain in the search results? You can ", m("strong", null, "not"), " change this later. Registering your domain in the Google Search Console multiple times won't result in a better ranking."), m("p", null, "When you completed the registration in the Google Search Console, visit the ", m("b", null, "Sitemaps"), " page. Pass your ", m("b", null, "sitemap.xml"), " to Google. Make sure that Google can crawl your sitemap and will keep doing this.")), m("div", null, m("h4", null, "Add your website to the Bing search results"), m("p", null, "If you want to add your website to the Bing search results, visit the ", m("a", {
      href: "https://www.bing.com/toolbox/webmaster",
      target: "_blank"
    }, "Bing Webmaster Tools ", m("i", {
      className: "fas fa-external-link-alt"
    })), " and complete the given steps. Not all fields are required."), m("p", null, "Don't forget to configure your sitemap URL. After you verified your website you're all set and Bing will now index your website.")), m("div", null, m("h4", null, "Add your website to the Yandex search results"), m("p", null, "If you want to add your website to the Yandex search results, visit the ", m("a", {
      href: "https://webmaster.yandex.com",
      target: "_blank"
    }, "Yandex.Webmaster ", m("i", {
      className: "fas fa-external-link-alt"
    })), " and follow the given steps."), m("p", null, "Don't forget to configure the sitemap in the Yandex.Webmaster.")), m("div", null, m("h4", null, "Add your website to the Yahoo search results"), m("p", null, "If you want to add your website to the Yahoo search results, finish your Bing search results registration. Yahoo will use that data.")), m("div", {
      className: "clear"
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button pull-right ' + (this.hasConfirmed ? 'hidden' : ''),
      onclick: function onclick() {
        return _this.confirm();
      },
      icon: 'fas fa-check',
      loading: this.saving
    }, 'I have read this'));
  };
  _proto.confirm = function confirm() {
    this.saveSingleSetting('seo_reviewed_search_engines', true);
  }

  // Save allow bots
  ;
  _proto.saveSingleSetting = function saveSingleSetting(setting, value) {
    var _this2 = this;
    if (this.saving) return;
    this.saving = true;
    var data = {};
    data[setting] = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default()(data).then(function () {
      _this2.hasConfirmed = true;
      app.alerts.show({
        type: 'success'
      }, app.translator.trans('core.admin.settings.saved_message'));
    })["catch"](function () {}).then(function () {
      _this2.saving = false;
      m.redraw();
    });
  };
  return RegisterToSearchEngines;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/Pages/SSLPage.js":
/*!************************************!*\
  !*** ./src/admin/Pages/SSLPage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SSLPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);


var SSLPage = /*#__PURE__*/function (_Page) {
  function SSLPage() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SSLPage, _Page);
  var _proto = SSLPage.prototype;
  _proto.view = function view() {
    return m("div", null, m("h2", null, "Why do I need an secure connection?"), m("p", null, "Safety and privacy awareness on the web is on the rise. ", m("b", null, "Almost every"), " developer/website owner want their website safe to use for their visitors so they won't need to be afraid that their data will be compromised by hackers or website-impersonators."), m("h4", null, "Search engines ", m("i", {
      className: "fas fa-heart"
    }), " secure connections"), m("p", null, "When you do not have a secure connection to your website, search engines will rank your site much lower then other sites, or even won't index it."), m("p", null, "When you have SSL available, your website will get an higher rank and will be indexed."), m("h4", null, "What is SSL or TLS?"), m("p", null, "The most people know ", m("b", null, "https"), " that's used for secure connections as SSL: ", m("i", null, "Secure Sockets Layer"), ". Officially it's called TLS: ", m("i", null, "Transport Layer Security"), ". This method is used to create a secure connection to your webserver what will prevent attackers or other webservers to impersonate your website and keep your visitors safe. The SSL connection will be broken if that happens and the visitors browsers will warning the user that's it's not trusted."), m("h4", null, "How to add SSL to your website?"), m("p", null, "For people who are using a webhosting, the most common way is to enter the webhosting panel, go to the hosting-settings of your website and click SSL. You can follow the steps to add SSL to your website. The most webhosting companies nowadays are supporting the popular certificate issuer ", m("a", {
      href: "https://letsencrypt.org/",
      target: "_blank"
    }, " Let's Encrypt ", m("i", {
      className: "fas fa-external-link-alt"
    })), "."), m("h4", null, "Okay, I added SSL!"), m("p", null, "Great! Now, change your ", m("b", null, "config.php"), " and change the ", m("b", null, "'url'"), " to ", m("b", null, "https"), "!"), m("h4", null, "What if I do not want to add SSL?"), m("p", null, "In that case, you can uninstall this extension as search engines ", m("b", null, "won't index your forum"), " or rank them far below other sites due safety reasons."));
  };
  return SSLPage;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/Pages/SettingsPage.js":
/*!*****************************************!*\
  !*** ./src/admin/Pages/SettingsPage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/ExtensionPage */ "flarum/components/ExtensionPage");
/* harmony import */ var flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Forms_SeoSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Forms/SeoSettings */ "./src/admin/components/Forms/SeoSettings.js");
/* harmony import */ var _HealthCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HealthCheck */ "./src/admin/Pages/HealthCheck.js");
/* harmony import */ var _RegisterToSearchEngines__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RegisterToSearchEngines */ "./src/admin/Pages/RegisterToSearchEngines.js");
/* harmony import */ var _SSLPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SSLPage */ "./src/admin/Pages/SSLPage.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Sitemap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Sitemap */ "./src/admin/Pages/Sitemap.js");








var SettingsPage = /*#__PURE__*/function (_ExtensionPage) {
  function SettingsPage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsPage, _ExtensionPage);
  var _proto = SettingsPage.prototype;
  _proto.content = function content() {
    var page = m.route.param().page || 'health';
    return m("div", {
      className: "ExtensionPage-settings FlarumSEO"
    }, m("div", {
      className: "seo-menu"
    }, m("div", {
      className: "container"
    }, this.menuButtons(page))), m("div", {
      className: "container FlarumSeoPage-container"
    }, this.pageContent(page)));
  }

  // Return button menus
  ;
  _proto.menuButtons = function menuButtons(page) {
    return [flarum_components_Button__WEBPACK_IMPORTED_MODULE_6___default().component({
      className: "Button " + (page === 'health' ? 'item-selected' : ''),
      onclick: function onclick() {
        return m.route.set(app.route('extension', {
          id: 'v17development-seo'
        }));
      },
      icon: 'fas fa-heartbeat'
    }, 'Health check'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_6___default().component({
      className: "Button " + (page === 'settings' ? 'item-selected' : ''),
      onclick: function onclick() {
        return m.route.set(app.route('extension', {
          id: 'v17development-seo',
          page: 'settings'
        }));
      },
      icon: 'fas fa-cogs'
    }, 'SEO settings'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_6___default().component({
      className: "Button " + (page === 'sitemap' ? 'item-selected' : ''),
      onclick: function onclick() {
        return m.route.set(app.route('extension', {
          id: 'v17development-seo',
          page: 'sitemap'
        }));
      },
      icon: 'fas fa-sitemap'
    }, 'Sitemap information'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_6___default().component({
      className: "Button " + (page === 'search-engines' ? 'item-selected' : ''),
      onclick: function onclick() {
        return m.route.set(app.route('extension', {
          id: 'v17development-seo',
          page: 'search-engines'
        }));
      },
      icon: 'fas fa-search'
    }, 'Search engine information'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_6___default().component({
      className: "Button " + (page === 'ssl' ? 'item-selected' : ''),
      onclick: function onclick() {
        return m.route.set(app.route('extension', {
          id: 'v17development-seo',
          page: 'ssl'
        }));
      },
      icon: 'fas fa-shield-alt'
    }, 'Set up SSL')];
  };
  _proto.pageContent = function pageContent(page) {
    if (page === 'search-engines') {
      return m(_RegisterToSearchEngines__WEBPACK_IMPORTED_MODULE_4__["default"], null);
    } else if (page === "settings") {
      return m(_components_Forms_SeoSettings__WEBPACK_IMPORTED_MODULE_2__["default"], null);
    } else if (page === "ssl") {
      return m(_SSLPage__WEBPACK_IMPORTED_MODULE_5__["default"], null);
    } else if (page === "sitemap") {
      return m(_Sitemap__WEBPACK_IMPORTED_MODULE_7__["default"], null);
    }

    // Default healthcheck
    return m(_HealthCheck__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  };
  return SettingsPage;
}((flarum_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/Pages/Sitemap.js":
/*!************************************!*\
  !*** ./src/admin/Pages/Sitemap.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sitemap)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Link */ "flarum/components/Link");
/* harmony import */ var flarum_components_Link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");




var Sitemap = /*#__PURE__*/function (_Page) {
  function Sitemap() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Sitemap, _Page);
  var _proto = Sitemap.prototype;
  _proto.view = function view() {
    return m("div", null, m("h2", null, "Why should you use a sitemap?"), m("p", null, "A sitemap is a XML file with a list of all the available pages on your website. It will be used by crawlers and search engines to find pages on your website."), m("p", null, "The sitemap file is automatically generated and does not need any maintenance."), m("h4", null, "What extension should I install?"), m("p", null, "At the moment, ", m("a", {
      href: "https://discuss.flarum.org/d/14941-fof-sitemap",
      target: "_blank"
    }, "FriendsOfFlarum Sitemap ", m("i", {
      className: "fas fa-external-link-alt"
    })), " is the best extension to install for Flarum. We advice you to install and activate this extension."), m("p", null, "This extension will make sure crawlers will find your forum ", m("b", null, "discussions"), ", ", m("b", null, "tags"), " (when extension is enabled) and ", m("b", null, "Pages"), " extension (when extension is installed and enabled). It will automatically make an sitemap.xml available."), m("h4", null, "I just installed the extension"), m("p", null, "In that case, activate it by clicking the extension in the sidebar at the left . Then this warning will disappear."));
  };
  return Sitemap;
}((flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/Forms/SeoSettings.js":
/*!***************************************************!*\
  !*** ./src/admin/components/Forms/SeoSettings.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeoSettings)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/FieldSet */ "flarum/components/FieldSet");
/* harmony import */ var flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/UploadImageButton */ "flarum/components/UploadImageButton");
/* harmony import */ var flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Modals_CrawlPostModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Modals/CrawlPostModal */ "./src/admin/components/Modals/CrawlPostModal.js");
/* harmony import */ var _Modals_RobotsModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Modals/RobotsModal */ "./src/admin/components/Modals/RobotsModal.js");
/* harmony import */ var _utils_countKeywords__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/countKeywords */ "./src/admin/utils/countKeywords.js");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Modals_DoFollowListModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Modals/DoFollowListModal */ "./src/admin/components/Modals/DoFollowListModal.js");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_12__);













var SeoSettings = /*#__PURE__*/function (_Component) {
  function SeoSettings() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SeoSettings, _Component);
  var _proto = SeoSettings.prototype;
  _proto.oninit = function oninit(vnode) {
    var _this = this;
    _Component.prototype.oninit.call(this, vnode);
    this.saving = false;
    this.fields = ['forum_title', 'forum_description', 'forum_keywords', 'seo_allow_all_bots', 'seo_twitter_card_size'];
    this.values = {};
    var settings = app.data.settings;
    this.fields.forEach(function (key) {
      return _this.values[key] = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_10___default()(settings[key] || "");
    });
    this.allowBotsValue = settings.seo_allow_all_bots !== "0";

    // Cheat 'seo_social_media_imageUrl'
    // Todo: Find a better way
    app.forum.data.attributes.seo_social_media_imageUrl = app.data.settings.seo_social_media_image_url;
    this.showField = 'all';

    // Single field
    if (m.route.param('setting') !== undefined) {
      this.showField = m.route.param('setting');
    }
  }

  // Create the form
  ;
  _proto.view = function view() {
    var _this2 = this;
    return m("div", null, this.infoText(), m("form", {
      onsubmit: this.onsubmit.bind(this),
      className: "BasicsPage"
    }, flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: app.translator.trans('core.admin.basics.forum_description_heading'),
      className: this.showField !== 'all' && this.showField !== 'description' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, app.translator.trans('core.admin.basics.forum_description_text')), m("textarea", {
      className: "FormControl",
      bidi: this.values.forum_description
    }), this.showField === "description" && flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      type: 'submit',
      className: 'Button Button--primary',
      loading: this.saving,
      disabled: !this.changed()
    }, app.translator.trans('core.admin.settings.submit_button'))]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: "Forum keywords",
      className: this.showField !== 'all' && this.showField !== 'keywords' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "Enter one or more keywords that describes your forum."), m("textarea", {
      className: "FormControl",
      bidi: this.values.forum_keywords,
      placeholder: "Add a few keywords"
    }), m("div", {
      className: "helpText",
      style: {
        color: (0,_utils_countKeywords__WEBPACK_IMPORTED_MODULE_9__["default"])(this.values.forum_keywords()) == false ? "red" : null
      }
    }, m("b", null, "Note: Separate keywords with a comma."), " Example: ", m("i", null, "flarum, web development, forum, apples, security")), this.showField === "keywords" && flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      type: 'submit',
      className: 'Button Button--primary',
      loading: this.saving,
      disabled: !this.changed()
    }, app.translator.trans('core.admin.settings.submit_button'))]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'Twitter card size',
      className: this.showField !== 'all' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "When your forum is shared on Twitter, it will have an image (if a social media image has been set up). This can be a big card with a big image, or a small card (summary) with a smaller image."), flarum_components_Select__WEBPACK_IMPORTED_MODULE_12___default().component({
      options: {
        'large': 'Large card (large image)',
        'summary': 'Summary card (smaller image)'
      },
      value: this.values.seo_twitter_card_size() || 'large',
      onchange: function onchange(val) {
        _this2.values.seo_twitter_card_size(val);
        _this2.hasChanges = true;
      }
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      type: 'submit',
      className: 'Button Button--primary',
      loading: this.saving,
      disabled: !this.changed()
    }, app.translator.trans('core.admin.settings.submit_button'))]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'Social media image',
      className: 'social-media-uploader ' + (this.showField !== 'all' && this.showField !== 'social-media' ? 'hidden' : '')
    }, [m("div", {
      className: "helpText"
    }, "Expecting a square image. Recommended size is 1200x1200 pixels. Otherwise use a landscape image, recommended size is 1200x630.", m("br", null), m("br", null), "This image will be used by Social Media when a user shares a page on your website (Facebook, Twitter, Reddit)."), flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_6___default().component({
      name: 'seo_social_media_image'
    })]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'Discussion post crawl settings',
      className: this.showField !== 'all' && this.showField !== 'discussion-post' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "This is an important setting about crawling your discussion posts in search results."), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button',
      onclick: function onclick() {
        return app.modal.show(_Modals_CrawlPostModal__WEBPACK_IMPORTED_MODULE_7__["default"]);
      }
    }, 'Setup post crawl settings')]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'No-follow links',
      className: this.showField !== 'all' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "All links to external domains will receive a '", m("i", null, "nofollow"), "' attribute by default. This will make sure people do not spam your forum with links to other domains in order to get more referrals."), m("div", {
      className: "helpText"
    }, "With this setting you are able to add domains to the 'do-follow' list. For example, you can add ", m("i", null, "flarum.org"), " to make sure links to this website do not receive a 'nofollow' attribute. ", m("a", {
      href: "https://community.v17.dev/knowledgebase/36",
      target: "_blank"
    }, "Learn more"), "."), m("div", {
      style: "height: 5px;"
    }), m("div", null, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button',
      loading: this.saving,
      onclick: function onclick() {
        return app.modal.show(_Modals_DoFollowListModal__WEBPACK_IMPORTED_MODULE_11__["default"]);
      }
    }, 'Open domain do-follow list'))]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'Open external links in new tab',
      className: this.showField !== 'all' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "This extension will also make sure that external links (to other domains) open in a new tab. Currently it is not possible to disable this setting.")]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'Edit robots.txt',
      className: this.showField !== 'all' && this.showField !== 'robots' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "You can edit your robot.txt here. Please note, writing nonsense could result that crawlers won't visit your site.", m("br", null), m("br", null), "When you've ", m("a", {
      href: "https://discuss.flarum.org/d/14941-fof-sitemap",
      target: "_blank"
    }, "FriendsOfFlarum Sitemap"), " installed and enabled, it will be automatically added to your robots.txt"), m("div", {
      style: "height: 5px;"
    }), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default().component({
      state: this.allowBotsValue,
      onchange: function onchange(value) {
        return _this2.saveAllowBots(value);
      }
    }, 'Allow all bots & crawl full site directory'), m("div", {
      style: "height: 5px;"
    }), m("div", null, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button',
      loading: this.saving,
      onclick: function onclick() {
        return app.modal.show(_Modals_RobotsModal__WEBPACK_IMPORTED_MODULE_8__["default"]);
      }
    }, 'Edit robots.txt content'), " ", m("a", {
      href: app.forum.attribute('baseUrl') + "/robots.txt",
      target: "_blank",
      className: "robots-link"
    }, "Open robots.txt ", m("i", {
      className: "fas fa-external-link-alt"
    })))]), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default().component({
      label: 'Updated this setting?',
      className: this.showField === 'all' ? 'hidden' : ''
    }, [m("div", {
      className: "helpText"
    }, "When you think you're ready, click the button below to re-check the status of this setting."), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default().component({
      className: 'Button',
      icon: 'fas fa-sync',
      loading: this.saving,
      onclick: function onclick() {
        return m.route.set(app.route('extension', {
          id: 'v17development-seo'
        }));
      }
    }, 'Back to overview and re-check')])));
  };
  _proto.infoText = function infoText() {
    if (this.showField !== 'all') {
      return;
    }
    return m("div", null, m("p", null, "This page contains some other settings from around the admin area. However, it's good to have a good overview about these settings. Do not forget to do the SEO check."), m("p", null, "Check all your settings when you first setup this extensions. Maintain them to get the best search results."));
  }

  // Settings changed
  ;
  _proto.changed = function changed() {
    var _this3 = this;
    return this.fields.some(function (key) {
      return _this3.values[key]() !== app.data.settings[key];
    });
  }

  // Save settings!
  ;
  _proto.onsubmit = function onsubmit(e) {
    var _this4 = this;
    e.preventDefault();
    if (this.saving) return;
    this.saving = true;
    app.alerts.dismiss(this.successAlert);
    var settings = {};
    this.fields.forEach(function (key) {
      return settings[key] = _this4.values[key]();
    });

    // Set twitter card size to large
    if (settings.seo_twitter_card_size === "") {
      settings.seo_twitter_card_size = "large";
    }
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(settings).then(function () {
      return app.alerts.show({
        type: 'success'
      }, app.translator.trans('core.admin.settings.saved_message'));
    })["catch"](function () {}).then(function () {
      _this4.saving = false;
      m.redraw();
    });
  }

  // Save allow bots
  ;
  _proto.saveAllowBots = function saveAllowBots(value) {
    var _this5 = this;
    if (this.saving) return;
    this.saving = true;
    this.allowBotsValue = value;
    var data = {};
    data.seo_allow_all_bots = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(function () {
      return app.alerts.show({
        type: 'success'
      }, app.translator.trans('core.admin.settings.saved_message'));
    })["catch"](function () {}).then(function () {
      _this5.saving = false;
      m.redraw();
    });
  }

  // Save allow bots
  ;
  _proto.saveSingleSetting = function saveSingleSetting(setting, value) {
    var _this6 = this;
    if (this.saving) return;
    this.saving = true;
    var data = {};
    data[setting] = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(function () {
      return app.alerts.show({
        type: 'success'
      }, app.translator.trans('core.admin.settings.saved_message'));
    })["catch"](function () {}).then(function () {
      _this6.saving = false;
      m.redraw();
    });
  };
  return SeoSettings;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/Header.js":
/*!****************************************!*\
  !*** ./src/admin/components/Header.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Dropdown */ "flarum/components/Dropdown");
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__);




var Header = /*#__PURE__*/function (_Component) {
  function Header() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Header, _Component);
  var _proto = Header.prototype;
  _proto.view = function view() {
    return m("div", {
      className: "seo-header container"
    }, m("div", {
      className: "pull-right"
    }, flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default().component({
      label: 'Tools',
      icon: 'fas fa-cog',
      buttonClassName: 'Button',
      menuClassName: "Dropdown-menu--right"
    }, [flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button',
      onclick: function onclick() {
        return m.route.set(app.route('seo'));
      },
      icon: 'fas fa-heartbeat'
    }, 'Health check'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button',
      onclick: function onclick() {
        return m.route.set(app.route('seoSettings'));
      },
      icon: 'fas fa-cogs'
    }, 'SEO settings'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button',
      onclick: function onclick() {
        return m.route.set(app.route('seoSitemap'));
      },
      icon: 'fas fa-sitemap'
    }, 'Sitemap information'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button',
      onclick: function onclick() {
        return m.route.set(app.route('seoSearchEngines'));
      },
      icon: 'fas fa-search'
    }, 'Search engine information'), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button',
      onclick: function onclick() {
        return m.route.set(app.route('seoSSL'));
      },
      icon: 'fas fa-shield-alt'
    }, 'Set up SSL')])), m("h2", null, "Search Engine Optimization"), m("div", {
      className: "clear"
    }));
  };
  return Header;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/Modals/CrawlPostModal.js":
/*!*******************************************************!*\
  !*** ./src/admin/components/Modals/CrawlPostModal.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CrawlPostModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__);





var CrawlPostModal = /*#__PURE__*/function (_Modal) {
  function CrawlPostModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CrawlPostModal, _Modal);
  var _proto = CrawlPostModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.value = typeof app.data.settings.seo_post_crawler === "undefined" ? false : app.data.settings.seo_post_crawler;
    this.startValue = this.value;
    this.closeText = 'Close';
    this.loading = false;
    if (typeof app.data.settings.seo_reviewed_post_crawler === "undefined") {
      this.saveReviewedPostCrawler();
    }
  };
  _proto.title = function title() {
    return 'Post crawl settings';
  };
  _proto.content = function content() {
    var _this = this;
    return m("div", null, m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("b", null, "Read this dialog carefully."), " This function will only be executed on a page refresh on a discussion. You can always change this option later.", m("div", {
      style: "padding: 10px 0;"
    }, m("b", {
      style: "display: block; padding-bottom: 10px;"
    }, m("span", {
      style: "display: inline-block; width: 25px;"
    }, m("i", {
      className: "fas fa-check"
    })), "Only index the main post (default)"), "Search engine will only show the main post in the search results. It won't affect loading speed when you navigate to it via forum links."), m("div", {
      style: "padding: 10px 0;"
    }, m("b", {
      style: "display: block; padding-bottom: 10px;"
    }, m("span", {
      style: "display: inline-block; width: 25px;"
    }, m("i", {
      className: "fas fa-check-double"
    })), " Index all posts in a discussion (setting enabled)"), "Search engines will understand the discussions and are even able to show some relevant posts underneath the search results. When you have the extension '", m("a", {
      href: "https://discuss.flarum.org/d/21894-friendsofflarum-best-answer",
      target: "_blank"
    }, "best answer"), "' installed and enabled on your forum, it will mark the discussion as 'answered' on the search results and redirect the user to that specific post. ", m("b", null, "However, depending on your server settings, this can be heavier"), ". It may cost some performance, so it depends on how fast your server is to enable this feature."))), m("div", {
      style: "padding: 25px 30px; text-align: center;"
    }, m("b", {
      style: "display: block; padding-bottom: 10px;"
    }, "Do you want to enable this feature?"), m("div", {
      style: "display: inline-block;"
    }, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default().component({
      state: this.value == '1',
      onchange: function onchange(value) {
        return _this.change(value);
      }
    }, 'Crawl all posts (it\'s slower on page refresh, but search results will be better)'))), m("div", {
      style: "padding: 25px 30px; text-align: center;"
    }, this.closeDialogButton()));
  };
  _proto.change = function change(value) {
    this.value = value;
    this.closeText = this.value !== this.startValue ? 'Save changes' : 'Close';
  };
  _proto.closeDialogButton = function closeDialogButton() {
    return m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading
    }, this.closeText);
  }

  // Close or save setting
  ;
  _proto.onsubmit = function onsubmit(e) {
    if (this.value === this.startValue) {
      this.hide();
      return;
    }
    this.loading = true;
    var data = {};
    data.seo_post_crawler = this.value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(this.onsaved.bind(this));
  }

  // Save post crawler reviewed
  ;
  _proto.saveReviewedPostCrawler = function saveReviewedPostCrawler() {
    var _this2 = this;
    this.loading = true;
    var data = {};
    data.seo_reviewed_post_crawler = true;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(function () {
      _this2.loading = false;
      m.redraw();
    });
  };
  _proto.onsaved = function onsaved() {
    this.hide();
  };
  return CrawlPostModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/Modals/DoFollowListModal.js":
/*!**********************************************************!*\
  !*** ./src/admin/components/Modals/DoFollowListModal.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DoFollowListModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4__);





var DoFollowListModal = /*#__PURE__*/function (_Modal) {
  function DoFollowListModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(DoFollowListModal, _Modal);
  var _proto = DoFollowListModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.domainDoFollowList = [];
    this.baseUrl = this.getDomainFromBase();
    this.domainDoFollowList = typeof app.data.settings.seo_dofollow_domains === "undefined" ? flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()([]) : flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()(JSON.parse(app.data.settings.seo_dofollow_domains));
    this.startValue = this.domainDoFollowList;
    this.newDomain = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()("");
    this.hasChanges = false;
    this.loading = false;
  };
  _proto.title = function title() {
    return 'Do-follow list';
  }

  // Get domain from base URL
  ;
  _proto.getDomainFromBase = function getDomainFromBase() {
    var url = new URL(app.forum.data.attributes.baseUrl);
    var hostname = url.hostname.split(".");
    return hostname.slice(Math.max(hostname.length - 2, 0)).join(".");
  };
  _proto.content = function content() {
    var _this = this;
    return m("div", null, m("div", {
      className: "Modal-body"
    }, m("p", null, "Enter the ", m("b", null, "hostnames"), " of the domains you want to add to the do-follow list."), m("p", null, "The domain you use for your Flarum instance is added to the list by default."), m("p", {
      style: {
        marginBottom: '15px'
      }
    }, m("a", {
      href: "https://community.v17.dev/knowledgebase/36",
      target: "_blank"
    }, "Learn more"), " about the do-follow list."), m("div", {
      className: "FlarumSEO-DoFollowList"
    }, m("input", {
      type: "text",
      value: this.baseUrl,
      readonly: true,
      className: "FormControl"
    }), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button",
      icon: "fas fa-times",
      disabled: true
    })), this.domainDoFollowList().map(function (domain, key) {
      return m("div", {
        className: "FlarumSEO-DoFollowList"
      }, m("input", {
        type: "text",
        value: domain,
        onkeyup: function onkeyup(e) {
          return _this.updateDomain(key, e.target.value);
        },
        className: "FormControl"
      }), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
        className: "Button",
        icon: "fas fa-times",
        onclick: function onclick() {
          return _this.removeDomain(key);
        }
      }));
    }), m("div", {
      className: "FlarumSEO-DoFollowList"
    }, m("input", {
      type: "text",
      bidi: this.newDomain,
      placeholder: "Allow a domain",
      onkeydown: function onkeydown(e) {
        if (e.keyCode === 13 && _this.newDomain() !== '') {
          e.preventDefault();
          _this.addDomain();
        }
      },
      className: "FormControl"
    }), m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      className: "Button " + (this.newDomain() !== '' ? 'Button--primary' : ''),
      icon: "fas fa-plus",
      onclick: this.addDomain.bind(this)
    }))), m("div", {
      style: "padding: 25px 30px; text-align: center;"
    }, m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading
    }, this.hasChanges ? 'Save changes' : 'Close')));
  }

  /**
   * Add new domain to the list
   */;
  _proto.addDomain = function addDomain() {
    // Check if the domain is already present
    if (this.domainDoFollowList().indexOf(this.newDomain()) >= 0) {
      alert("This domain is already present in your do-follow list.");
      this.newDomain("");
      return;
    }
    var updatedData = [].concat(this.domainDoFollowList());
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
   */;
  _proto.removeDomain = function removeDomain(key) {
    var updatedData = [].concat(this.domainDoFollowList());
    updatedData.splice(key, 1);
    this.domainDoFollowList(updatedData);

    // Update the hasChanges
    this.hasChanges = true;
  }

  /**
   * Update domain
   * 
   * @param {*} e 
   */;
  _proto.updateDomain = function updateDomain(key, value) {
    var updatedData = [].concat(this.domainDoFollowList());
    updatedData[key] = value;
    this.domainDoFollowList(updatedData);

    // Update the hasChanges
    this.hasChanges = true;
  }

  // Close or save setting
  ;
  _proto.onsubmit = function onsubmit(e) {
    if (!this.hasChanges) {
      this.hide();
      return;
    }
    this.loading = true;
    var data = {};
    data.seo_dofollow_domains = JSON.stringify(this.domainDoFollowList().filter(function (val) {
      return val !== "";
    }));
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default()(data).then(this.onsaved.bind(this));
  };
  _proto.onsaved = function onsaved() {
    this.hide();
  };
  return DoFollowListModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/Modals/RobotsModal.js":
/*!****************************************************!*\
  !*** ./src/admin/components/Modals/RobotsModal.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RobotsModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__);




var RobotsModal = /*#__PURE__*/function (_Modal) {
  function RobotsModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RobotsModal, _Modal);
  var _proto = RobotsModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.value = typeof app.data.settings.seo_robots_text === "undefined" ? '' : app.data.settings.seo_robots_text;
    this.startValue = this.value;
    this.closeText = 'Close';
    this.loading = false;
  };
  _proto.title = function title() {
    return 'Custom robots.txt';
  };
  _proto.content = function content() {
    var _this = this;
    return m("div", null, m("div", {
      className: "Modal-body"
    }, m('textarea', {
      className: "FormControl",
      value: this.value,
      placeholder: 'Add text to the robots.txt',
      rows: 15,
      oninput: function oninput(event) {
        _this.change(event.target.value);
      }
    })), m("div", {
      style: "padding: 25px 30px; text-align: center;"
    }, this.closeDialogButton()));
  };
  _proto.change = function change(value) {
    this.value = value;
    this.closeText = this.value !== this.startValue ? 'Save changes' : 'Close';
  };
  _proto.closeDialogButton = function closeDialogButton() {
    return m((flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading
    }, this.closeText);
  }

  // Close or save setting
  ;
  _proto.onsubmit = function onsubmit(e) {
    if (this.value === this.startValue) {
      this.hide();
      return;
    }
    this.loading = true;
    var data = {};
    data.seo_robots_text = this.value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default()(data).then(this.onsaved.bind(this));
  };
  _proto.onsaved = function onsaved() {
    this.hide();
  };
  return RobotsModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/components/SeoWidget.js":
/*!*******************************************!*\
  !*** ./src/admin/components/SeoWidget.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SeoWidget)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DashboardWidget */ "flarum/components/DashboardWidget");
/* harmony import */ var flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);



var SeoWidget = /*#__PURE__*/function (_DashboardWidget) {
  function SeoWidget() {
    return _DashboardWidget.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SeoWidget, _DashboardWidget);
  var _proto = SeoWidget.prototype;
  _proto.oninit = function oninit(vnode) {
    _DashboardWidget.prototype.oninit.call(this, vnode);
    this.needsReview = false;
    if (typeof app.data.settings.seo_review_settings === "undefined") {
      this.needsReview = true;
    }

    // Date passed?
    if (!this.needsReview && Math.floor(Date.now() / 1000) > app.data.settings.seo_review_settings) {
      this.needsReview = true;
    }
  };
  _proto.className = function className() {
    return 'SeoWidget ' + (this.needsReview ? 'needs-review' : '');
  };
  _proto.content = function content() {
    return m("div", null, m("i", {
      className: "fas fa-check seo-check-icon"
    }), " It's time to review your SEO settings!", flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: '',
      icon: 'far fa-thumbs-up',
      onclick: function onclick() {
        return m.route.set("extension/v17development-seo");
      }
    }, 'Do the health-check!'));
  };
  return SeoWidget;
}((flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DashboardPage */ "flarum/components/DashboardPage");
/* harmony import */ var flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_SeoWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/SeoWidget */ "./src/admin/components/SeoWidget.js");
/* harmony import */ var _Pages_SettingsPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/SettingsPage */ "./src/admin/Pages/SettingsPage.js");
/* harmony import */ var flarum_admin_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/admin/components/PermissionGrid */ "flarum/admin/components/PermissionGrid");
/* harmony import */ var flarum_admin_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_5__);






flarum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add("v17development-flarum-seo", function () {
  flarum_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]("v17development-seo").registerPage(_Pages_SettingsPage__WEBPACK_IMPORTED_MODULE_4__["default"]);

  // Add widget
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), "availableWidgets", function (widgets) {
    widgets.add("seo-widget", m(_components_SeoWidget__WEBPACK_IMPORTED_MODULE_3__["default"], null), 500);
  });
  flarum_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]("v17development-seo").registerPermission({
    icon: "fas fa-search",
    label: flarum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans("v17development-flarum-seo.admin.permissions.configure_seo"),
    permission: "seo.canConfigure"
  }, "seo", 90);

  // Add addPermissions
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_admin_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_5___default().prototype), "permissionItems", function (items) {
    // Add knowledge base permissions
    items.add("seo", {
      label: "SEO",
      children: this.attrs.extensionId ? flarum_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData.getExtensionPermissions(this.extensionId, "seo").toArray() : flarum_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData.getAllExtensionPermissions("seo").toArray()
    }, 80);
  });
});

/***/ }),

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

/***/ "flarum/admin/components/PermissionGrid":
/*!************************************************************************!*\
  !*** external "flarum.core.compat['admin/components/PermissionGrid']" ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/PermissionGrid'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/DashboardPage":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/DashboardPage']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/DashboardPage'];

/***/ }),

/***/ "flarum/components/DashboardWidget":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/DashboardWidget']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/DashboardWidget'];

/***/ }),

/***/ "flarum/components/Dropdown":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/Dropdown']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Dropdown'];

/***/ }),

/***/ "flarum/components/ExtensionPage":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/ExtensionPage']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/ExtensionPage'];

/***/ }),

/***/ "flarum/components/FieldSet":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/FieldSet']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/FieldSet'];

/***/ }),

/***/ "flarum/components/Link":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Link']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Link'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/components/UploadImageButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['components/UploadImageButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/UploadImageButton'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/Stream'];

/***/ }),

/***/ "flarum/utils/saveSettings":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/saveSettings']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/saveSettings'];

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
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map