import AwesomeSwiper from '../src/index';

describe('ui spec', () => {
  const wrapper = document.createElement('div');

  wrapper.style.width = '360px';
  wrapper.style.height = '640px';

  const basic = new AwesomeSwiper().init(wrapper);

  test('basic test', () => {
    expect(basic.el.mainContainer).toBe(wrapper);
  });
});
