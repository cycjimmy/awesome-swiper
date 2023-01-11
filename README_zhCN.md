# Awesome Swiper

![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

* **[awesome-swiper](https://github.com/cycdpo/awesome-swiper) 已经迁移到 @cycjimmy/awesome-swiper**
* awesome-swiper 基于 [swiper 5+](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycjimmy/awesome-swiper/releases) | [Demo](https://cycjimmy.github.io/awesome-swiper/))


[English](https://github.com/cycjimmy/awesome-swiper/blob/main/README.md) | [中文](https://github.com/cycjimmy/awesome-swiper/blob/main/README_zhCN.md)
***

## 安装
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/awesome-swiper --save

# or via yarn
$ yarn add @cycjimmy/awesome-swiper
```

## 使用
**Awesome Swiper 基于 [Swiper 5+](https://github.com/nolimits4web/Swiper). 首先将 swiper 加入你的工程**

```javascript
import Swiper from 'swiper';
import AwesomeSwiper from '@cycjimmy/awesome-swiper';

// 或者
const Swiper = require('swiper');
const AwesomeSwiper = require('@cycjimmy/awesome-swiper');
```

```javascript
const awesomeSwiper = new AwesomeSwiper([SwiperModule]).init(context [, ...config] [, ...overlayConfig]);

// 如果需要缩略图
const awesomeSwiper = new AwesomeSwiper([SwiperModule])
                        .init(context [, ...config] [, ...overlayConfig])
                        .addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig]);
```

### `new AwesomeSwiper([SwiperModule])`: 新建实例
* 参数:
  * `SwiperModule`: [Object] 可设置自定义的 swiper 构造函数. 注意确保swiper版本为5以上
* 返回 `awesomeSwiper` 实例对象

### `awesomeSwiper` 实例方法:
#### `init(context [, ...config] [, ...overlayConfig])`: 初始化主要swiper实例
* 参数:
  * `context`: [String | Element] swiper的包裹层. 该包裹层的宽高大小必须提前设定.
  * config: [Object]
    * `speed`: [Number] 设置slide切换速度(单位:毫秒). 默认值为 `300`.
    * `loop`: [Boolean] 设为 `true` 来允许循环播放. 默认值为 `false`.
    * `autoplay`: [Number] 设置自动播放延迟的毫秒数. `0` 表示关闭自动播放. 默认值为 `0`.
    * `direction`: [String] 设置方向. 可选项: `'horizontal'` 和 `'vertical'`. 默认为 `'horizontal'`
    * `themeColor`: [String] 设置swiper实例的主题颜色（可使用颜色名称、十六进制值等）. 默认为蓝色.
    * `spaceBetween`: [Number] 每个slide之前的距离, 单位为px. 默认值为 `0`.
    * `slidesPerView`: [Number | 'auto'] 视框中能同时看到slide的数量. 默认值为 `1`.
    * `mousewheel`: [Boolean] 设为 `true` 来允许通过鼠标滚轮控制. 默认值为 `false`.
    * `autoFixFullImg`: [Boolean] 设置 `true` 来自动适应满图片. 默认值为 `false`. 提示: 由于对性能有影响, 非必要情况请勿设置.
    * `autoHeight`: [Boolean] 设置 `true` 时，wrapper和container会随着当前slide的高度而发生变化. 默认值为 `false`.
    * `pagination`: [Object] 设置分页器. 如果你不想要分页器, 将其设为 `null`.
      * `color`: [String] 设置分页器的颜色（可使用颜色名称、十六进制值等）. 默认为蓝色.
      * `dynamicBullets`: [Boolean] 动态分页器. 默认值为 `false`. 查看[Swiper Pagination](http://idangero.us/swiper/api/#pagination)
      * `style`: [Object] 自定义分页器样式. 建议再此只对位置样式进行调整.
    * `navigation`: [Object] 设置导航按钮. 如果你不想要导航按钮, 将其设为 `null`.
      * `color`: [String] 设置导航按钮的颜色（可使用颜色名称、十六进制值等）. 默认为蓝色.
      * `size`: [String | Number] 设置导航按钮的尺寸
      * `styles`: [Object] 自定义样式
        * `prev` [Object] 向前按钮的自定义样式.
        * `next` [Object] 向后按钮的自定义样式.
      * `custom`: [Object] 设置自定义的导航按钮元素. 默认值为 `null`.
        * `prevEl`: [String | Element] 自定义向前按钮元素.
        * `nextEl`: [String | Element] 自定义向后按钮元素.
  * overlayConfig: [Object] 使用自定义的 swiper api 设置来覆盖.
* 返回 `awesomeSwiper` 实例对象

#### `addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig])`: 添加缩略图swiper实例
* 参数: 
  * `thumbsContext`: [String | Element] 缩略图的包裹层. 该包裹层的宽高大小必须提前设定.
  * thumbsConfig: [Object] 可参照 swiper api 进行设置
    * `direction`: [String] 设置方向. 可选项: `'horizontal'` 和 `'vertical'`.
    * `spaceBetween`: [Number] 每个slide之前的距离, 单位为px. 默认值为 `10`.
    * `slidesPerView`: [Number | 'auto'] 视框中能同时看到slide的数量. 默认值为 `'auto'`.
  * thumbsExtraConfig: [Object] 缩略图的额外配置项.
    * `mouseOverMode`: [Boolean] 设置 `true` 来使用mouseover模式. 默认值为 `false`.
    * `autoFixFullImg`: [Boolean] 设置 `true` 来自动适应满图片. 默认值为 `false`. 提示: 由于对性能有影响, 非必要情况请勿设置.
* 返回 `awesomeSwiper` 实例对象

#### `setInitialSlide(initialSlide)`: 设定初始slide的索引
* 参数:
  * `initialSlide`: [Number] 初始slide的索引
* 返回 `awesomeSwiper` 实例对象

#### `on(event, handler)`: 添加事件处理器
* 同`swiper.on(event, handler)`
* 返回 `awesomeSwiper` 实例对象

#### `off(event, handler)`: 移除事件处理器
* 同`swiper.off(event, handler)`
* 返回 `awesomeSwiper` 实例对象

### AwesomeSwiper中新增的css类
* `.swiper-full-img`: 满照片容器.
* `.swiper-full-bg`: 满背景容器.
* `.swiper-explain`: 解释说明文字容器.
* `.active-thumb`: 正处在激活状态的缩略图.

### 快速体验（在浏览器中使用）
```html
<link href="swiper.min.css" rel="stylesheet">

<div id="basic" class="swiper swiper-container">
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

或者使用独立版本:
```html
<div id="basic" class="swiper swiper-container">
  ...
</div>

<script src="awesome-swiper.standalone.umd.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

## CDN
```html
<script src="https://unpkg.com/npm/@cycjimmy/awesome-swiper@3/dist/awesome-swiper.umd.min.js"></script>

// 独立版本
<script src="https://unpkg.com/npm/@cycjimmy/awesome-swiper@3/dist/awesome-swiper.standalone.umd.min.js"></script>
```

## 兼容性
* chrome >= 49
* safari >= 11
* firefox >= 31
* ios >= 11
* android >= 7
* Samsung >= 5

**注意: 不支持IE，如需兼容IE，请退回到[awesome-swiper](https://github.com/cycdpo/awesome-swiper)**

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/awesome-swiper
[npm-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/awesome-swiper

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/awesome-swiper
[download-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper

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
