# Awesome Swiper

[![Test CI][workflows-badge-image]][workflows-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![vite][vite-image]][vite-url]
[![semantic-release][semantic-image]][semantic-url]
[![vitest][vitest-image]][vitest-url]
[![npm license][license-image]][download-url]

* **[awesome-swiper](https://github.com/cycdpo/awesome-swiper) 已经迁移到 @cycjimmy/awesome-swiper**
* awesome-swiper 基于 [swiper 14](https://github.com/nolimits4web/Swiper). ([Releases][release-url] | [Demo][github-pages-url])

[English](https://github.com/cycjimmy/awesome-swiper/blob/main/README.md) | [中 文](https://github.com/cycjimmy/awesome-swiper/blob/main/README_zhCN.md)
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

`swiper` 是 peer 依赖（`^14`），npm 7+ 会自动安装；如果你的包管理器不安装 peer，请自行安装。

## 模块形态

包为 **纯 ESM**：

| 文件 | 格式 | 用途 |
| --- | --- | --- |
| `dist/awesome-swiper.esm.js` | ESM | `main`、`module` 与 `exports` 入口（打包工具、`import`） |
| `dist/awesome-swiper.umd.js` | UMD | 未压缩的浏览器构建，依赖全局 `Swiper` |
| `dist/awesome-swiper.umd.min.js` | UMD | 压缩后的浏览器/CDN 构建，依赖全局 `Swiper` |
| `dist/awesome-swiper.standalone.umd.min.js` | UMD | 压缩构建，已内置 `swiper` 及其样式 |
| `dist/index.d.ts` | 类型 | 供 `types` 与 `exports` 的 `types` 条件使用 |

* 不再提供 CommonJS 产物。Node.js 22.12+ / 24 可以直接 `require()` 这个 ESM 入口，因为这些版本会同步加载 ES 模块。
* 样式不再产出独立 `.css` 文件：CSS Modules 的结果被内联进入口 chunk，并在模块执行时以 `<style>` 注入，因此 `<script>` 标签无需额外文件。详见 `vite.config.ts` 中的 `injectCss` 插件。
* 默认使用 `swiper/bundle` 构造函数，因此 navigation、pagination、mousewheel、autoplay 开箱可用。如需精简，可用 `new AwesomeSwiper(SwiperModule)` 传入自己的构造函数。
* 工具链本身要求 Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`（见 `package.json` 的 `engines` 与 [CONTRIBUTING.md](CONTRIBUTING.md)）。

## 使用
**Awesome Swiper 基于 [Swiper 14](https://github.com/nolimits4web/Swiper)。请先在工程中安装同主版本的 Swiper**

```javascript
import AwesomeSwiper from '@cycjimmy/awesome-swiper'
// 需要 swiper 样式时再引入：
import 'swiper/css/bundle'

const awesomeSwiper = new AwesomeSwiper().init(context)

// 如果需要缩略图
const awesomeSwiperWithThumbs = new AwesomeSwiper()
  .init(context)
  .addThumbs(thumbsContext)
```

`init()` 与 `addThumbs()` 都接受可选的配置对象：`init(context, config,
overlayConfig)` 与 `addThumbs(thumbsContext, thumbsConfig, thumbsExtraConfig)`。

### `new AwesomeSwiper([SwiperModule])`: 新建实例
* 参数:
  * `SwiperModule`: [Object] 可设置自定义的 swiper 构造函数。默认是 `swiper/bundle`（已装好本库用到的模块），任何 swiper 14+ 的构造函数都可以。
* 返回 `awesomeSwiper` 实例对象

### `awesomeSwiper` 实例方法:
#### `init(context [, ...config] [, ...overlayConfig])`: 初始化主要 swiper 实例
* 参数:
  * `context`: [String | Element] swiper 的包裹层。该包裹层的宽高必须提前设定。选择器匹配不到元素时会抛出异常。
  * config: [Object]
    * `speed`: [Number] 切换动画时长（毫秒）。默认 `300`。
    * `loop`: [Boolean] 设为 `true` 开启循环。默认 `false`。swiper 14 需要足够的 slide（至少 `slidesPerView + slidesPerGroup`，开启 `centeredSlides` 时再加一）。
    * `autoplay`: [Number] 自动播放间隔，`0` 表示关闭。默认 `0`。
    * `direction`: [String] 方向，`'horizontal'` 或 `'vertical'`。默认 `'horizontal'`。
    * `themeColor`: [String] 主题色（颜色名或十六进制值）。默认 `''` 为蓝色。
    * `spaceBetween`: [Number] slide 间距（px）。默认 `0`。
    * `slidesPerView`: [Number | 'auto'] 同时显示的 slide 数。默认 `1`。
    * `mousewheel`: [Boolean] 是否启用鼠标滚轮切换。默认 `false`。
    * `autoFixFullImg`: [Boolean] 是否自动修正全屏图片。默认 `false`。提示：有性能开销，非必要不要开启。
    * `autoHeight`: [Boolean] 是否让包裹层高度自适应当前 slide。默认 `false`。
    * `pagination`: [Object] 分页配置，设为 `null` 则不显示分页。
      * `color`: [String] 分页颜色。默认 `''` 为蓝色。
      * `style`: [Object] 自定义分页样式，建议只调整位置。
      * `dynamicBullets`: [Boolean] 幻灯片很多时建议开启，只显示少量圆点。默认 `false`。
    * `navigation`: [Object] 导航配置，设为 `null` 则不显示导航。
      * `color`: [String] 导航颜色。默认 `''` 为蓝色。
      * `size`: [String | Number] 导航尺寸，数字按像素处理。
      * `styles`: [Object] 自定义样式
        * `prev`: [Object] prevEl 的自定义样式。
        * `next`: [Object] nextEl 的自定义样式。
      * `custom`: [Object] 自定义导航元素，默认 `null`。`prevEl` 与 `nextEl` 都必填。
        * `prevEl`: [String | Element] 自定义上一个按钮元素。
        * `nextEl`: [String | Element] 自定义下一个按钮元素。
  * overlayConfig: [Object] 使用 swiper 原生 api 覆盖配置。
* 返回 `awesomeSwiper` 实例对象

#### `addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig])`: 添加缩略图 swiper 实例
* 参数:
  * `thumbsContext`: [String | Element] 缩略图的包裹层。该包裹层的宽高必须提前设定。
  * thumbsConfig: [Object] 按 swiper api 设置。
    * `direction`: [String] 方向，`'horizontal'` 或 `'vertical'`。
    * `spaceBetween`: [Number] slide 间距（px）。默认 `10`。
    * `slidesPerView`: [Number | 'auto'] 同时显示的 slide 数。默认 `'auto'`。
  * thumbsExtraConfig: [Object] 缩略图额外配置。
    * `mouseOverMode`: [Boolean] 设为 `true` 使用鼠标悬停模式。默认 `false`。
    * `autoFixFullImg`: [Boolean] 是否自动修正全屏图片。默认 `false`。提示：有性能开销，非必要不要开启。
* 返回 `awesomeSwiper` 实例对象

#### `setInitialSlide(initialSlide)`: 设置初始 slide 下标
* 参数:
  * `initialSlide`: [Number] 初始 slide 下标。
* 返回 `awesomeSwiper` 实例对象

#### `on(event, handler)`: 添加事件处理
* 等同 `swiper.on(event, handler)`
* 返回 `awesomeSwiper` 实例对象

#### `off(event, handler)`: 移除事件处理
* 等同 `swiper.off(event, handler)`
* 返回 `awesomeSwiper` 实例对象

#### AwesomeSwiper 新增的 css 类
* `.swiper-full-img`: 全屏图片容器。
* `.swiper-full-bg`: 全屏背景容器。
* `.swiper-explain`: 说明文字容器。
* `.active-thumb`: 当前缩略图。

### 快速体验（直接在浏览器中使用）
```html
<link href="https://unpkg.com/swiper@14/swiper-bundle.min.css" rel="stylesheet">

<div id="basic" class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    ...
  </div>
</div>

<script src="https://unpkg.com/swiper@14/swiper-bundle.min.js"></script>
<script src="awesome-swiper.umd.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

或使用内置 swiper 与样式的 standalone 版本：
```html
<div id="basic" class="swiper">
  ...
</div>

<script src="awesome-swiper.standalone.umd.min.js"></script>
<script>
  new AwesomeSwiper().init('#basic');
</script>
```

## CDN
```html
<script src="https://unpkg.com/@cycjimmy/awesome-swiper@4/dist/awesome-swiper.umd.min.js"></script>

<!-- standalone -->
<script src="https://unpkg.com/@cycjimmy/awesome-swiper@4/dist/awesome-swiper.standalone.umd.min.js"></script>
```

## 从 v3 迁移

* 不再提供 CommonJS 产物（`dist/awesome-swiper.cjs`）。打包工具与 Node 22+ 使用 `dist/awesome-swiper.esm.js`，`import` 无需额外配置。
* `swiper` 从 dependencies 改为 peer dependency，版本为 `^14`。`navigation`、`pagination`、`mousewheel`、`autoplay` 相关参数由 `swiper/bundle` 提供，默认构造函数已使用它。
* swiper 9 起把 `.swiper-container` 改名为 `.swiper`；文档与 demo 现在只使用 `class="swiper"`，本库样式也改为 swiper 14 的类名（`.swiper-vertical`、`.swiper-pagination-bullet` 等）。
* `navigation.size` 现在作用于 swiper 14 的 SVG 箭头，而不再是旧的字体图标。
* 选择器匹配不到元素时 `init()` 会直接抛出异常（不再延迟到后续 `TypeError`），`navigation.custom` 要求 `prevEl` 与 `nextEl` 都存在。
* `setInitialSlide()` 使用兼容 loop 的切换方法，开启 `loop: true` 时同样有效。

## 兼容性
* 构建目标为 ES2020（`chrome >= 87`、`safari >= 14`、`firefox >= 78`），与 swiper 14 的浏览器基线一致。
* 不支持 IE。如需兼容 IE，请使用 [awesome-swiper v2](https://github.com/cycjimmy/awesome-swiper/tree/v2)。

开发、测试与发布流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/awesome-swiper
[npm-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/awesome-swiper

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/awesome-swiper
[download-url]: https://npmjs.org/package/@cycjimmy/awesome-swiper

[workflows-badge-image]: https://github.com/cycjimmy/awesome-swiper/workflows/Test%20CI/badge.svg
[workflows-url]: https://github.com/cycjimmy/awesome-swiper/actions/workflows/nodeTestCI.yml

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/awesome-swiper
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/awesome-swiper
[libraries-status-url]: https://libraries.io/github/cycjimmy/awesome-swiper
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fawesome-swiper

[coverage-image]: https://coveralls.io/repos/github/cycjimmy/awesome-swiper/badge.svg?branch=main
[coverage-url]: https://coveralls.io/github/cycjimmy/awesome-swiper?branch=main

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/awesome-swiper
[release-url]: https://github.com/cycjimmy/awesome-swiper/releases

[vite-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/awesome-swiper/dev/vite
[vite-url]: https://vite.dev

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%20%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[vitest-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/awesome-swiper/dev/vitest
[vitest-url]: https://vitest.dev

[license-image]: https://img.shields.io/npm/l/@cycjimmy/awesome-swiper

[github-pages-url]: https://cycjimmy.github.io/awesome-swiper/
