// style
if (DEVELOPMENT || STANDALONE) {
  console.log('development');
  require('swiper/css/swiper.css');
}

const _style = require('./style/main.scss');

// component
import Swiper from 'swiper';

import isString from '@cycjimmy/awesome-js-funcs/judgeBasic/isString';
import isNumber from '@cycjimmy/awesome-js-funcs/judgeBasic/isNumber';
import addStyles from '@cycjimmy/awesome-js-funcs/dom/addStyles';
import siblingFilter from '@cycjimmy/awesome-js-funcs/dom/siblingFilter';
import nodeListToArray from '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray';

export default class AwesomeSwiper {
  constructor(SwiperModule) {
    this.emptyDiv = document.createElement('div');

    this.el = {
      mainContainer: null,
      thumbsContainer: null,
      pagination: null,
      navigation: {
        nextEl: null,
        prevEl: null,
      },
    };
    this.swiper = {
      _constructor: SwiperModule || Swiper,
    };
    this.config = {};
  };

  init(container, customMainConfig = {}, overlaySwiperConfig = {}) {
    this.el.mainContainer = isString(container)
      ? document.querySelector(container)
      : container;

    const mainDefault = {
      speed: 300,
      loop: false,
      autoplay: 0,
      direction: 'horizontal',
      spaceBetween: 0,
      slidesPerView: 1,
      mousewheel: false,
      autoFixFullImg: false,
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
          next: null,
        },
        custom: null
      }
    };

    this.config.mainOrigin = Object.assign({}, mainDefault, customMainConfig);

    this.config.main = {
      speed: this.config.mainOrigin.speed,
      loop: this.config.mainOrigin.loop,
      direction: this.config.mainOrigin.direction,
      spaceBetween: this.config.mainOrigin.spaceBetween,
      slidesPerView: this.config.mainOrigin.slidesPerView,
      mousewheel: this.config.mainOrigin.mousewheel,
    };

    // set customConfig.autoplay
    if (this.config.mainOrigin.autoplay) {
      this.config.main.autoplay = {};
      this.config.main.autoplay.delay = this.config.mainOrigin.autoplay;
    }

    this._initPagination();
    this._initNavigation();

    this.config.main = Object.assign(this.config.main, overlaySwiperConfig);
    this._initMainSwiper();

    return this;
  };

  _initMainSwiper() {
    const _themeColor = this.config.mainOrigin.themeColor;

    if (_themeColor) {
      this.el.mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.themeColor,
        _themeColor,
      );
    }

    this.swiper.main = new this.swiper._constructor(this.el.mainContainer, this.config.main);

    // fix full img
    if (this.config.mainOrigin.autoFixFullImg) {
      this._fixFullImg(this.el.mainContainer);
    }
  };

  addThumbs(thumbsContainer, customThumbsConfig = {}, extraConfig = {}) {
    this.el.thumbsContainer = isString(thumbsContainer)
      ? document.querySelector(thumbsContainer)
      : thumbsContainer;

    this.el.thumbsContainer.classList.add(_style.thumbsWrapper);

    // config
    const thumbsDefault = {
      spaceBetween: 10,
      slidesPerView: 'auto',
    };

    const thumbsExtraDefault = {
      mouseOverMode: false,
    };

    this.config.thumbs = Object.assign({}, thumbsDefault, customThumbsConfig);
    this.config.thumbsExtra = Object.assign({}, thumbsExtraDefault, extraConfig);

    this.swiper.thumbs = new this.swiper._constructor(this.el.thumbsContainer, this.config.thumbs);

    this.swiper.thumbs.slides[0].classList.add(ACTIVE_THUMB_CLASS);

    this._thumbsCtrl(this.config.thumbsExtra);

    // fix full img
    if (this.config.thumbsExtra.autoFixFullImg) {
      this._fixFullImg(this.el.thumbsContainer);
    }

    return this;
  };

  _thumbsCtrl(thumbsExtraConfig) {
    // mainSwiper ctrl
    this.swiper.main.on('slideChange', () => {
      console.log('mainSwiper slideChange');

      const
        swiperIndex = this.swiper.main.realIndex
        , targetThumb = this.swiper.thumbs.slides[swiperIndex]
      ;

      // ui change
      siblingFilter(targetThumb, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);
      this.swiper.thumbs.slides[swiperIndex].classList.add(ACTIVE_THUMB_CLASS);
      this.swiper.thumbs.slideTo(swiperIndex);
    });


    Array.prototype.slice.call(this.swiper.thumbs.slides).forEach((el, index) => {
      const _uiChange = () => {
        siblingFilter(el, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);
        this.swiper.thumbs.slides[index].classList.add(ACTIVE_THUMB_CLASS);
        this.swiper.thumbs.slideTo(index);
        this.swiper.main.slideTo(index);
      };

      if (thumbsExtraConfig.mouseOverMode) {
        el.addEventListener('mouseover', () => _uiChange());
        el.addEventListener('touchstart', () => _uiChange());
      } else {
        el.addEventListener('click', () => _uiChange());
      }
    });
  };

  _initPagination() {
    const _pagination = this.config.mainOrigin.pagination;

    if (_pagination) {
      // add to Dom
      this.el.pagination = this.emptyDiv.cloneNode();
      this.el.pagination.classList.add('swiper-pagination');
      this.el.mainContainer.appendChild(this.el.pagination);

      // set swiperConfig
      if (_pagination.color) {
        this.el.mainContainer.style.setProperty(
          STYLE_PROPERTY_NAME.paginationColor,
          _pagination.color,
        );
      }

      this.config.main.pagination = {
        el: this.el.pagination,
        clickable: true,
        dynamicBullets: this.config.mainOrigin.pagination.dynamicBullets,
      };

      // set custom styles
      if (_pagination.style) {
        addStyles(this.el.pagination, _pagination.style);
      }

      // Fix Explain Space
      this._fixExplainSpace();
    }
  };

  _initNavigation() {
    const _navigation = this.config.mainOrigin.navigation;

    if (!_navigation) {
      return;
    }

    const _setSwiperConfig = () => {
      this.config.main.navigation = {
        nextEl: this.el.navigation.nextEl,
        prevEl: this.el.navigation.prevEl,
      };
    };

    if (_navigation.custom) {
      // Set custom navigation
      this.el.navigation.prevEl = isString(_navigation.custom.prevEl)
        ? document.querySelector(_navigation.custom.prevEl)
        : _navigation.custom.prevEl;
      this.el.navigation.nextEl = isString(_navigation.custom.nextEl)
        ? document.querySelector(_navigation.custom.nextEl)
        : _navigation.custom.nextEl;
      this.el.navigation.prevEl.classList.add('swiper-button-prev', _style.resetNavigationEl);
      this.el.navigation.nextEl.classList.add('swiper-button-next', _style.resetNavigationEl);

      _setSwiperConfig();
      return;
    }

    // add to Dom
    this.el.navigation.prevEl = this.emptyDiv.cloneNode();
    this.el.navigation.nextEl = this.emptyDiv.cloneNode();
    this.el.navigation.prevEl.classList.add('swiper-button-prev');
    this.el.navigation.nextEl.classList.add('swiper-button-next');

    if (_navigation.color) {
      this.el.mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.navigationColor,
        _navigation.color,
      );
    }

    if (_navigation.size) {
      if (isNumber(_navigation.size)) {
        _navigation.size += 'px';
      }

      this.el.mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.navigationSize,
        _navigation.size,
      );
    }

    // set custom styles
    if (_navigation.styles) {
      if (_navigation.styles.next) {
        addStyles(this.el.navigation.nextEl, _navigation.styles.next);
      }
      if (_navigation.styles.prev) {
        addStyles(this.el.navigation.prevEl, _navigation.styles.prev);
      }
    }

    this.el.mainContainer.appendChild(this.el.navigation.nextEl);
    this.el.mainContainer.appendChild(this.el.navigation.prevEl);
    _setSwiperConfig();
  };

  _fixExplainSpace() {
    Array.prototype.slice
      .apply(this.el.mainContainer.querySelectorAll('.swiper-explain'))
      .forEach(el => {
        el.classList.add(_style.bottomSpace);
      });
  };

  _fixFullImg(eContainer) {
    const
      slideClientRect = eContainer.querySelector('.swiper-slide').getBoundingClientRect()
      , aImgs = nodeListToArray(eContainer.querySelectorAll('.swiper-full-img>img'))
    ;

    aImgs.forEach(img => {
      const imgNaturalDimensions = _getImgNaturalDimensions(img);
      if (slideClientRect.width / slideClientRect.height < imgNaturalDimensions.width / imgNaturalDimensions.height) {
        img.classList.add(_style.basedOnHeight);
      }
    });
  };
};

const _getImgNaturalDimensions = (img) => {
  let
    width
    , height
  ;
  if (img.naturalWidth) {
    width = img.naturalWidth;
    height = img.naturalHeight;
  } else {
    width = img.offsetWidth;
    height = img.offsetHeight;
  }
  return {
    width,
    height
  };
};

const ACTIVE_THUMB_CLASS = 'active-thumb';

const STYLE_PROPERTY_NAME = {
  themeColor: '--swiper-theme-color',
  navigationColor: '--swiper-navigation-color',
  navigationSize: '--swiper-navigation-size',
  paginationColor: '--swiper-pagination-color',
};

