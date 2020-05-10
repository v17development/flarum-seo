module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/admin/AdminNavigation.js":
/*!**************************************!*\
  !*** ./src/admin/AdminNavigation.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Pages_SettingsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/SettingsPage */ "./src/admin/Pages/SettingsPage.js");
/* harmony import */ var _Pages_Sitemap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/Sitemap */ "./src/admin/Pages/Sitemap.js");
/* harmony import */ var _Pages_HealthCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/HealthCheck */ "./src/admin/Pages/HealthCheck.js");
/* harmony import */ var _Pages_RegisterToSearchEngines__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pages/RegisterToSearchEngines */ "./src/admin/Pages/RegisterToSearchEngines.js");
/* harmony import */ var _Pages_SSLPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Pages/SSLPage */ "./src/admin/Pages/SSLPage.js");








/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Main page
  app.routes.seo = {
    path: '/seo',
    component: _Pages_HealthCheck__WEBPACK_IMPORTED_MODULE_5__["default"].component()
  }; // Route to all settings

  app.routes.seoSettings = {
    path: '/seo/settings',
    component: _Pages_SettingsPage__WEBPACK_IMPORTED_MODULE_3__["default"].component()
  }; // Route to a single setting

  app.routes.seoSingleSetting = {
    path: '/seo/setting/:setting',
    component: _Pages_SettingsPage__WEBPACK_IMPORTED_MODULE_3__["default"].component()
  }; // Sitemap information

  app.routes.seoSitemap = {
    path: '/seo/sitemap',
    component: _Pages_Sitemap__WEBPACK_IMPORTED_MODULE_4__["default"].component()
  }; // Registered forum to search engines

  app.routes.seoSearchEngines = {
    path: '/seo/search-engines',
    component: _Pages_RegisterToSearchEngines__WEBPACK_IMPORTED_MODULE_6__["default"].component()
  }; // Add an secure connection

  app.routes.seoSSL = {
    path: '/seo/ssl',
    component: _Pages_SSLPage__WEBPACK_IMPORTED_MODULE_7__["default"].component()
  }; // Quick access settings from extensions tab

  app.extensionSettings['v17development-seo'] = function () {
    return m.route(app.route('seo'));
  };

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'items', function (items) {
    items.add('seo', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      href: app.route('seo'),
      icon: 'fas fa-check',
      children: 'Search Engine Optimization',
      description: 'Configure your forum\'s SEO settings.'
    }));
  });
});

/***/ }),

/***/ "./src/admin/Pages/HealthCheck.js":
/*!****************************************!*\
  !*** ./src/admin/Pages/HealthCheck.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HealthCheck; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5__);







var HealthCheck =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(HealthCheck, _Page);

  function HealthCheck() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = HealthCheck.prototype;

  _proto.init = function init() {
    this.settings = app.data.settings;
    this.saving = false;
  };

  _proto.view = function view() {
    return m("div", {
      className: "FlarumSEO"
    }, _components_Header__WEBPACK_IMPORTED_MODULE_3__["default"].component(), m("div", {
      className: "container"
    }, m("p", {
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
    })), ". Are you a developer with some free time left? Contribute to the project ", m("a", {
      href: "https://github.com/v17development/flarum-seo",
      target: "_blank"
    }, "on GitHub"), " "), m("p", {
      className: "seo-intro"
    }, "For optimal search engine results, make sure all checks are green."), m("table", {
      className: "seo-check-table"
    }, m("thead", null, m("tr", null, m("td", null, "Technique"), m("td", {
      width: "150"
    }, "Status"))), m("tbody", null, this.forumDescription(), this.forumKeywords(), this.siteUsesSSL(), this.discussionPostSet(), this.socialMediaImage(), this.hasSitemap(), this.registeredSearchEngines(), this.robotsTxt(), this.tagsAvailable(), this.reviewAgain()))));
  } // Forum description
  ;

  _proto.forumDescription = function forumDescription() {
    var passed = typeof this.settings.forum_description !== "undefined" && this.settings.forum_description !== '' ? true : 'must';
    var reason = 'You did not set up a forum description yet!'; // Check minimal 20 characters

    if (passed === true && this.settings.forum_description.length <= 20) {
      passed = false;
      reason = 'Your forum description is lower then 20 characters. Please expand it for better search results.';
    } // Check description is not default text


    if (passed === true && this.settings.forum_description.indexOf('This is beta software') >= 0) {
      passed = 'must';
      reason = 'You did not change the default forum description after installation!';
    }

    return m("tr", null, m("td", null, "Your forum has a description", this.notPassedError(passed, reason, 'Update description', this.getSettingUrl('description'))), this.passed(passed, 'description'));
  } // Forum keywords
  ;

  _proto.forumKeywords = function forumKeywords() {
    var passed = typeof this.settings.forum_keywords !== "undefined" && this.settings.forum_keywords !== '' ? true : false;
    var reason = 'You did not set up a forum keywords yet!';
    return m("tr", null, m("td", null, "Your forum has keywords set up", this.notPassedError(passed, reason, 'Update keywords', this.getSettingUrl('keywords'))), this.passed(passed, 'keywords'));
  } // Does the site has SSL as default transport?
  ;

  _proto.siteUsesSSL = function siteUsesSSL() {
    var passed = app.forum.attribute('baseUrl').indexOf('https://') >= 0 ? true : 'must';
    return m("tr", null, m("td", null, "Your site has a secure connection available (SSL/TLS)", this.notPassedError(passed, 'Your forum does not force a SSL/TLS connection (a secure connection to your website). Most search engines won\'t index your website or lower your ranking if you have no secure connection available.', 'How to set up SSL', app.route('seoSSL'))), this.passed(passed));
  } // Discussion post crawl settings
  ;

  _proto.discussionPostSet = function discussionPostSet() {
    var passed = typeof this.settings.seo_reviewed_post_crawler !== "undefined";
    return m("tr", null, m("td", null, "Review discussion post crawl settings", this.notPassedError(passed, 'You will need to review this setting to pass.', 'Review post settings', this.getSettingUrl('discussion-post'))), this.passed(passed));
  } // Review bot settings
  ;

  _proto.socialMediaImage = function socialMediaImage() {
    var passed = true;

    if (typeof this.settings.seo_social_media_image_path === "undefined" || this.settings.seo_social_media_image_path === null) {
      passed = false;
    }

    return m("tr", null, m("td", null, "Set Up a social media image", this.notPassedError(passed, 'You did not set a social media image for your forum. It is recommended to set one. Your favicon will now be used as preview on social media.', 'Update image', this.getSettingUrl('social-media'))), this.passed(passed));
  } // Review bot settings
  ;

  _proto.hasSitemap = function hasSitemap() {
    var passed = true;

    if (app.data.settings.extensions_enabled.indexOf('flagrow-sitemap') === -1 && app.data.settings.extensions_enabled.indexOf('fof-sitemap') === -1) {
      passed = false;
    }

    return m("tr", null, m("td", null, "Your forum has a sitemap available", this.notPassedError(passed, 'It is highly recommended to install the FriendsOfFlarum sitemap extension!', 'Read more about adding a sitemap', app.route('seoSitemap'))), this.passed(passed));
  } // Robots.txt is available
  ;

  _proto.robotsTxt = function robotsTxt() {
    return m("tr", null, m("td", null, "Your forum has a ", m("b", null, "robots.txt"), " available. ", m("a", {
      href: app.forum.attribute('baseUrl') + "/robots.txt",
      target: "_blank",
      className: "robots-link"
    }, "Open robots.txt ", m("i", {
      className: "fas fa-external-link-alt"
    }))), this.passed(true));
  } // Robots.txt is available
  ;

  _proto.tagsAvailable = function tagsAvailable() {
    return m("tr", null, m("td", null, "Your forum has ", m("b", null, "meta tags"), " available (generated by this plugin)"), this.passed(true));
  } // Register your forum
  ;

  _proto.registeredSearchEngines = function registeredSearchEngines() {
    var passed = typeof this.settings.seo_reviewed_search_engines !== "undefined";
    return m("tr", null, m("td", null, "Register your forum to search engines", this.notPassedError(passed, 'You will need to review this to pass.', 'More information', app.route('seoSearchEngines'))), this.passed(passed));
  } // Review again
  ;

  _proto.reviewAgain = function reviewAgain() {
    var _this = this;

    var passed = true; // Set current date

    var nextReviewDate = new Date(); // Check if previous review date exists

    if (typeof app.data.settings.seo_review_settings === "undefined") {
      passed = false;
    } else {
      // Ok, it exists. Set the review date
      nextReviewDate = new Date(app.data.settings.seo_review_settings * 1000);
    } // Date passed?


    if (passed && Math.floor(Date.now() / 1000) > app.data.settings.seo_review_settings) {
      passed = false;
    }

    return m("tr", null, m("td", null, "Review your SEO settings every two months. Next review needed on ", m("b", null, nextReviewDate.toDateString()), this.notPassedError(passed, 'It is time to re-review your SEO settings.', 'Ok! I reviewed them!', function () {
      var now = new Date();
      var nextDate = Math.floor(new Date(now.getFullYear(), now.getMonth() + 2, 1) / 1000);

      _this.saveSingleSetting('seo_review_settings', nextDate);
    })), this.passed(passed));
  } // Get setting URL
  ;

  _proto.getSettingUrl = function getSettingUrl(setting) {
    if (setting === void 0) {
      setting = '';
    }

    if (setting === '') {
      return app.route('seoSettings');
    }

    return app.route('seoSingleSetting', {
      setting: setting
    });
  } // Passed or not
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
  } // General not-passed error
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
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'Button',
      onclick: function onclick() {
        if (typeof url === 'string') {
          m.route(url);
        } else {
          url();
        }
      },
      children: buttonText
    })));
  } // Save
  ;

  _proto.saveSingleSetting = function saveSingleSetting(setting, value) {
    var _this2 = this;

    if (this.saving) return;
    this.saving = true;
    var data = {};
    data[setting] = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5___default()(data).then(function () {
      app.alerts.show(_this2.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default.a({
        type: 'success',
        children: app.translator.trans('core.admin.basics.saved_message')
      }));
    })["catch"](function () {}).then(function () {
      _this2.saving = false;
      m.redraw();
    });
  };

  return HealthCheck;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/Pages/RegisterToSearchEngines.js":
/*!****************************************************!*\
  !*** ./src/admin/Pages/RegisterToSearchEngines.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegisterToSearchEngines; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");







var RegisterToSearchEngines =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RegisterToSearchEngines, _Page);

  function RegisterToSearchEngines() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = RegisterToSearchEngines.prototype;

  _proto.init = function init() {
    this.saving = false;
    this.hasConfirmed = app.data.settings.seo_reviewed_search_engines === "1";
  };

  _proto.view = function view() {
    var _this = this;

    return m("div", {
      className: "FlarumSEO"
    }, _components_Header__WEBPACK_IMPORTED_MODULE_5__["default"].component(), m("div", {
      className: "container"
    }, m("h2", null, "Submit your website to Search Engines"), m("p", null, "It is good practice to let Search Engines know your site is exists. This page will guide you in doing this succesfully."), m("p", null, "It is recommended to have a sitemap ready before completing this guide. If you don't have a sitemap yet, ", m("a", {
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
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'Button pull-right ' + (this.hasConfirmed ? 'hidden' : ''),
      onclick: function onclick() {
        return _this.confirm();
      },
      icon: 'fas fa-check',
      loading: this.saving,
      children: 'I have read this'
    })));
  };

  _proto.confirm = function confirm() {
    this.saveSingleSetting('seo_reviewed_search_engines', true);
  } // Save allow bots
  ;

  _proto.saveSingleSetting = function saveSingleSetting(setting, value) {
    var _this2 = this;

    if (this.saving) return;
    this.saving = true;
    var data = {};
    data[setting] = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default()(data).then(function () {
      _this2.hasConfirmed = true;
      app.alerts.show(_this2.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_4___default.a({
        type: 'success',
        children: app.translator.trans('core.admin.basics.saved_message')
      }));
    })["catch"](function () {}).then(function () {
      _this2.saving = false;
      m.redraw();
    });
  };

  return RegisterToSearchEngines;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/Pages/SSLPage.js":
/*!************************************!*\
  !*** ./src/admin/Pages/SSLPage.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SSLPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");




var SSLPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SSLPage, _Page);

  function SSLPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = SSLPage.prototype;

  _proto.view = function view() {
    return m("div", {
      className: "FlarumSEO"
    }, _components_Header__WEBPACK_IMPORTED_MODULE_2__["default"].component(), m("div", {
      className: "container"
    }, m("h2", null, "Why do I need an secure connection?"), m("p", null, "Safety and privacy awareness on the web is on the rise. ", m("b", null, "Almost every"), " developer/website owner want their website safe to use for their visitors so they won't need to be afraid that their data will be compromised by hackers or website-impersonators."), m("h4", null, "Search engines ", m("i", {
      className: "fas fa-heart"
    }), " secure connections"), m("p", null, "When you do not have a secure connection to your website, search engines will rank your site much lower then other sites, or even won't index it."), m("p", null, "When you have SSL available, your website will get an higher rank and will be indexed."), m("h4", null, "What is SSL or TLS?"), m("p", null, "The most people know ", m("b", null, "https"), " that's used for secure connections as SSL: ", m("i", null, "Secure Sockets Layer"), ". Officially it's called TLS: ", m("i", null, "Transport Layer Security"), ". This method is used to create a secure connection to your webserver what will prevent attackers or other webservers to impersonate your website and keep your visitors safe. The SSL connection will be broken if that happens and the visitors browsers will warning the user that's it's not trusted."), m("h4", null, "How to add SSL to your website?"), m("p", null, "For people who are using a webhosting, the most common way is to enter the webhosting panel, go to the hosting-settings of your website and click SSL. You can follow the steps to add SSL to your website. The most webhosting companies nowadays are supporting the popular certificate issuer ", m("a", {
      href: "https://letsencrypt.org/",
      target: "_blank"
    }, " Let's Encrypt ", m("i", {
      className: "fas fa-external-link-alt"
    })), "."), m("h4", null, "Okay, I added SSL!"), m("p", null, "Great! Now, change your ", m("b", null, "config.php"), " and change the ", m("b", null, "'url'"), " to ", m("b", null, "https"), "!"), m("h4", null, "What if I do not want to add SSL?"), m("p", null, "In that case, you can uninstall this extension as search engines ", m("b", null, "won't index your forum"), " or rank them far below other sites due safety reasons.")));
  };

  return SSLPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/Pages/SettingsPage.js":
/*!*****************************************!*\
  !*** ./src/admin/Pages/SettingsPage.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingsPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Forms_SeoSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Forms/SeoSettings */ "./src/admin/components/Forms/SeoSettings.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");





var SettingsPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SettingsPage, _Page);

  function SettingsPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = SettingsPage.prototype;

  _proto.view = function view() {
    return m("div", {
      className: "FlarumSEO"
    }, _components_Header__WEBPACK_IMPORTED_MODULE_3__["default"].component(), m("div", {
      className: "container"
    }, _components_Forms_SeoSettings__WEBPACK_IMPORTED_MODULE_2__["default"].component()));
  };

  return SettingsPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/Pages/Sitemap.js":
/*!************************************!*\
  !*** ./src/admin/Pages/Sitemap.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sitemap; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Header */ "./src/admin/components/Header.js");




var Sitemap =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Sitemap, _Page);

  function Sitemap() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = Sitemap.prototype;

  _proto.view = function view() {
    return m("div", {
      className: "FlarumSEO"
    }, _components_Header__WEBPACK_IMPORTED_MODULE_2__["default"].component(), m("div", {
      className: "container"
    }, m("h2", null, "Why should you use a sitemap?"), m("p", null, "A sitemap is a XML file with a list of all the available pages on your website. It will be used by crawlers and search engines to find pages on your website."), m("p", null, "The sitemap file is automatically generated and does not need any maintenance."), m("h4", null, "What extension should I install?"), m("p", null, "At the moment, ", m("a", {
      href: "https://discuss.flarum.org/d/14941-fof-sitemap",
      target: "_blank"
    }, "FriendsOfFlarum Sitemap ", m("i", {
      className: "fas fa-external-link-alt"
    })), " is the best extension to install for Flarum. We advice you to install and activate this extension."), m("p", null, "This extension will make sure crawlers will find your forum ", m("b", null, "discussions"), ", ", m("b", null, "tags"), " (when extension is enabled) and ", m("b", null, "Pages"), " extension (when extension is installed and enabled). It will automatically make an sitemap.xml available."), m("h4", null, "I just installed the extension"), m("p", null, "In that case, activate it on the ", m("a", {
      href: '#' + app.route('extensions')
    }, "Extensions page"), " . Then this warning will disappear.")));
  };

  return Sitemap;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/Forms/SeoSettings.js":
/*!***************************************************!*\
  !*** ./src/admin/components/Forms/SeoSettings.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeoSettings; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/FieldSet */ "flarum/components/FieldSet");
/* harmony import */ var flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/components/UploadImageButton */ "flarum/components/UploadImageButton");
/* harmony import */ var flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Modals_CrawlPostModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Modals/CrawlPostModal */ "./src/admin/components/Modals/CrawlPostModal.js");
/* harmony import */ var _Modals_RobotsModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Modals/RobotsModal */ "./src/admin/components/Modals/RobotsModal.js");
/* harmony import */ var _utils_countKeywords__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/countKeywords */ "./src/admin/utils/countKeywords.js");












var SeoSettings =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SeoSettings, _Component);

  function SeoSettings() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SeoSettings.prototype;

  _proto.init = function init() {
    var _this = this;

    this.saving = false;
    this.fields = ['forum_title', 'forum_description', 'forum_keywords', 'seo_allow_all_bots'];
    this.values = {};
    var settings = app.data.settings;
    this.fields.forEach(function (key) {
      return _this.values[key] = m.prop(settings[key] || "");
    });
    this.allowBotsValue = settings.seo_allow_all_bots !== "0"; // Cheat 'seo_social_media_imageUrl'
    // Todo: Find a better way

    app.forum.data.attributes.seo_social_media_imageUrl = app.forum.attribute('baseUrl') + '/assets/' + app.data.settings.seo_social_media_image_path;
    this.showField = 'all'; // Single field

    if (m.route.param('setting') !== undefined) {
      this.showField = m.route.param('setting');
    }
  } // Create the form
  ;

  _proto.view = function view() {
    var _this2 = this;

    return m("div", null, this.infoText(), m("form", {
      onsubmit: this.onsubmit.bind(this),
      className: "BasicsPage"
    }, flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      label: app.translator.trans('core.admin.basics.forum_description_heading'),
      className: this.showField !== 'all' && this.showField !== 'description' ? 'hidden' : '',
      children: [m("div", {
        className: "helpText"
      }, app.translator.trans('core.admin.basics.forum_description_text')), m("textarea", {
        className: "FormControl",
        value: this.values.forum_description(),
        oninput: m.withAttr('value', this.values.forum_description)
      })]
    }), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      label: "Forum keywords",
      className: this.showField !== 'all' && this.showField !== 'keywords' ? 'hidden' : '',
      children: [m("div", {
        className: "helpText"
      }, "Enter one or more keywords that describes your forum."), m("textarea", {
        className: "FormControl",
        value: this.values.forum_keywords(),
        oninput: m.withAttr('value', this.values.forum_keywords),
        placeholder: "Add a few keywords"
      }), m("div", {
        className: "helpText",
        style: {
          color: Object(_utils_countKeywords__WEBPACK_IMPORTED_MODULE_10__["default"])(this.values.forum_keywords()) == false ? "red" : null
        }
      }, m("b", null, "Note: Separate keywords with a comma."), " Example: ", m("i", null, "flarum, web development, forum, apples, security")), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        type: 'submit',
        className: 'Button Button--primary',
        children: app.translator.trans('core.admin.basics.submit_button'),
        loading: this.saving,
        disabled: !this.changed()
      })]
    }), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      label: 'Discussion post crawl settings',
      className: this.showField !== 'all' && this.showField !== 'discussion-post' ? 'hidden' : '',
      children: [m("div", {
        className: "helpText"
      }, "This is an important setting about crawling your discussion posts in search results."), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        className: 'Button',
        children: 'Setup post crawl settings',
        onclick: function onclick() {
          return app.modal.show(new _Modals_CrawlPostModal__WEBPACK_IMPORTED_MODULE_8__["default"]());
        }
      })]
    }), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      label: 'Social media image',
      className: 'social-media-uploader ' + (this.showField !== 'all' && this.showField !== 'social-media' ? 'hidden' : ''),
      children: [m("div", {
        className: "helpText"
      }, "Expecting a square image. Recommended size is 1200x1200 pixels. Otherwise use a landscape image, recommended size is 1200x630.", m("br", null), m("br", null), "This image will be used by Social Media when a user shares a page on your website (Facebook, Twitter, Reddit)."), flarum_components_UploadImageButton__WEBPACK_IMPORTED_MODULE_7___default.a.component({
        name: 'seo_social_media_image'
      })]
    }), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      label: 'Edit robots.txt',
      className: this.showField !== 'all' && this.showField !== 'robots' ? 'hidden' : '',
      children: [m("div", {
        className: "helpText"
      }, "You can edit your robot.txt here. Please note, writing nonsense could result that crawlers won't visit your site.", m("br", null), m("br", null), "When you've ", m("a", {
        href: "https://discuss.flarum.org/d/14941-fof-sitemap",
        target: "_blank"
      }, "FriendsOfFlarum Sitemap"), " installed and enabled, it will be automatically added to your robots.txt"), m("div", {
        style: "height: 5px;"
      }), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_6___default.a.component({
        state: this.allowBotsValue,
        onchange: function onchange(value) {
          return _this2.saveAllowBots(value);
        },
        children: 'Allow all bots & crawl full site directory'
      }), m("div", {
        style: "height: 5px;"
      }), m("div", null, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        className: 'Button',
        children: 'Edit robots.txt content',
        loading: this.saving,
        onclick: function onclick() {
          return app.modal.show(new _Modals_RobotsModal__WEBPACK_IMPORTED_MODULE_9__["default"]());
        }
      }), " ", m("a", {
        href: app.forum.attribute('baseUrl') + "/robots.txt",
        target: "_blank",
        className: "robots-link"
      }, "Open robots.txt ", m("i", {
        className: "fas fa-external-link-alt"
      })))]
    }), flarum_components_FieldSet__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      label: 'Updated this setting?',
      className: this.showField === 'all' ? 'hidden' : '',
      children: [m("div", {
        className: "helpText"
      }, "When you think you're ready, click the button below to re-check the status of this setting."), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        className: 'Button',
        icon: 'fas fa-sync',
        children: 'Back to overview and re-check',
        loading: this.saving,
        onclick: function onclick() {
          return m.route(app.route('seo'));
        }
      })]
    })));
  };

  _proto.infoText = function infoText() {
    if (this.showField !== 'all') {
      return;
    }

    return m("div", null, m("p", null, "This page contains some other settings from around the admin area. However, it's good to have a good overview about these settings. Do not forget to do the SEO check."), m("p", null, "Check all your settings when you first setup this extensions. Maintain them to get the best search results."));
  } // Settings changed
  ;

  _proto.changed = function changed() {
    var _this3 = this;

    return this.fields.some(function (key) {
      return _this3.values[key]() !== app.data.settings[key];
    });
  } // Save settings!
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
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(settings).then(function () {
      app.alerts.show(_this4.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_5___default.a({
        type: 'success',
        children: app.translator.trans('core.admin.basics.saved_message')
      }));
    })["catch"](function () {}).then(function () {
      _this4.saving = false;
      m.redraw();
    });
  } // Save allow bots
  ;

  _proto.saveAllowBots = function saveAllowBots(value) {
    var _this5 = this;

    if (this.saving) return;
    this.saving = true;
    this.allowBotsValue = value;
    var data = {};
    data.seo_allow_all_bots = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(function () {
      app.alerts.show(_this5.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_5___default.a({
        type: 'success',
        children: app.translator.trans('core.admin.basics.saved_message')
      }));
    })["catch"](function () {}).then(function () {
      _this5.saving = false;
      m.redraw();
    });
  } // Save allow bots
  ;

  _proto.saveSingleSetting = function saveSingleSetting(setting, value) {
    var _this6 = this;

    if (this.saving) return;
    this.saving = true;
    var data = {};
    data[setting] = value;
    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default()(data).then(function () {
      app.alerts.show(_this6.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_5___default.a({
        type: 'success',
        children: app.translator.trans('core.admin.basics.saved_message')
      }));
    })["catch"](function () {}).then(function () {
      _this6.saving = false;
      m.redraw();
    });
  };

  return SeoSettings;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/Header.js":
/*!****************************************!*\
  !*** ./src/admin/components/Header.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Header; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Dropdown */ "flarum/components/Dropdown");
/* harmony import */ var flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3__);





var Header =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Header, _Component);

  function Header() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.view = function view() {
    return m("div", {
      className: "seo-header container"
    }, m("div", {
      className: "pull-right"
    }, flarum_components_Dropdown__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      label: 'Tools',
      icon: 'fas fa-cog',
      buttonClassName: 'Button',
      menuClassName: "Dropdown-menu--right",
      children: [flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: 'Button',
        onclick: function onclick() {
          return m.route(app.route('seo'));
        },
        icon: 'fas fa-heartbeat',
        children: 'Health check'
      }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: 'Button',
        onclick: function onclick() {
          return m.route(app.route('seoSettings'));
        },
        icon: 'fas fa-cogs',
        children: 'SEO settings'
      }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: 'Button',
        onclick: function onclick() {
          return m.route(app.route('seoSitemap'));
        },
        icon: 'fas fa-sitemap',
        children: 'Sitemap information'
      }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: 'Button',
        onclick: function onclick() {
          return m.route(app.route('seoSearchEngines'));
        },
        icon: 'fas fa-search',
        children: 'Search engine information'
      }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        className: 'Button',
        onclick: function onclick() {
          return m.route(app.route('seoSSL'));
        },
        icon: 'fas fa-shield-alt',
        children: 'Set up SSL'
      })]
    })), m("h2", null, "Search Engine Optimization"), m("div", {
      className: "clear"
    }));
  };

  return Header;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/Modals/CrawlPostModal.js":
/*!*******************************************************!*\
  !*** ./src/admin/components/Modals/CrawlPostModal.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CrawlPostModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_4__);






var CrawlPostModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CrawlPostModal, _Modal);

  function CrawlPostModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = CrawlPostModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

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
    }, flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.value == '1',
      onchange: function onchange(value) {
        return _this.change(value);
      },
      children: 'Crawl all posts (it\'s slower on page refresh, but search results will be better)'
    }))), m("div", {
      style: "padding: 25px 30px; text-align: center;"
    }, this.closeDialogButton()));
  };

  _proto.change = function change(value) {
    this.value = value;
    this.closeText = this.value !== this.startValue ? 'Save changes' : 'Close';
  };

  _proto.closeDialogButton = function closeDialogButton() {
    return m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading
    }, this.closeText);
  } // Close or save setting
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
  } // Save post crawler reviewed
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
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/Modals/RobotsModal.js":
/*!****************************************************!*\
  !*** ./src/admin/components/Modals/RobotsModal.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RobotsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_3__);





var RobotsModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RobotsModal, _Modal);

  function RobotsModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = RobotsModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

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
    return m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading
    }, this.closeText);
  } // Close or save setting
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
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/SeoWidget.js":
/*!*******************************************!*\
  !*** ./src/admin/components/SeoWidget.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeoWidget; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DashboardWidget */ "flarum/components/DashboardWidget");
/* harmony import */ var flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);




var SeoWidget =
/*#__PURE__*/
function (_DashboardWidget) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SeoWidget, _DashboardWidget);

  function SeoWidget() {
    return _DashboardWidget.apply(this, arguments) || this;
  }

  var _proto = SeoWidget.prototype;

  _proto.init = function init() {
    this.needsReview = false;

    if (typeof app.data.settings.seo_review_settings === "undefined") {
      this.needsReview = true;
    } // Date passed?


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
    }), " It's time to review your SEO settings!", flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: '',
      children: 'Do the health-check!',
      icon: 'far fa-thumbs-up',
      onclick: function onclick() {
        m.route(app.route('seo'));
      }
    }));
  };

  return SeoWidget;
}(flarum_components_DashboardWidget__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DashboardPage */ "flarum/components/DashboardPage");
/* harmony import */ var flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AdminNavigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdminNavigation */ "./src/admin/AdminNavigation.js");
/* harmony import */ var _components_SeoWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SeoWidget */ "./src/admin/components/SeoWidget.js");





flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('v17development-flarum-seo', function () {
  Object(_AdminNavigation__WEBPACK_IMPORTED_MODULE_3__["default"])(); // Add widget

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_components_DashboardPage__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'availableWidgets', function (widgets) {
    widgets.unshift(m(_components_SeoWidget__WEBPACK_IMPORTED_MODULE_4__["default"], null));
  });
});

/***/ }),

/***/ "./src/admin/utils/countKeywords.js":
/*!******************************************!*\
  !*** ./src/admin/utils/countKeywords.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return countKeywords; });
/**
 * Check if the keywords field is filled in correctly
 * 
 * @param string _keywords 
 */
function countKeywords(_keywords) {
  // No keywords set up yet
  if (_keywords == "") return true; // Split all commas

  var keywords = _keywords.split(",");

  var status_ok = true; // Go through all keywords

  for (var _iterator = keywords, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var keyword = _ref;

    // Keywords shouldn't have more then three spaces
    if (keyword.split(" ").length > 4) {
      status_ok = false;
      break;
    }
  }

  ; // Seems allright

  return status_ok;
}

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/AdminLinkButton":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/AdminLinkButton']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminLinkButton'];

/***/ }),

/***/ "flarum/components/AdminNav":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/AdminNav']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminNav'];

/***/ }),

/***/ "flarum/components/Alert":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Alert']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Alert'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/DashboardPage":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/DashboardPage']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DashboardPage'];

/***/ }),

/***/ "flarum/components/DashboardWidget":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/DashboardWidget']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DashboardWidget'];

/***/ }),

/***/ "flarum/components/Dropdown":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/Dropdown']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Dropdown'];

/***/ }),

/***/ "flarum/components/FieldSet":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/FieldSet']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/FieldSet'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/components/UploadImageButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['components/UploadImageButton']" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UploadImageButton'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/utils/saveSettings":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/saveSettings']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/saveSettings'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map