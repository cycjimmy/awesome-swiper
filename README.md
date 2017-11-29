# Awesome Swiper

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/awesome-swiper.svg?style=flat-square
[npm-url]: https://npmjs.org/package/awesome-swiper
[travis-image]: https://img.shields.io/travis/cycdpo/awesome-swiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/awesome-swiper
[david-image]: https://img.shields.io/david/cycdpo/awesome-swiper.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/awesome-swiper
[david-dev-image]: https://david-dm.org/cycdpo/awesome-swiper/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/awesome-swiper?type=dev
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/awesome-swiper.svg?style=flat-square
[download-url]: https://npmjs.org/package/awesome-swiper
[license-image]: https://img.shields.io/npm/l/awesome-swiper.svg?style=flat-square

awesome-swiper based on [swiper](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycdpo/awesome-swiper/releases) | [Demo](https://cycdpo.github.io/awesome-swiper/))


## Install
```shell
# via npm
$ npm install awesome-swiper --save

# or via yarn
$ yarn add awesome-swiper
```

## Usage
```javascript
import AwesomeSwiper from 'awesome-swiper';

// OR
const AwesomeSwiper = require('awesome-swiper');

let awesomeSwiper = new AwesomeSwiper().init(context [, ...config]);

// if need thumbs
let awesomeSwiper = new AwesomeSwiper()
                        .init(context [, ...config])
                        .addThumbs(thumbsContext [, ...thumbsConfig]);
```

## Use in browser
```html
<link href="AwesomeSwiper.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    <div class="swiper-slide">slide2</div>
    <div class="swiper-slide">slide3</div>
  </div>
</div>

<script src="AwesomeSwiper.min.js"></script>
<script>
  new AwesomeSwiper().init('basic');
</script>
```