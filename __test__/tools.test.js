/* eslint no-undef: off */
import {getImgNaturalDimensions, fixFullImg} from '../src/tools';

describe('tools test', () => {
  test('getImgNaturalDimensions', () => {
    const testImg = new Image();
    const testImgDimensions = getImgNaturalDimensions(testImg);
    expect(testImgDimensions.width).toBe(0);
    expect(testImgDimensions.height).toBe(0);
  });

  test('fixFullImg', () => {
    const wrapper = document.createElement('div');

    wrapper.style.width = '360px';
    wrapper.style.height = '640px';
    wrapper.innerHTML = `
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <a class="swiper-full-img" href="javascript:">
         <img src="https://cycjimmy.github.io/staticFiles/images/demo/p0001.jpg" alt="">
      </a>
    </div>
  </div>`;

    fixFullImg(wrapper);
  });
});
