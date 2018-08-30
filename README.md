# Awesome Swiper

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/awesome-swiper.svg?style=flat-square
[npm-url]: https://npmjs.org/package/awesome-swiper
[travis-image]: https://img.shields.io/travis/cycdpo/awesome-swiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/awesome-swiper
[david-image]: https://img.shields.io/david/cycdpo/awesome-swiper.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/awesome-swiper
[david-dev-image]: https://david-dm.org/cycdpo/awesome-swiper/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/awesome-swiper?type=dev
[download-image]: https://img.shields.io/npm/dm/awesome-swiper.svg?style=flat-square
[download-url]: https://npmjs.org/package/awesome-swiper
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/awesome-swiper/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/awesome-swiper
[license-image]: https://img.shields.io/npm/l/awesome-swiper.svg?style=flat-square

awesome-swiper based on [swiper 4+](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycdpo/awesome-swiper/releases) | [Demo](https://cycdpo.github.io/awesome-swiper/))

[English](https://github.com/cycdpo/awesome-swiper/blob/master/README.md) | [中文](https://github.com/cycdpo/awesome-swiper/blob/master/README_zhCN.md)
***

## Install
```shell
# via npm
$ npm install awesome-swiper --save

# or via yarn
$ yarn add awesome-swiper
```

## Usage
**Awesome Swiper based on [Swiper 4+](https://github.com/nolimits4web/Swiper). Add Script of swiper in your project first**

```javascript
import Swiper from 'swiper';
import AwesomeSwiper from 'awesome-swiper';

// OR
const Swiper = require('swiper');
const AwesomeSwiper = require('awesome-swiper');
```

```javascript
let awesomeSwiper = new AwesomeSwiper([SwiperModule]).init(context [, ...config] [, ...overlayConfig]);

// if need thumbs
let awesomeSwiper = new AwesomeSwiper([SwiperModule])
                        .init(context [, ...config] [, ...overlayConfig])
                        .addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig]);
```

### `AwesomeSwiper()` params:
* `SwiperModule`: [Object] Set custom swiper constructor. Make sure the swiper version is 4+.

### `AwesomeSwiper().init()` params:
* `context`: [String | Element] the wrapper of swiper. Height and width of wrapper must be initialized.
* config: [Object]
  * `speed`: [Number] Duration of transition between slides (in ms). Default `300`.
  * `loop`: [Boolean] Set to `true` to enable loop. Default `false`.
  * `autoplay`: [Number] Set autoplay delay. `0` means close. Default `0`.
  * `direction`: [String] Set direction. Could be `'horizontal'` or `'vertical'`. Default `'horizontal'`.
  * `spaceBetween`: [Number] Distance between slides in px. Default `0`.
  * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `1`.
  * `mousewheel`: [Boolean] Set to `true` to enable navigation through slides using mouse wheel. Default `false`.
  * `autoFixFullImg`: [Boolean] Set `true` to auto fix full images. Default `false`. Tip: Due to the impact of performance, not necessary not to set it.
  * `pagination`: [Object] Set pagination. If you do not want a pagination, set `null`.
    * `color`: [String] `'default'` is blue. You also can set `'black'` or `'white'` and embed your own style
    * `style`: [Object] Custom pagination style. Recommended to only adjust the position here.
    * `dynamicBullets`: [Boolean] Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time. Default `false`. See [Swiper Pagination](http://idangero.us/swiper/api/#pagination)
  * `navigation`: [Object] Set navigation. If you do not want a navigation, set `null`.
    * `color`: [String] `'default'` is blue. You also can set `'black'` or `'white'`
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
* `.swiper-explain`: Explain text container.
* `.active-thumb`: Active slide of thumbs.

## Use in browser
```html
<link href="swiper.min.css" rel="stylesheet">
<link href="AwesomeSwiper.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    ...
  </div>
</div>

<script src="swiper.min.js"></script>
<script src="AwesomeSwiper.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

or use standalone:
```html
<link href="AwesomeSwiper.standalone.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  ...
</div>

<script src="AwesomeSwiper.standalone.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

## CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.min.css">
<script src="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.min.js"></script>

// standalone
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.standalone.min.css">
<script src="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.standalone.min.js"></script>
```

## Compatibility
* chrome >= 46
* safari >= 8
* firefox >= 40
* ie >= 11
* ios >= 8
* android >= 4.4

