/*!
 * awesome-swiper v1.2.2
 * Homepage: https://github.com/cycdpo/awesome-swiper#readme
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Swiper"));
	else if(typeof define === 'function' && define.amd)
		define(["Swiper"], factory);
	else if(typeof exports === 'object')
		exports["AwesomeSwiper"] = factory(require("Swiper"));
	else
		root["AwesomeSwiper"] = factory(root["Swiper"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AwesomeSwiper; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var awesome_js_funcs_judgeBasic_isString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var awesome_js_funcs_dom_addStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var awesome_js_funcs_dom_siblingFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var awesome_js_funcs_typeConversion_nodeListToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);


// style
if (false) {}

 // component







var AwesomeSwiper =
/*#__PURE__*/
function () {
  function AwesomeSwiper(SwiperModule) {
    this.emptyDiv = document.createElement('div');
    this.el = {
      mainContainer: null,
      thumbsContainer: null,
      pagination: null,
      navigation: {
        nextEl: null,
        prevEl: null
      }
    };
    this.swiper = {
      _constructor: SwiperModule || swiper__WEBPACK_IMPORTED_MODULE_2___default.a
    };
    this.config = {};
  }

  var _proto = AwesomeSwiper.prototype;

  _proto.init = function init(container, customMainConfig, overlaySwiperConfig) {
    if (customMainConfig === void 0) {
      customMainConfig = {};
    }

    if (overlaySwiperConfig === void 0) {
      overlaySwiperConfig = {};
    }

    this.el.mainContainer = Object(awesome_js_funcs_judgeBasic_isString__WEBPACK_IMPORTED_MODULE_3__["default"])(container) ? document.querySelector(container) : container;
    var mainDefault = {
      speed: 300,
      loop: false,
      autoplay: 0,
      direction: 'horizontal',
      spaceBetween: 0,
      slidesPerView: 1,
      mousewheel: false,
      autoFixFullImg: false,
      pagination: {
        color: 'default',
        style: null,
        dynamicBullets: false
      },
      navigation: {
        color: 'default',
        styles: {
          prev: null,
          next: null
        },
        custom: null
      }
    };
    this.config.mainOrigin = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, mainDefault, customMainConfig);
    this.config.main = {
      speed: this.config.mainOrigin.speed,
      loop: this.config.mainOrigin.loop,
      direction: this.config.mainOrigin.direction,
      spaceBetween: this.config.mainOrigin.spaceBetween,
      slidesPerView: this.config.mainOrigin.slidesPerView,
      mousewheel: this.config.mainOrigin.mousewheel
    }; // set customConfig.autoplay

    if (this.config.mainOrigin.autoplay) {
      this.config.main.autoplay = {};
      this.config.main.autoplay.delay = this.config.mainOrigin.autoplay;
    }

    this._initPagination();

    this._initNavigation();

    this.config.main = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()(this.config.main, overlaySwiperConfig);
    this.swiper.main = new this.swiper._constructor(this.el.mainContainer, this.config.main); // fix full img

    if (this.config.mainOrigin.autoFixFullImg) {
      this._fixFullImg(this.el.mainContainer);
    }

    return this;
  };

  _proto.addThumbs = function addThumbs(thumbsContainer, customThumbsConfig, extraConfig) {
    if (customThumbsConfig === void 0) {
      customThumbsConfig = {};
    }

    if (extraConfig === void 0) {
      extraConfig = {};
    }

    console.log('addThumbs');
    this.el.thumbsContainer = Object(awesome_js_funcs_judgeBasic_isString__WEBPACK_IMPORTED_MODULE_3__["default"])(thumbsContainer) ? document.querySelector(thumbsContainer) : thumbsContainer;
    this.el.thumbsContainer.classList.add(_style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.thumbsWrapper); // config

    var thumbsDefault = {
      spaceBetween: 10,
      slidesPerView: 'auto'
    };
    var thumbsExtraDefault = {
      mouseOverMode: false
    };
    this.config.thumbs = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, thumbsDefault, customThumbsConfig);
    this.config.thumbsExtra = _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, thumbsExtraDefault, extraConfig);
    this.swiper.thumbs = new this.swiper._constructor(this.el.thumbsContainer, this.config.thumbs);
    this.swiper.thumbs.slides[0].classList.add(ACTIVE_THUMB_CLASS);

    this._thumbsCtrl(this.config.thumbsExtra); // fix full img


    if (this.config.thumbsExtra.autoFixFullImg) {
      this._fixFullImg(this.el.thumbsContainer);
    }

    return this;
  };

  _proto._thumbsCtrl = function _thumbsCtrl(thumbsExtraConfig) {
    var _this = this;

    // mainSwiper ctrl
    this.swiper.main.on('slideChange', function () {
      console.log('mainSwiper slideChange');
      var swiperIndex = _this.swiper.main.realIndex,
          targetThumb = _this.swiper.thumbs.slides[swiperIndex]; // ui change

      Object(awesome_js_funcs_dom_siblingFilter__WEBPACK_IMPORTED_MODULE_5__["default"])(targetThumb, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);

      _this.swiper.thumbs.slides[swiperIndex].classList.add(ACTIVE_THUMB_CLASS);

      _this.swiper.thumbs.slideTo(swiperIndex);
    });
    Array.prototype.slice.call(this.swiper.thumbs.slides).forEach(function (el, index) {
      var _uiChange = function _uiChange() {
        Object(awesome_js_funcs_dom_siblingFilter__WEBPACK_IMPORTED_MODULE_5__["default"])(el, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);

        _this.swiper.thumbs.slides[index].classList.add(ACTIVE_THUMB_CLASS);

        _this.swiper.thumbs.slideTo(index);

        _this.swiper.main.slideTo(index);
      };

      if (thumbsExtraConfig.mouseOverMode) {
        el.addEventListener('mouseover', function () {
          return _uiChange();
        });
        el.addEventListener('touchstart', function () {
          return _uiChange();
        });
      } else {
        el.addEventListener('click', function () {
          return _uiChange();
        });
      }
    });
  };

  _proto._initPagination = function _initPagination() {
    var _pagination = this.config.mainOrigin.pagination;

    if (_pagination) {
      // add to Dom
      this.el.pagination = this.emptyDiv.cloneNode();
      this.el.pagination.classList.add('swiper-pagination');
      this.el.mainContainer.appendChild(this.el.pagination); // set swiperConfig

      switch (_pagination.color) {
        case 'white':
          this.el.pagination.classList.add(_style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.white);
          break;

        case 'black':
          this.el.pagination.classList.add(_style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.black);
          break;
      }

      this.config.main.pagination = {
        el: this.el.pagination,
        clickable: true,
        dynamicBullets: this.config.mainOrigin.pagination.dynamicBullets
      }; // set custom styles

      if (_pagination.style) {
        Object(awesome_js_funcs_dom_addStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(this.el.pagination, _pagination.style);
      } // Fix Explain Space


      this._fixExplainSpace();
    }
  };

  _proto._initNavigation = function _initNavigation() {
    var _navigation = this.config.mainOrigin.navigation;

    if (_navigation) {
      if (_navigation.custom) {
        // Set custom navigation
        this.el.navigation.prevEl = Object(awesome_js_funcs_judgeBasic_isString__WEBPACK_IMPORTED_MODULE_3__["default"])(_navigation.custom.prevEl) ? document.querySelector(_navigation.custom.prevEl) : _navigation.custom.prevEl;
        this.el.navigation.nextEl = Object(awesome_js_funcs_judgeBasic_isString__WEBPACK_IMPORTED_MODULE_3__["default"])(_navigation.custom.nextEl) ? document.querySelector(_navigation.custom.nextEl) : _navigation.custom.nextEl;
        this.el.navigation.prevEl.classList.add('swiper-button-prev', _style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.resetNavigationEl);
        this.el.navigation.nextEl.classList.add('swiper-button-next', _style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.resetNavigationEl);
      } else {
        // add to Dom
        this.el.navigation.prevEl = this.emptyDiv.cloneNode();
        this.el.navigation.nextEl = this.emptyDiv.cloneNode();
        this.el.navigation.prevEl.classList.add('swiper-button-prev');
        this.el.navigation.nextEl.classList.add('swiper-button-next');

        switch (_navigation.color) {
          case 'white':
            this.el.navigation.nextEl.classList.add('swiper-button-white');
            this.el.navigation.prevEl.classList.add('swiper-button-white');
            break;

          case 'black':
            this.el.navigation.nextEl.classList.add('swiper-button-black');
            this.el.navigation.prevEl.classList.add('swiper-button-black');
            break;
        } // set custom styles


        if (_navigation.styles) {
          if (_navigation.styles.next) {
            Object(awesome_js_funcs_dom_addStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(this.el.navigation.nextEl, _navigation.styles.next);
          }

          if (_navigation.styles.prev) {
            Object(awesome_js_funcs_dom_addStyles__WEBPACK_IMPORTED_MODULE_4__["default"])(this.el.navigation.prevEl, _navigation.styles.prev);
          }
        }

        this.el.mainContainer.appendChild(this.el.navigation.nextEl);
        this.el.mainContainer.appendChild(this.el.navigation.prevEl);
      } // set swiperConfig


      this.config.main.navigation = {
        nextEl: this.el.navigation.nextEl,
        prevEl: this.el.navigation.prevEl
      };
    }
  };

  _proto._fixExplainSpace = function _fixExplainSpace() {
    Array.prototype.slice.apply(this.el.mainContainer.querySelectorAll('.swiper-explain')).forEach(function (el) {
      el.classList.add(_style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.bottomSpace);
    });
  };

  _proto._fixFullImg = function _fixFullImg(eContainer) {
    var slideClientRect = eContainer.querySelector('.swiper-slide').getBoundingClientRect(),
        aImgs = Object(awesome_js_funcs_typeConversion_nodeListToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(eContainer.querySelectorAll('.swiper-full-img>img'));
    aImgs.forEach(function (img) {
      var imgNaturalDimensions = _getImgNaturalDimensions(img);

      if (slideClientRect.width / slideClientRect.height < imgNaturalDimensions.width / imgNaturalDimensions.height) {
        img.classList.add(_style_main_scss__WEBPACK_IMPORTED_MODULE_1___default.a.basedOnHeight);
      }
    });
  };

  return AwesomeSwiper;
}();


;

var _getImgNaturalDimensions = function _getImgNaturalDimensions(img) {
  var width, height;

  if (img.naturalWidth) {
    width = img.naturalWidth;
    height = img.naturalHeight;
  } else {
    width = img.offsetWidth;
    height = img.offsetHeight;
  }

  return {
    width: width,
    height: height
  };
};

var ACTIVE_THUMB_CLASS = 'active-thumb';

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"resetNavigationEl":"_1pgY7jIiH7","bottomSpace":"_9qtK_Vt8QO","basedOnHeight":"_1U2wYwdDW_","white":"_39B-D2csfE","black":"_2D7iEML7vm","thumbsWrapper":"_3CbNQoKvjw"};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 判断是否字符串
 * @param str
 * @returns {boolean}
 */
/* harmony default export */ __webpack_exports__["default"] = (function (str) {
  return typeof str === 'string' && str.constructor === String;
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * element add styles
 * @param element
 * @param styles(obj)
 */
/* harmony default export */ __webpack_exports__["default"] = (function (element, styles) {
  for (var name in styles) {
    element.style[name] = styles[name];
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 兄弟节点过滤器（主要用来选取同组中的激活对象）
 * @param el
 * @param className
 * @returns {*}
 */
/* harmony default export */ __webpack_exports__["default"] = (function (el, className) {
  if (className === void 0) {
    className = 'active';
  }

  return Array.prototype.filter.call(el.parentNode.children, function (child) {
    return child.classList.contains(className);
  });
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _judgeBasic_isNodeList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

/**
 * nodeList转变为数组
 * @param nodeList
 * @returns {Array}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (nodeList) {
  if (Array.isArray(nodeList)) {
    return nodeList;
  }

  if (!Object(_judgeBasic_isNodeList__WEBPACK_IMPORTED_MODULE_0__["default"])(nodeList)) {
    return new Array(nodeList);
  }

  return Array.from ? Array.from(nodeList) : Array.prototype.slice.call(nodeList);
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 判断是否nodeList
 * @param nodeList
 */
/* harmony default export */ __webpack_exports__["default"] = (function (nodeList) {
  return Object.prototype.toString.call(nodeList) === '[object NodeList]';
});

/***/ })
/******/ ])["default"];
});