/* eslint no-undef: off */
import Swiper from 'swiper';
import AwesomeSwiper from '../src/index';

describe('basic ui test', () => {
  const wrapper = document.createElement('div');

  wrapper.style.width = '360px';
  wrapper.style.height = '640px';

  const basic = new AwesomeSwiper(Swiper).init(wrapper);

  test('basic test', () => {
    expect(basic.swiper.constructor).toBe(Swiper);
    expect(basic.el.mainContainer).toBe(wrapper);
  });
});
