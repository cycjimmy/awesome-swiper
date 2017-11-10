// style
import 'swiper/dist/css/swiper.css'

import _style from './style/main.scss';

// component
import Swiper from 'swiper';

// template


export default class AwesomeSwiper {
  constructor(container, {
    loop = true,
    autoplay = {
      delay: 5000,
    },
    mousewheel = true,
    pagination = {
      type: 'default'
    },
    navigation = {
      type: 'default',
      styles: {
        nextEl: null,
        prevEl: null
      }
    },
  }) {
    // init container
    this.container = isString(container)
      ? document.querySelector(container)
      : container;

    this.container.classList.add('swiper-container');

    this.swiper = null;
    this.customConfig = {
      loop: loop,
      autoplay: autoplay,
      mousewheel: mousewheel,
      pagination: pagination,
      navigation: navigation,
    };
    this.swiperConfig = {
      loop: this.customConfig.loop,
      mousewheel: this.customConfig.mousewheel,
    };

    // set customConfig.autoplay
    if (this.customConfig.autoplay) {
      this.swiperConfig.autoplay = this.customConfig.autoplay;
    }

    this.init();
  };

  init() {
    this._initPagination();
    this._initNavigation();

    this.swiper = new Swiper(this.container, this.swiperConfig);
  };

  _initPagination() {
    if (this.customConfig.pagination) {
      // add to Dom
      this.pagination = document.createElement('div');
      this.pagination.classList.add('swiper-pagination');
      this.container.appendChild(this.pagination);

      // set swiperConfig
      switch (this.customConfig.pagination.type) {
        case 'case':
          break;

        default:
          this.swiperConfig.pagination = {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          };
      }
    }
  };


  _initNavigation() {
    let
      _navigation = this.customConfig.navigation;

    if (_navigation) {
      // add to Dom
      this.pagination = {
        nextEl: document.createElement('div'),
        prevEl: document.createElement('div'),
      };
      this.pagination.nextEl.classList.add('swiper-button-next');
      this.pagination.prevEl.classList.add('swiper-button-prev');

      switch (_navigation.type) {
        case 'white':
          this.pagination.nextEl.classList.add('swiper-button-white');
          this.pagination.prevEl.classList.add('swiper-button-white');
          break;

        case 'black':
          this.pagination.nextEl.classList.add('swiper-button-black');
          this.pagination.prevEl.classList.add('swiper-button-black');
          break;

        case 'custom':
          if (_navigation.styles.nextEl) {
            _addStyles(this.pagination.nextEl, _navigation.styles.nextEl);
          }
          if (_navigation.styles.prevEl) {
            _addStyles(this.pagination.prevEl, _navigation.styles.prevEl);
          }
          break;
      }

      this.container.appendChild(this.pagination.nextEl);
      this.container.appendChild(this.pagination.prevEl);

      // set swiperConfig
      this.swiperConfig.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }
  }
};

// private
let
  _addStyles = (element, styles) => {
    for (let name in styles) {
      element.style[name] = styles[name];
    }
  }

  , isString = (str) => {
    return (typeof str === 'string') && str.constructor === String;
  }
;
