// style
import 'swiper/dist/css/swiper.css';
import _style from './style/main.scss';

// component
import Swiper from 'swiper';

// template
import isString from 'awesome-js-funcs/judgeBasic/isString';
import addStyles from 'awesome-js-funcs/dom/addStyles';
import siblingFilter from 'awesome-js-funcs/dom/siblingFilter';


export default class AwesomeSwiper {
  constructor() {
    // init mainContainer
    this.el = {
      mainContainer: null,
      thumbsContainer: null,
      pagination: null,
      navigation: {},
    };
    this.swiper = {};
    this.config = {};
  };

  init(container, customMainConfig = {}) {
    this.el.mainContainer = isString(container)
      ? document.querySelector(container)
      : container;

    let mainDefault = {
      loop: false,
      autoplay: 0,
      mousewheel: true,
      pagination: {
        type: 'default'
      },
      navigation: {
        type: 'white',
        styles: {
          nextEl: null,
          prevEl: null
        }
      }
    };

    this.config.mainOrigin = Object.assign({}, mainDefault, customMainConfig);


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

    this.swiper.main = new Swiper(this.el.mainContainer, this.config.main);


    return this;
  };

  addThumbs(thumbsContainer, customThumbsConfig = {}) {
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

    this.config.thumbs = Object.assign({}, thumbsDefault, customThumbsConfig);


    this.swiper.thumbs = new Swiper(this.el.thumbsContainer, this.config.thumbs);

    this.swiper.thumbs.slides[0].classList.add(_style.active);

    this._thumbsCtrl();


    return this;
  };

  _thumbsCtrl() {
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
      el.addEventListener('click', () => {
        // ui change
        siblingFilter(el, _style.active)[0].classList.remove(_style.active);
        this.swiper.thumbs.slides[index].classList.add(_style.active);
        this.swiper.thumbs.slideTo(index);
        this.swiper.main.slideTo(index);
      });
    });
  };

  _initPagination() {
    if (this.config.mainOrigin.pagination) {
      // add to Dom
      this.el.pagination = document.createElement('div');
      this.el.pagination.classList.add('swiper-pagination');
      this.el.mainContainer.appendChild(this.el.pagination);

      // set swiperConfig
      switch (this.config.mainOrigin.pagination.type) {
        case 'case':
          break;

        default:
          this.config.main.pagination = {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          };
      }

      // Fix Explain Space
      this._fixExplainSpace();
    }
  };

  _fixExplainSpace() {
    Array.prototype.slice
      .apply(this.el.mainContainer.querySelectorAll('.swiper-explain'))
      .forEach(el => {
        el.classList.add(_style.bottomSpace);
      });
  }

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

      switch (_navigation.type) {
        case 'white':
          this.el.navigation.nextEl.classList.add('swiper-button-white');
          this.el.navigation.prevEl.classList.add('swiper-button-white');
          break;

        case 'black':
          this.el.navigation.nextEl.classList.add('swiper-button-black');
          this.el.navigation.prevEl.classList.add('swiper-button-black');
          break;

        case 'custom':
          if (_navigation.styles.nextEl) {
            addStyles(this.el.navigation.nextEl, _navigation.styles.nextEl);
          }
          if (_navigation.styles.prevEl) {
            addStyles(this.el.navigation.prevEl, _navigation.styles.prevEl);
          }
          break;
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
};

