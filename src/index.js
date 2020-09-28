import Swiper, { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper';

import isString from '@cycjimmy/awesome-js-funcs/judgeBasic/isString';
import isNumber from '@cycjimmy/awesome-js-funcs/judgeBasic/isNumber';
import addStyles from '@cycjimmy/awesome-js-funcs/dom/addStyles';
import siblingFilter from '@cycjimmy/awesome-js-funcs/dom/siblingFilter';
import nodeListToArray from '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray';

import 'swiper/swiper-bundle.css';
import style from './style/main.module.scss';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel]);

const getImgNaturalDimensions = (img) => {
  let width;
  let height;
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

const fixFullImg = (eContainer) => {
  const eSide = eContainer.querySelector('.swiper-slide');
  // fix empty swiper
  if (!eSide) {
    return;
  }

  const slideClientRect = eSide.getBoundingClientRect();
  const aImgs = nodeListToArray(eContainer.querySelectorAll('.swiper-full-img > img'));

  aImgs.forEach((img) => {
    const imgNaturalDimensions = getImgNaturalDimensions(img);
    if (
      slideClientRect.width / slideClientRect.height <
      imgNaturalDimensions.width / imgNaturalDimensions.height
    ) {
      img.classList.add(style.basedOnHeight);
    }
  });
};

const ACTIVE_THUMB_CLASS = 'active-thumb';

const STYLE_PROPERTY_NAME = {
  themeColor: '--swiper-theme-color',
  navigationColor: '--swiper-navigation-color',
  navigationSize: '--swiper-navigation-size',
  paginationColor: '--swiper-pagination-color'
};

export default class {
  constructor() {
    this._emptyDiv = document.createElement('div');

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
      constructor: Swiper
    };
    this.config = {};
  }

  init(container, customMainConfig = {}, overlaySwiperConfig = {}) {
    this.el.mainContainer = isString(container) ? document.querySelector(container) : container;

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
          next: null
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
      mousewheel: this.config.mainOrigin.mousewheel
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
  }

  addThumbs(thumbsContainer, customThumbsConfig = {}, extraConfig = {}) {
    this.el.thumbsContainer = isString(thumbsContainer)
      ? document.querySelector(thumbsContainer)
      : thumbsContainer;

    this.el.thumbsContainer.classList.add(style.thumbsWrapper);

    // config
    const thumbsDefault = {
      spaceBetween: 10,
      slidesPerView: 'auto'
    };

    const thumbsExtraDefault = {
      mouseOverMode: false
    };

    this.config.thumbs = Object.assign({}, thumbsDefault, customThumbsConfig);
    this.config.thumbsExtra = Object.assign({}, thumbsExtraDefault, extraConfig);

    this.swiper.thumbs = new this.swiper.constructor(this.el.thumbsContainer, this.config.thumbs);

    this.swiper.thumbs.slides[0].classList.add(ACTIVE_THUMB_CLASS);

    this._thumbsCtrl(this.config.thumbsExtra);

    // fix full img
    if (this.config.thumbsExtra.autoFixFullImg) {
      fixFullImg(this.el.thumbsContainer);
    }

    return this;
  }

  _initMainSwiper() {
    const { themeColor } = this.config.mainOrigin;

    if (themeColor) {
      this.el.mainContainer.style.setProperty(STYLE_PROPERTY_NAME.themeColor, themeColor);
    }

    this.swiper.main = new this.swiper.constructor(this.el.mainContainer, this.config.main);

    // fix full img
    if (this.config.mainOrigin.autoFixFullImg) {
      fixFullImg(this.el.mainContainer);
    }
  }

  _thumbsCtrl(thumbsExtraConfig) {
    // mainSwiper ctrl
    this.swiper.main.on('slideChange', () => {
      const swiperIndex = this.swiper.main.realIndex;
      const targetThumb = this.swiper.thumbs.slides[swiperIndex];
      // ui change
      siblingFilter(targetThumb, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);
      this.swiper.thumbs.slides[swiperIndex].classList.add(ACTIVE_THUMB_CLASS);
      this.swiper.thumbs.slideTo(swiperIndex);
    });

    Array.prototype.slice.call(this.swiper.thumbs.slides).forEach((el, index) => {
      const uiChange = () => {
        siblingFilter(el, ACTIVE_THUMB_CLASS)[0].classList.remove(ACTIVE_THUMB_CLASS);
        this.swiper.thumbs.slides[index].classList.add(ACTIVE_THUMB_CLASS);
        this.swiper.thumbs.slideTo(index);

        if (this.swiper.main.params.loop) {
          this.swiper.main.slideToLoop(index);
        } else {
          this.swiper.main.slideTo(index);
        }
      };

      if (thumbsExtraConfig.mouseOverMode) {
        el.addEventListener('mouseover', () => uiChange());
        el.addEventListener('touchstart', () => uiChange());
      } else {
        el.addEventListener('click', () => uiChange());
      }
    });
  }

  _initPagination() {
    const { pagination } = this.config.mainOrigin;

    if (pagination) {
      // add to Dom
      this.el.pagination = this._emptyDiv.cloneNode();
      this.el.pagination.classList.add('swiper-pagination');
      this.el.mainContainer.appendChild(this.el.pagination);

      // set swiperConfig
      if (pagination.color) {
        this.el.mainContainer.style.setProperty(
          STYLE_PROPERTY_NAME.paginationColor,
          pagination.color
        );
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
      this._fixExplainSpace();
    }
  }

  _initNavigation() {
    const { navigation } = this.config.mainOrigin;

    if (!navigation) {
      return;
    }

    const setSwiperConfig = () => {
      this.config.main.navigation = {
        nextEl: this.el.navigation.nextEl,
        prevEl: this.el.navigation.prevEl
      };
    };

    if (navigation.custom) {
      // Set custom navigation
      this.el.navigation.prevEl = isString(navigation.custom.prevEl)
        ? document.querySelector(navigation.custom.prevEl)
        : navigation.custom.prevEl;
      this.el.navigation.nextEl = isString(navigation.custom.nextEl)
        ? document.querySelector(navigation.custom.nextEl)
        : navigation.custom.nextEl;
      this.el.navigation.prevEl.classList.add(style.customNavigationEl);
      this.el.navigation.nextEl.classList.add(style.customNavigationEl);

      setSwiperConfig();
      return;
    }

    // add to Dom
    this.el.navigation.prevEl = this._emptyDiv.cloneNode();
    this.el.navigation.nextEl = this._emptyDiv.cloneNode();
    this.el.navigation.prevEl.classList.add('swiper-button-prev');
    this.el.navigation.nextEl.classList.add('swiper-button-next');

    if (navigation.color) {
      this.el.mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.navigationColor,
        navigation.color
      );
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

  _fixExplainSpace() {
    Array.prototype.slice
      .apply(this.el.mainContainer.querySelectorAll('.swiper-explain'))
      .forEach((el) => {
        el.classList.add(style.bottomSpace);
      });
  }
}
