// style
if (DEVELOPMENT || STANDALONE) {
  console.log('development');
  require('../node_modules/swiper/dist/css/swiper.css');
}

import _style from './style/main.scss';

// component
import Swiper from 'swiper';


import isString from 'awesome-js-funcs/judgeBasic/isString';
import addStyles from 'awesome-js-funcs/dom/addStyles';
import siblingFilter from 'awesome-js-funcs/dom/siblingFilter';
import nodeListToArray from 'awesome-js-funcs/typeConversion/nodeListToArray';

// polyfill
import '../node_modules/core-js/modules/es6.object.assign';


export default class AwesomeSwiper {
  constructor(SwiperModule) {
    this.el = {
      mainContainer: null,
      thumbsContainer: null,
      pagination: null,
      navigation: null,
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

    let mainDefault = {
      loop: false,
      autoplay: 0,
      mousewheel: false,
      autoFixFullImg: false,
      pagination: {
        color: 'default'
      },
      navigation: {
        color: 'default',
        styles: {
          prevEl: null,
          nextEl: null,
        }
      }
    };

    this.config.mainOrigin = Object.assign({}, mainDefault, customMainConfig);

    // fix full img
    this._fixFullImg(this.config.mainOrigin.autoFixFullImg);

    this.config.main = {
      loop: this.config.mainOrigin.loop,
      mousewheel: this.config.mainOrigin.mousewheel,
    };

    // set customConfig.autoplay
    if (this.config.mainOrigin.autoplay) {
      this.config.main.autoplay.delay = this.config.mainOrigin.autoplay;
    }

    this._initPagination();
    this._initNavigation();

    this.config.main = Object.assign(this.config.main, overlaySwiperConfig);
    this.swiper.main = new this.swiper._constructor(this.el.mainContainer, this.config.main);

    return this;
  };

  addThumbs(thumbsContainer, customThumbsConfig = {}, extraConfig = {}) {
    console.log('addThumbs');

    this.el.thumbsContainer = isString(thumbsContainer)
      ? document.querySelector(thumbsContainer)
      : thumbsContainer;

    this.el.thumbsContainer.classList.add(_style.thumbsWrapper);

    // config
    let thumbsDefault = {
      spaceBetween: 10,
      slidesPerView: 'auto',
    };

    let thumbsExtraDefault = {
      mouseOverMode: false,
    };

    this.config.thumbs = Object.assign({}, thumbsDefault, customThumbsConfig);
    this.config.thumbsExtra = Object.assign({}, thumbsExtraDefault, extraConfig);

    this.swiper.thumbs = new this.swiper._constructor(this.el.thumbsContainer, this.config.thumbs);

    this.swiper.thumbs.slides[0].classList.add(_style.active);

    this._thumbsCtrl(this.config.thumbsExtra);

    return this;
  };

  _thumbsCtrl(thumbsExtraConfig) {
    // mainSwiper ctrl
    this.swiper.main.on('slideChange', () => {
      console.log('mainSwiper slideChange');

      let
        swiperIndex = this.swiper.main.realIndex
        , targetThumb = this.swiper.thumbs.slides[swiperIndex]
      ;

      // ui change
      siblingFilter(targetThumb, _style.active)[0].classList.remove(_style.active);
      this.swiper.thumbs.slides[swiperIndex].classList.add(_style.active);
      this.swiper.thumbs.slideTo(swiperIndex);
    });


    Array.prototype.slice.call(this.swiper.thumbs.slides).forEach((el, index) => {
      let
        _uiChange = () => {
          siblingFilter(el, _style.active)[0].classList.remove(_style.active);
          this.swiper.thumbs.slides[index].classList.add(_style.active);
          this.swiper.thumbs.slideTo(index);
          this.swiper.main.slideTo(index);
        };

      if (thumbsExtraConfig.mouseOverMode) {
        el.addEventListener('mouseover', () => _uiChange());

        //
        el.addEventListener('touchstart', () => _uiChange());
      } else {
        el.addEventListener('click', () => _uiChange());
      }
    });
  };

  _initPagination() {
    if (this.config.mainOrigin.pagination) {
      // add to Dom
      this.el.pagination = document.createElement('div');
      this.el.pagination.classList.add('swiper-pagination');
      this.el.mainContainer.appendChild(this.el.pagination);

      // set swiperConfig
      switch (this.config.mainOrigin.pagination.color) {
        case 'white':
          this.el.pagination.classList.add(_style.white);
          break;

        case 'black':
          this.el.pagination.classList.add(_style.black);
          break;
      }

      this.config.main.pagination = {
        el: this.el.pagination,
        clickable: true,
        dynamicBullets: true,
      };

      // Fix Explain Space
      this._fixExplainSpace();
    }
  };

  _initNavigation() {
    let
      _navigation = this.config.mainOrigin.navigation;

    if (_navigation) {
      // add to Dom
      this.el.navigation = {
        nextEl: document.createElement('div'),
        prevEl: document.createElement('div'),
      };
      this.el.navigation.nextEl.classList.add('swiper-button-next');
      this.el.navigation.prevEl.classList.add('swiper-button-prev');

      switch (_navigation.color) {
        case 'white':
          this.el.navigation.nextEl.classList.add('swiper-button-white');
          this.el.navigation.prevEl.classList.add('swiper-button-white');
          break;

        case 'black':
          this.el.navigation.nextEl.classList.add('swiper-button-black');
          this.el.navigation.prevEl.classList.add('swiper-button-black');
          break;
      }

      // set custom styles
      if (_navigation.styles) {
        if (_navigation.styles.nextEl) {
          addStyles(this.el.navigation.nextEl, _navigation.styles.nextEl);
        }
        if (_navigation.styles.prevEl) {
          addStyles(this.el.navigation.prevEl, _navigation.styles.prevEl);
        }
      }

      this.el.mainContainer.appendChild(this.el.navigation.nextEl);
      this.el.mainContainer.appendChild(this.el.navigation.prevEl);

      // set swiperConfig
      this.config.main.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }
  };

  _fixExplainSpace() {
    Array.prototype.slice
      .apply(this.el.mainContainer.querySelectorAll('.swiper-explain'))
      .forEach(el => {
        el.classList.add(_style.bottomSpace);
      });
  };

  _fixFullImg(needFix) {
    if (!needFix) {
      return;
    }

    let
      mainContainerClientRect = this.el.mainContainer.getBoundingClientRect()
      , aImgs = nodeListToArray(this.el.mainContainer.querySelectorAll('.swiper-full-img>img'))
    ;

    aImgs.forEach(img => {
      let imgNaturalDimensions = _getImgNaturalDimensions(img);
      if (mainContainerClientRect.width / mainContainerClientRect.height < imgNaturalDimensions.width / imgNaturalDimensions.height) {
        img.classList.add(_style.basedOnHeight);
      }
    });
  };
};

let _getImgNaturalDimensions = (img) => {
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

