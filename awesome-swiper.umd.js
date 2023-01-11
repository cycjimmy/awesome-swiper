(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('swiper')) :
  typeof define === 'function' && define.amd ? define(['swiper'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.AwesomeSwiper = factory(global.Swiper));
})(this, (function (Swiper) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Swiper__default = /*#__PURE__*/_interopDefaultLegacy(Swiper);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  /**
   * determine a string type
   * @param str
   * @returns {boolean}
   */
  var isString = (str => typeof str === 'string' && str.constructor === String);

  /**
   * determine a number type
   * @param num
   * @returns {boolean}
   */
  var isNumber = (num => Object.prototype.toString.call(num).slice(8, -1) === 'Number');

  /**
   * compatibility scheme for traversing object property methods Object.entries
   * @param obj
   * @returns {Iterator.<*>|*}
   */
  var entries = (obj => {
    var replaceFunc = o => {
      var arr = [];
      Object.keys(o).forEach(key => {
        arr.push([key, o[key]]);
      });
      return arr;
    };
    if (Object.entries) {
      return Object.entries(obj);
    }
    return replaceFunc(obj);
  });

  /**
   * element add styles
   * @param element
   * @param styles(obj)
   */
  var addStyles = ((element, styles) => {
    entries(styles).forEach(_ref => {
      var [k, v] = _ref;
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        // eslint-disable-next-line no-param-reassign
        element.style[k] = v;
      }
    });
  });

  /**
   * sibling filter（mainly used to select active objects in a same group）
   * @param el
   * @param className
   * @returns {*}
   */
  var siblingFilter = (function (el) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'active';
    return Array.prototype.filter.call(el.parentNode.children, child => child.classList.contains(className));
  });

  /**
   * determine nodeList type
   * @param nodeList
   */
  var isNodeList = (nodeList => Object.prototype.toString.call(nodeList) === '[object NodeList]');

  /**
   * determine an array type
   * @param arr
   * @returns {boolean}
   */
  var isArray = (arr => Object.prototype.toString.call(arr).slice(8, -1) === 'Array');

  /**
   * nodeList into array
   * @param nodeList
   * @returns {Array}
   */
  var nodeListToArray = (nodeList => {
    if (isArray(nodeList)) {
      return nodeList;
    }
    if (!isNodeList(nodeList)) {
      return new Array(nodeList);
    }
    return Array.from ? Array.from(nodeList) : Array.prototype.slice.call(nodeList);
  });

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (!css || typeof document === 'undefined') {
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".swiper-explain,.swiper-full-bg,.swiper-full-img{position:absolute;z-index:1}.swiper-full-bg,.swiper-full-img{height:100%;left:0;top:0;width:100%}.main-module__customNavigationEl.swiper-button-disabled{cursor:auto;opacity:.35;pointer-events:none}.swiper-pagination .swiper-pagination-bullet{background:var(--swiper-pagination-color,#000);opacity:.4}.swiper-pagination .swiper-pagination-bullet-active{background:var(--swiper-pagination-color,var(--swiper-theme-color));opacity:.9}.main-module__thumbsWrapper .swiper-slide{cursor:pointer;height:100%;opacity:.4}.main-module__thumbsWrapper .swiper-slide.active-thumb{opacity:1}.main-module__thumbsWrapper.swiper-container-vertical .swiper-full-img>img{height:100%;width:auto}.swiper-explain{background-color:#0006;bottom:0;box-sizing:initial;color:#fff;left:0;padding:10px;text-align:left;width:calc(100% - 20px)}.swiper-explain.main-module__bottomSpace{padding-bottom:25px}.swiper-full-img{overflow:hidden}.swiper-full-img>img{bottom:-100%;display:block;left:-100%;margin:auto;position:absolute;right:-100%;top:-100%;width:100%;z-index:1}.swiper-full-img>img.main-module__basedOnHeight{height:100%;width:auto}.swiper-full-bg{background-position:50%;background-repeat:no-repeat;background-size:cover;display:block}";
  var style = {"customNavigationEl":"main-module__customNavigationEl","thumbsWrapper":"main-module__thumbsWrapper","bottomSpace":"main-module__bottomSpace","basedOnHeight":"main-module__basedOnHeight"};
  styleInject(css_248z);

  /**
   * getImgNaturalDimensions
   * @param img
   * @returns {{width: number, height: number}}
   */
  var getImgNaturalDimensions = function getImgNaturalDimensions(img) {
    var width;
    var height;
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

  /**
   * fixFullImg
   * @param eContainer
   */
  var fixFullImg = function fixFullImg(eContainer) {
    var eSide = eContainer.querySelector('.swiper-slide');
    // fix empty swiper
    if (!eSide) {
      return;
    }
    var slideClientRect = eSide.getBoundingClientRect();
    var aImgEls = nodeListToArray(eContainer.querySelectorAll('.swiper-full-img > img'));
    aImgEls.forEach(function (img) {
      var imgNaturalDimensions = getImgNaturalDimensions(img);
      if (slideClientRect.width / slideClientRect.height < imgNaturalDimensions.width / imgNaturalDimensions.height) {
        img.classList.add(style.basedOnHeight);
      }
    });
  };

  // static
  var ACTIVE_THUMB_CLASS = 'active-thumb';
  var STYLE_PROPERTY_NAME = {
    themeColor: '--swiper-theme-color',
    navigationColor: '--swiper-navigation-color',
    navigationSize: '--swiper-navigation-size',
    paginationColor: '--swiper-pagination-color'
  };
  var AwesomeSwiper = /*#__PURE__*/function () {
    /**
     * AwesomeSwiper constructor
     * @param SwiperModule
     */
    function AwesomeSwiper(SwiperModule) {
      _classCallCheck(this, AwesomeSwiper);
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
        constructor: SwiperModule || Swiper__default["default"]
      };
      this.config = {};
    }

    /**
     * init
     * @param container
     * @param customMainConfig
     * @param overlaySwiperConfig
     * @returns {AwesomeSwiper}
     */
    _createClass(AwesomeSwiper, [{
      key: "init",
      value: function init(container) {
        var customMainConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var overlaySwiperConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.el.mainContainer = isString(container) ? document.querySelector(container) : container;
        var mainDefault = {
          speed: 300,
          loop: false,
          autoplay: 0,
          direction: 'horizontal',
          spaceBetween: 0,
          slidesPerView: 1,
          mousewheel: false,
          autoFixFullImg: false,
          autoHeight: false,
          themeColor: '',
          pagination: {
            color: '',
            style: null,
            dynamicBullets: false
          },
          navigation: {
            color: '',
            size: '',
            styles: {
              prev: null,
              next: null
            },
            custom: null
          }
        };
        this.config.mainOrigin = _objectSpread2(_objectSpread2({}, mainDefault), customMainConfig);
        this.config.main = {
          speed: this.config.mainOrigin.speed,
          loop: this.config.mainOrigin.loop,
          direction: this.config.mainOrigin.direction,
          spaceBetween: this.config.mainOrigin.spaceBetween,
          slidesPerView: this.config.mainOrigin.slidesPerView,
          mousewheel: this.config.mainOrigin.mousewheel,
          autoHeight: this.config.mainOrigin.autoHeight
        };

        // set customConfig.autoplay
        if (this.config.mainOrigin.autoplay) {
          this.config.main.autoplay = {};
          this.config.main.autoplay.delay = this.config.mainOrigin.autoplay;
        }
        this.initPagination();
        this.initNavigation();
        this.config.main = Object.assign(this.config.main, overlaySwiperConfig);
        this.initMainSwiper();
        return this;
      }

      /**
       * addThumbs
       * @param thumbsContainer
       * @param customThumbsConfig
       * @param extraConfig
       * @returns {AwesomeSwiper}
       */
    }, {
      key: "addThumbs",
      value: function addThumbs(thumbsContainer) {
        var customThumbsConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var extraConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.el.thumbsContainer = isString(thumbsContainer) ? document.querySelector(thumbsContainer) : thumbsContainer;
        this.el.thumbsContainer.classList.add(style.thumbsWrapper);

        // config
        var thumbsDefault = {
          spaceBetween: 10,
          slidesPerView: 'auto'
        };
        var thumbsExtraDefault = {
          mouseOverMode: false
        };
        this.config.thumbs = _objectSpread2(_objectSpread2({}, thumbsDefault), customThumbsConfig);
        this.config.thumbsExtra = _objectSpread2(_objectSpread2({}, thumbsExtraDefault), extraConfig);
        this.swiper.thumbs = new this.swiper.constructor(this.el.thumbsContainer, this.config.thumbs);
        if (this.swiper.thumbs.slides[0]) {
          this.swiper.thumbs.slides[0].classList.add(ACTIVE_THUMB_CLASS);
        }
        this.thumbsCtrl(this.config.thumbsExtra);

        // fix full img
        if (this.config.thumbsExtra.autoFixFullImg) {
          fixFullImg(this.el.thumbsContainer);
        }
        return this;
      }

      /**
       * setInitialSlide
       * @param initialSlide: Index number of initial slide.
       * @returns {AwesomeSwiper}
       */
    }, {
      key: "setInitialSlide",
      value: function setInitialSlide(initialSlide) {
        if (this.swiper.main) {
          this.swiper.main.slideTo(initialSlide, 0);
        }
        return this;
      }

      /**
       * on
       * @param event
       * @param handler
       * @returns {AwesomeSwiper}
       */
    }, {
      key: "on",
      value: function on(event, handler) {
        if (this.swiper.main) {
          this.swiper.main.on(event, handler);
        }
        return this;
      }

      /**
       * off
       * @param event
       * @param handler
       * @returns {AwesomeSwiper}
       */
    }, {
      key: "off",
      value: function off(event, handler) {
        if (this.swiper.main) {
          this.swiper.main.off(event, handler);
        }
        return this;
      }

      /**
       * initMainSwiper
       * @private
       */
    }, {
      key: "initMainSwiper",
      value: function initMainSwiper() {
        var themeColor = this.config.mainOrigin.themeColor;
        if (themeColor) {
          this.el.mainContainer.style.setProperty(STYLE_PROPERTY_NAME.themeColor, themeColor);
        }
        this.swiper.main = new this.swiper.constructor(this.el.mainContainer, this.config.main);

        // fix full img
        if (this.config.mainOrigin.autoFixFullImg) {
          fixFullImg(this.el.mainContainer);
        }
      }

      /**
       * thumbsCtrl
       * @param thumbsExtraConfig
       * @private
       */
    }, {
      key: "thumbsCtrl",
      value: function thumbsCtrl(thumbsExtraConfig) {
        var _this = this;
        // mainSwiper ctrl
        this.on('slideChange', function () {
          var swiperIndex = _this.swiper.main.realIndex;
          var targetThumb = _this.swiper.thumbs.slides[swiperIndex];

          // ui change
          siblingFilter(targetThumb, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);
          _this.swiper.thumbs.slides[swiperIndex].classList.add(ACTIVE_THUMB_CLASS);
          _this.swiper.thumbs.slideTo(swiperIndex);
        });
        nodeListToArray(this.swiper.thumbs.slides).forEach(function (el, index) {
          var uiChange = function uiChange() {
            siblingFilter(el, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);
            _this.swiper.thumbs.slides[index].classList.add(ACTIVE_THUMB_CLASS);
            _this.swiper.thumbs.slideTo(index);
            if (_this.swiper.main.params.loop) {
              _this.swiper.main.slideToLoop(index);
            } else {
              _this.swiper.main.slideTo(index);
            }
          };
          if (thumbsExtraConfig.mouseOverMode) {
            el.addEventListener('mouseover', function () {
              return uiChange();
            });
            el.addEventListener('touchstart', function () {
              return uiChange();
            });
          } else {
            el.addEventListener('click', function () {
              return uiChange();
            });
          }
        });
      }

      /**
       * initPagination
       * @private
       */
    }, {
      key: "initPagination",
      value: function initPagination() {
        var pagination = this.config.mainOrigin.pagination;
        if (!pagination) {
          return;
        }

        // add to Dom
        this.el.pagination = this.emptyDiv.cloneNode();
        this.el.pagination.classList.add('swiper-pagination');
        this.el.mainContainer.appendChild(this.el.pagination);

        // set swiperConfig
        if (pagination.color) {
          this.el.mainContainer.style.setProperty(STYLE_PROPERTY_NAME.paginationColor, pagination.color);
        }
        this.config.main.pagination = {
          el: this.el.pagination,
          clickable: true,
          dynamicBullets: this.config.mainOrigin.pagination.dynamicBullets
        };

        // set custom styles
        if (pagination.style) {
          addStyles(this.el.pagination, pagination.style);
        }

        // Fix Explain Space
        this.fixExplainSpace();
      }

      /**
       * initNavigation
       * @private
       */
    }, {
      key: "initNavigation",
      value: function initNavigation() {
        var _this2 = this;
        var navigation = this.config.mainOrigin.navigation;
        if (!navigation) {
          return;
        }
        var setSwiperConfig = function setSwiperConfig() {
          _this2.config.main.navigation = {
            nextEl: _this2.el.navigation.nextEl,
            prevEl: _this2.el.navigation.prevEl
          };
        };
        if (navigation.custom) {
          // Set custom navigation
          this.el.navigation.prevEl = isString(navigation.custom.prevEl) ? document.querySelector(navigation.custom.prevEl) : navigation.custom.prevEl;
          this.el.navigation.nextEl = isString(navigation.custom.nextEl) ? document.querySelector(navigation.custom.nextEl) : navigation.custom.nextEl;
          this.el.navigation.prevEl.classList.add(style.customNavigationEl);
          this.el.navigation.nextEl.classList.add(style.customNavigationEl);
          setSwiperConfig();
          return;
        }

        // add to Dom
        this.el.navigation.prevEl = this.emptyDiv.cloneNode();
        this.el.navigation.nextEl = this.emptyDiv.cloneNode();
        this.el.navigation.prevEl.classList.add('swiper-button-prev');
        this.el.navigation.nextEl.classList.add('swiper-button-next');
        if (navigation.color) {
          this.el.mainContainer.style.setProperty(STYLE_PROPERTY_NAME.navigationColor, navigation.color);
        }
        if (navigation.size) {
          if (isNumber(navigation.size)) {
            navigation.size += 'px';
          }
          this.el.mainContainer.style.setProperty(STYLE_PROPERTY_NAME.navigationSize, navigation.size);
        }

        // set custom styles
        if (navigation.styles) {
          if (navigation.styles.next) {
            addStyles(this.el.navigation.nextEl, navigation.styles.next);
          }
          if (navigation.styles.prev) {
            addStyles(this.el.navigation.prevEl, navigation.styles.prev);
          }
        }
        this.el.mainContainer.appendChild(this.el.navigation.nextEl);
        this.el.mainContainer.appendChild(this.el.navigation.prevEl);
        setSwiperConfig();
      }

      /**
       * fixExplainSpace
       * @private
       */
    }, {
      key: "fixExplainSpace",
      value: function fixExplainSpace() {
        nodeListToArray(this.el.mainContainer.querySelectorAll('.swiper-explain')).forEach(function (el) {
          el.classList.add(style.bottomSpace);
        });
      }
    }]);
    return AwesomeSwiper;
  }();

  return AwesomeSwiper;

}));
