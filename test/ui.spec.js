import Swiper from 'swiper';
import AwesomeSwiper from '../standalone/awesome-swiper.standalone.min';

describe('ui spec', () => {
  const wrapper = document.createElement('div');

  wrapper.style.width = '360px';
  wrapper.style.height = '640px';

  const basic = new AwesomeSwiper(Swiper).init(wrapper);

  test('basic test', () => {
    expect(basic.swiper._constructor).toBe(Swiper);
    expect(basic.el.mainContainer).toBe(wrapper);
  });
});
