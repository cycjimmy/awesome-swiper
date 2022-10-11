# Awesome Swiper

![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

* **[awesome-swiper](https://github.com/cycdpo/awesome-swiper) has been renamed to @cycjimmy/awesome-swiper for scoped NPM package.**
* awesome-swiper based on [swiper 5+](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycjimmy/awesome-swiper/releases) | [Demo](https://cycjimmy.github.io/awesome-swiper/))

[English](https://github.com/cycjimmy/awesome-swiper/blob/main/README.md) | [中文](https://github.com/cycjimmy/awesome-swiper/blob/main/README_zhCN.md)
***

## How to use
### Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/awesome-swiper --save

# or via yarn
$ yarn add @cycjimmy/awesome-swiper
```

### Usage
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

#### `AwesomeSwiper()` params:
* `SwiperModule`: [Object] Set custom swiper constructor. Make sure the swiper version is 5+.

#### `AwesomeSwiper().init()` params:
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

#### `AwesomeSwiper().addThumbs()` params:
* `thumbsContext`: [String | Element] the wrapper of thumbs. Height and width of wrapper must be initialized.
* thumbsConfig: [Object] You can set it follow swiper api.
  * `direction`: [String] Set direction. Could be `'horizontal'` or `'vertical'`.
  * `spaceBetween`: [Number] Distance between slides in px. Default `10`.
  * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `'auto'`.
* thumbsExtraConfig: [Object] Extra config for thumbs.
  * `mouseOverMode`: [Boolean] set `true` to use mouse over mode. Default `false`.
  * `autoFixFullImg`: [Boolean] Set `true` to auto fix full images. Default `false`. Tip: Due to the impact of performance, not necessary not to set it.

#### new css classes in AwesomeSwiper
* `.swiper-full-img`: Full images container.
* `.swiper-full-bg`: Full background container.
* `.swiper-explain`: Explain text container.
* `.active-thumb`: Active slide of thumbs.

### Quick experience(Use in browser)
```html
<link href="swiper.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    ...
  </div>
</div>

<script src="swiper.min.js"></script>
<script src="awesome-swiper.umd.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

or use standalone:
```html
<div id="basic" class="swiper-container">
  ...
</div>

<script src="awesome-swiper.standalone.umd.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

```html
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/awesome-swiper@3/dist/awesome-swiper.umd.min.js"></script>

// standalone
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/awesome-swiper@3/dist/awesome-swiper.standalone.umd.min.js"></script>
```

## Compatibility
* chrome >= 49
* safari >= 11
* firefox >= 31
* ios >= 11
* android >= 7
* Samsung >= 5

**Note: IE is not supported. If you need to be compatible with IE, please return to [awesome-swiper](https://github.com/cycdpo/awesome-swiper)**


<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/awesome-swiper
[npm-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/awesome-swiper

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/awesome-swiper
[download-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/awesome-swiper
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/awesome-swiper

[workflows-badge-image]: https://github.com/cycjimmy/awesome-swiper/workflows/Test%20CI/badge.svg

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/awesome-swiper
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/awesome-swiper
[libraries-status-url]: https://libraries.io/github/cycjimmy/awesome-swiper
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fawesome-swiper

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/awesome-swiper
[release-url]: https://github.com/cycjimmy/awesome-swiper/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/awesome-swiper/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/awesome-swiper

[github-pages-url]: https://cycjimmy.github.io/awesome-swiper/
