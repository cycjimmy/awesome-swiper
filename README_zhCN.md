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

awesome-swiper 基于 [swiper 4+](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycdpo/awesome-swiper/releases) | [Demo](https://cycdpo.github.io/awesome-swiper/))


[English](https://github.com/cycdpo/awesome-swiper/blob/master/README.md) | [中文](https://github.com/cycdpo/awesome-swiper/blob/master/README_zhCN.md)
***

## 安装
```shell
# via npm
$ npm install awesome-swiper --save

# or via yarn
$ yarn add awesome-swiper
```

## 使用
**Awesome Swiper 基于 [Swiper 4+](https://github.com/nolimits4web/Swiper). 首先将 swiper 加入你的工程**

```javascript
import Swiper from 'swiper';
import AwesomeSwiper from 'awesome-swiper';

// 或者
const Swiper = require('swiper');
const AwesomeSwiper = require('awesome-swiper');
```

```javascript
let awesomeSwiper = new AwesomeSwiper([SwiperModule]).init(context [, ...config] [, ...overlayConfig]);

// 如果需要缩略图
let awesomeSwiper = new AwesomeSwiper([SwiperModule])
                        .init(context [, ...config] [, ...overlayConfig])
                        .addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig]);
```

### `AwesomeSwiper()` 参数:
* `SwiperModule`: [Object] 可设置自定义的 swiper 构造函数. 注意确保swiper版本为4以上

### `AwesomeSwiper().init()` 参数:
* `context`: [String | Element] swiper的包裹层. 该包裹层的宽高大小必须提前设定.
* config: [Object]
  * `speed`: [Number] 设置slide切换速度(单位:毫秒). 默认值为 `300`.
  * `loop`: [Boolean] 设为 `true` 来允许循环播放. 默认值为 `false`.
  * `autoplay`: [Number] 设置自动播放延迟的毫秒数. `0` 表示关闭自动播放. 默认值为 `0`.
  * `direction`: [String] 设置方向. 可选项: `'horizontal'` 和 `'vertical'`. 默认为 `'horizontal'`
  * `spaceBetween`: [Number] 每个slide之前的距离, 单位为px. 默认值为 `0`.
  * `slidesPerView`: [Number | 'auto'] 视框中能同时看到slide的数量. 默认值为 `1`.
  * `mousewheel`: [Boolean] 设为 `true` 来允许通过鼠标滚轮控制. 默认值为 `false`.
  * `autoFixFullImg`: [Boolean] 设置 `true` 来自动适应满图片. 默认值为 `false`. 提示: 由于对性能有影响, 非必要情况请勿设置.
  * `pagination`: [Object] 设置分页器. 如果你不想要分页器, 将其设为 `null`.
    * `color`: [String] `'default'` 默认颜色是蓝色. 你也可以设置`'black'` 或者 `'white'` 或者嵌入自定义样式
    * `dynamicBullets`: [Boolean] 动态分页器. 默认值为 `false`. 查看[Swiper Pagination](http://idangero.us/swiper/api/#pagination)
    * `style`: [Object] 自定义分页器样式. 建议再此只对位置样式进行调整.
  * `navigation`: [Object] 设置导航按钮. 如果你不想要导航按钮, 将其设为 `null`.
    * `color`: [String] `'default'` 默认颜色是蓝色. 你也可以设置`'black'` 或者 `'white'`
    * `styles`: [Object] 自定义样式
      * `prev` [Object] 向前按钮的自定义样式.
      * `next` [Object] 向后按钮的自定义样式.
    * `custom`: [Object] 设置自定义的导航按钮元素. 默认值为 `null`.
      * `prevEl`: [String | Element] 自定义向前按钮元素.
      * `nextEl`: [String | Element] 自定义向后按钮元素.
* overlayConfig: [Object] 使用自定义的 swiper api 设置来覆盖.

### `AwesomeSwiper().addThumbs()` 参数:
* `thumbsContext`: [String | Element] 缩略图的包裹层. 该包裹层的宽高大小必须提前设定.
* thumbsConfig: [Object] 可参照 swiper api 进行设置
  * `direction`: [String] 设置方向. 可选项: `'horizontal'` 和 `'vertical'`.
  * `spaceBetween`: [Number] 每个slide之前的距离, 单位为px. 默认值为 `10`.
  * `slidesPerView`: [Number | 'auto'] 视框中能同时看到slide的数量. 默认值为 `'auto'`.
* thumbsExtraConfig: [Object] 缩略图的额外配置项.
  * `mouseOverMode`: [Boolean] 设置 `true` 来使用mouseover模式. 默认值为 `false`.
  * `autoFixFullImg`: [Boolean] 设置 `true` 来自动适应满图片. 默认值为 `false`. 提示: 由于对性能有影响, 非必要情况请勿设置.

### AwesomeSwiper中新增的css类
* `.swiper-full-img`: 满照片容器.
* `.swiper-explain`: 解释说明文字容器.
* `.active-thumb`: 正处在激活状态的缩略图.

## 在浏览器中使用
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

或者使用独立版本:
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

**务必使用对应版本的JS和CSS文件**

## CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.min.css">
<script src="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.min.js"></script>

// 独立版本
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.standalone.min.css">
<script src="https://cdn.jsdelivr.net/npm/awesome-swiper@1/build/AwesomeSwiper.standalone.min.js"></script>
```

## 兼容性
* chrome >= 46
* safari >= 8
* firefox >= 40
* ie >= 11
* ios >= 8
* android >= 4.4

