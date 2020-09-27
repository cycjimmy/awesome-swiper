# Awesome Swiper

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@cycjimmy/awesome-swiper.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper
[travis-image]: https://img.shields.io/travis/cycjimmy/awesome-swiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycjimmy/awesome-swiper
[david-image]: https://img.shields.io/david/cycjimmy/awesome-swiper.svg?style=flat-square
[david-url]: https://david-dm.org/cycjimmy/awesome-swiper
[david-dev-image]: https://david-dm.org/cycjimmy/awesome-swiper/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycjimmy/awesome-swiper?type=dev
[download-image]: https://img.shields.io/npm/dm/@cycjimmy/awesome-swiper.svg?style=flat-square
[download-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/@cycjimmy/awesome-swiper/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/awesome-swiper
[license-image]: https://img.shields.io/npm/l/@cycjimmy/awesome-swiper.svg?style=flat-square

* **[awesome-swiper](https://github.com/cycdpo/awesome-swiper) has been renamed to @cycjimmy/awesome-swiper for scoped NPM package.**
* awesome-swiper based on [swiper 5+](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycjimmy/awesome-swiper/releases) | [Demo](https://cycjimmy.github.io/awesome-swiper/))

[English](https://github.com/cycjimmy/awesome-swiper/blob/master/README.md) | [中文](https://github.com/cycjimmy/awesome-swiper/blob/master/README_zhCN.md)
***

## Install
```shell
# via npm
$ npm install @cycjimmy/awesome-swiper --save

# or via yarn
$ yarn add @cycjimmy/awesome-swiper
```

## Usage
**Awesome Swiper based on [Swiper 5+](https://github.com/nolimits4web/Swiper). Add Script of swiper in your project first**

```javascript
import Swiper from 'swiper';
import AwesomeSwiper from '@cycjimmy/awesome-swiper';

// OR
const Swiper = require('swiper');
const AwesomeSwiper = require('@cycjimmy/awesome-swiper');
```

```javascript
const awesomeSwiper = new AwesomeSwiper([SwiperModule]).init(context [, ...config] [, ...overlayConfig]);

// if need thumbs
const awesomeSwiper = new AwesomeSwiper([SwiperModule])
                        .init(context [, ...config] [, ...overlayConfig])
                        .addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig]);
```

### `AwesomeSwiper()` params:
* `SwiperModule`: [Object] Set custom swiper constructor. Make sure the swiper version is 5+.

### `AwesomeSwiper().init()` params:
* `context`: [String | Element] the wrapper of swiper. Height and width of wrapper must be initialized.
* config: [Object]
  * `speed`: [Number] Duration of transition between slides (in ms). Default `300`.
  * `loop`: [Boolean] Set to `true` to enable loop. Default `false`.
  * `autoplay`: [Number] Set autoplay delay. `0` means close. Default `0`.
  * `direction`: [String] Set direction. Could be `'horizontal'` or `'vertical'`. Default `'horizontal'`.
  * `themeColor`: [String] Set theme color for the swiper instance with a color name or a hex value. Default `''` is blue.
  * `spaceBetween`: [Number] Distance between slides in px. Default `0`.
  * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `1`.
  * `mousewheel`: [Boolean] Set to `true` to enable navigation through slides using mouse wheel. Default `false`.
  * `autoFixFullImg`: [Boolean] Set `true` to auto fix full images. Default `false`. Tip: Due to the impact of performance, not necessary not to set it.
  * `pagination`: [Object] Set pagination. If you do not want a pagination, set `null`.
    * `color`: [String] Set color for pagination with a color name or a hex value. Default `''` is blue.
    * `style`: [Object] Custom pagination style. Recommended to only adjust the position here.
    * `dynamicBullets`: [Boolean] Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time. Default `false`. See [Swiper Pagination](http://idangero.us/swiper/api/#pagination)
  * `navigation`: [Object] Set navigation. If you do not want a navigation, set `null`.
    * `color`: [String] Set color for navigation with a color name or a hex value. Default `''` is blue.
    * `size`: [String | Number] Set size for navigation.
    * `styles`: [Object] Custom style
      * `prev`: [Object] Custom style for prevEl.
      * `next`: [Object] Custom style for nextEl.
    * `custom`: [Object] Set custom navigation elements. Default `null`.
      * `prevEl`: [String | Element] Custom prev button element.
      * `nextEl`: [String | Element] Custom next button element.
* overlayConfig: [Object] Use Custom swiper api to overlay config.

### `AwesomeSwiper().addThumbs()` params:
* `thumbsContext`: [String | Element] the wrapper of thumbs. Height and width of wrapper must be initialized.
* thumbsConfig: [Object] You can set it follow swiper api.
  * `direction`: [String] Set direction. Could be `'horizontal'` or `'vertical'`.
  * `spaceBetween`: [Number] Distance between slides in px. Default `10`.
  * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `'auto'`.
* thumbsExtraConfig: [Object] Extra config for thumbs.
  * `mouseOverMode`: [Boolean] set `true` to use mouse over mode. Default `false`.
  * `autoFixFullImg`: [Boolean] Set `true` to auto fix full images. Default `false`. Tip: Due to the impact of performance, not necessary not to set it.

### new css classes in AwesomeSwiper
* `.swiper-full-img`: Full images container.
* `.swiper-full-bg`: Full background container.
* `.swiper-explain`: Explain text container.
* `.active-thumb`: Active slide of thumbs.

## Use in browser
```html
<link href="swiper.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    ...
  </div>
</div>

<script src="swiper.min.js"></script>
<script src="awesome-swiper.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

or use standalone:
```html
<div id="basic" class="swiper-container">
  ...
</div>

<script src="awesome-swiper.standalone.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

## CDN
```html
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/awesome-swiper@2/build/awesome-swiper.min.js"></script>

// standalone
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/awesome-swiper@2/build/awesome-swiper.standalone.min.js"></script>
```

## Compatibility
* chrome >= 49
* safari >= 11
* firefox >= 31
* ios >= 11
* android >= 7
* Samsung >= 5

**Note: IE is not supported. If you need to be compatible with IE, please return to [awesome-swiper](https://github.com/cycdpo/awesome-swiper)**

