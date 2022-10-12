/* eslint no-undef: off */
import Swiper from 'swiper';
import AwesomeSwiper from '../src/index';

describe('index test', () => {
  const commonInnerHtml = `
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <a class="swiper-full-bg"
         style="background-image: url(https://cycjimmy.github.io/staticFiles/images/demo/p0001.jpg)"
         href="javascript:"></a>
      <div class="swiper-explain">Slide 1: This is slide 1. This is slide 1. This is slide 1. This is slide 1. This is slide 1. This is slide 1.</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg"
         style="background-image: url(https://cycjimmy.github.io/staticFiles/images/demo/p0002.jpg)"
         href="javascript:"></a>
      <div class="swiper-explain">Slide 2: This is slide 2. This is slide 2. This is slide 2. This is slide 2. This is slide 2. This is slide 2. This is slide 2. This is slide 2. This is slide 2. This is slide 2.</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg"
         style="background-image: url(https://cycjimmy.github.io/staticFiles/images/demo/p0003.jpg)"
         href="javascript:"></a>
      <div class="swiper-explain">Slide 3: This is slide 3. This is slide 3.</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg"
         style="background-image: url(https://cycjimmy.github.io/staticFiles/images/demo/p0004.jpg)"
         href="javascript:"></a>
      <div class="swiper-explain">Slide 4: This is slide 4. This is slide 4. This is slide 4. This is slide 4. This is slide 4. This is slide 4. This is slide 4. This is slide 4. This is slide 4. This is slide 4.</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg"
         style="background-image: url(https://cycjimmy.github.io/staticFiles/images/demo/p0005.jpg)"
         href="javascript:"></a>
      <div class="swiper-explain">Slide 5: This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5. This is slide 5.</div>
    </div>
  </div>`;

  const commonWrapper = document.createElement('div');

  commonWrapper.style.width = '360px';
  commonWrapper.style.height = '640px';
  commonWrapper.innerHTML = commonInnerHtml;

  test('default', () => {
    new AwesomeSwiper().init('body');
  });

  test('basic', () => {
    const basic = new AwesomeSwiper(Swiper).init(commonWrapper);
    expect(basic.swiper.constructor).toBe(Swiper);
    expect(basic.el.mainContainer).toBe(commonWrapper);
  });

  test('multi params', () => {
    new AwesomeSwiper(Swiper)
      .init(commonWrapper, {
        speed: 300,
        loop: true,
        autoplay: 5e3,
        themeColor: 'white',
        autoFixFullImg: true,
      });
  });

  test('pagination', () => {
    new AwesomeSwiper(Swiper).init(commonWrapper, {
      pagination: null,
    });

    new AwesomeSwiper(Swiper).init(commonWrapper, {
      pagination: {
        color: 'white',
        style: {
          backgroundColor: 'rgba(255, 255, 255, .4)',
        },
      },
    });
  });

  test('navigation', () => {
    const customEl = document.createElement('div');

    new AwesomeSwiper(Swiper).init(commonWrapper, {
      navigation: null,
    });

    new AwesomeSwiper(Swiper).init(commonWrapper, {
      navigation: {
        color: 'white',
        size: 20,
        styles: {
          prev: {
            backgroundColor: 'rgba(255, 255, 255, .4)',
          },
          next: {
            backgroundColor: 'rgba(255, 255, 255, .4)',
          },
        },
      },
    });

    new AwesomeSwiper(Swiper).init(commonWrapper, {
      navigation: {
        size: '20px',
      },
    });

    new AwesomeSwiper(Swiper).init(commonWrapper, {
      navigation: {
        custom: {
          prevEl: 'body',
          nextEl: customEl,
        },
      },
    });

    new AwesomeSwiper(Swiper).init(commonWrapper, {
      navigation: {
        custom: {
          prevEl: customEl,
          nextEl: 'body',
        },
      },
    });
  });

  test('thumb', () => {
    const thumbsWrapper = document.createElement('div');
    thumbsWrapper.style.width = '360px';
    thumbsWrapper.style.height = '100px';
    thumbsWrapper.innerHTML = commonInnerHtml;

    new AwesomeSwiper(Swiper)
      .init(commonWrapper)
      .addThumbs(thumbsWrapper);

    new AwesomeSwiper(Swiper)
      .init(commonWrapper)
      .addThumbs('body', {
        slidesPerView: 5,
      }, {
        autoFixFullImg: true,
      });
  });
});
