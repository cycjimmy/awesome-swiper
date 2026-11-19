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

* **[awesome-swiper](https://github.com/cycdpo/awesome-swiper) has been renamed to @cycjimmy/awesome-swiper for scoped NPM package.**
* awesome-swiper based on [swiper 14](https://github.com/nolimits4web/Swiper). ([Releases][release-url] | [Demo][github-pages-url])

[English](https://github.com/cycjimmy/awesome-swiper/blob/main/README.md) | [中文](https://github.com/cycjimmy/awesome-swiper/blob/main/README_zhCN.md)
***

## Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/awesome-swiper --save

# or via yarn
$ yarn add @cycjimmy/awesome-swiper
```

`swiper` is a peer dependency (`^14`), so npm 7+ installs it for you; install it
explicitly if your package manager does not install peers.

## Module format

The package is **ESM only**:

| File | Format | Purpose |
| --- | --- | --- |
| `dist/awesome-swiper.esm.js` | ESM | `main`, `module` and `exports` entry (bundlers, `import`) |
| `dist/awesome-swiper.umd.js` | UMD | unminified browser build for `<script>` tags, expects the `Swiper` global |
| `dist/awesome-swiper.umd.min.js` | UMD | minified browser/CDN build, expects the `Swiper` global |
| `dist/awesome-swiper.standalone.umd.min.js` | UMD | minified build with `swiper` and its stylesheet bundled in |
| `dist/index.d.ts` | Types | TypeScript declarations for `types` and the `exports` `types` condition |

* There is no CommonJS bundle. Node.js 22.12+ / 24 can `require()` the ESM entry,
  because those versions load an ES module synchronously.
* The stylesheet is not shipped as a separate `.css` file: the CSS Modules output
  is inlined into the entry chunk and injected as a `<style>` element while the
  module is evaluated, so a plain `<script>` tag needs nothing else. See the
  `injectCss` plugin in `vite.config.ts`.
* `swiper/bundle` is the constructor used by default, so navigation, pagination,
  mousewheel and autoplay work out of the box. Bring your own constructor with
  `new AwesomeSwiper(SwiperModule)` if you prefer the swiper core entry.
* The toolchain itself needs Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`
  (see `engines` in `package.json` and [CONTRIBUTING.md](CONTRIBUTING.md)).

## Usage
**Awesome Swiper based on [Swiper 14](https://github.com/nolimits4web/Swiper). Add Swiper of the same major version to your project first**

```javascript
import AwesomeSwiper from '@cycjimmy/awesome-swiper'
// Only needed when you want the swiper styles:
import 'swiper/css/bundle'

const awesomeSwiper = new AwesomeSwiper().init(context)

// if need thumbs
const awesomeSwiperWithThumbs = new AwesomeSwiper()
  .init(context)
  .addThumbs(thumbsContext)
```

`init()` and `addThumbs()` both accept optional config objects: `init(context,
config, overlayConfig)` and `addThumbs(thumbsContext, thumbsConfig,
thumbsExtraConfig)`.

### `new AwesomeSwiper([SwiperModule])`: Create new instance
* Params:
  * `SwiperModule`: [Object] Set custom swiper constructor. Defaults to `swiper/bundle`, which already installs the modules this wrapper configures. Any swiper 14+ constructor works.
* Return `awesomeSwiper` instance

### Methods of `awesomeSwiper` instance:
#### `init(context [, ...config] [, ...overlayConfig])`: Initialize the main swiper instance:
* Params:
  * `context`: [String | Element] the wrapper of swiper. Height and width of wrapper must be initialized. A selector that matches nothing throws.
  * config: [Object]
    * `speed`: [Number] Duration of transition between slides (in ms). Default `300`.
    * `loop`: [Boolean] Set to `true` to enable loop. Default `false`. Swiper 14 needs enough slides for the loop to work (at least `slidesPerView + slidesPerGroup`, plus one more when `centeredSlides` is on).
    * `autoplay`: [Number] Set autoplay delay. `0` means close. Default `0`.
    * `direction`: [String] Set direction. Could be `'horizontal'` or `'vertical'`. Default `'horizontal'`.
    * `themeColor`: [String] Set theme color for the swiper instance with a color name or a hex value. Default `''` is blue.
    * `spaceBetween`: [Number] Distance between slides in px. Default `0`.
    * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `1`.
    * `mousewheel`: [Boolean] Set to `true` to enable navigation through slides using mouse wheel. Default `false`.
    * `autoFixFullImg`: [Boolean] Set `true` to auto fix full images. Default `false`. Tip: Due to the impact of performance, not necessary not to set it.
    * `autoHeight`: [Boolean] Set to `true` and slider wrapper will adapt its height to the height of the currently active slide. Default `false`.
    * `pagination`: [Object] Set pagination. If you do not want a pagination, set `null`.
      * `color`: [String] Set color for pagination with a color name or a hex value. Default `''` is blue.
      * `style`: [Object] Custom pagination style. Recommended to only adjust the position here.
      * `dynamicBullets`: [Boolean] Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time. Default `false`.
    * `navigation`: [Object] Set navigation. If you do not want a navigation, set `null`.
      * `color`: [String] Set color for navigation with a color name or a hex value. Default `''` is blue.
      * `size`: [String | Number] Set size for navigation. A number is read as pixels.
      * `styles`: [Object] Custom style
        * `prev`: [Object] Custom style for prevEl.
        * `next`: [Object] Custom style for nextEl.
      * `custom`: [Object] Set custom navigation elements. Default `null`. Both `prevEl` and `nextEl` are required.
        * `prevEl`: [String | Element] Custom prev button element.
        * `nextEl`: [String | Element] Custom next button element.
  * overlayConfig: [Object] Use Custom swiper api to overlay config.
* Return `awesomeSwiper` instance

#### `addThumbs(thumbsContext [, ...thumbsConfig] [, ...thumbsExtraConfig])`: Add thumbs swiper instance
* Params:
  * `thumbsContext`: [String | Element] the wrapper of thumbs. Height and width of wrapper must be initialized.
  * thumbsConfig: [Object] You can set it follow swiper api.
    * `direction`: [String] Set direction. Could be `'horizontal'` or `'vertical'`.
    * `spaceBetween`: [Number] Distance between slides in px. Default `10`.
    * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `'auto'`.
  * thumbsExtraConfig: [Object] Extra config for thumbs.
    * `mouseOverMode`: [Boolean] set `true` to use mouse over mode. Default `false`.
    * `autoFixFullImg`: [Boolean] Set `true` to auto fix full images. Default `false`. Tip: Due to the impact of performance, not necessary not to set it.
* Return `awesomeSwiper` instance

#### `setInitialSlide(initialSlide)`: Set index number of initial slide.
* Params:
  * `initialSlide`: [Number] Index number of initial slide.
* Return `awesomeSwiper` instance

#### `on(event, handler)`: Add event handler
* Same as `swiper.on(event, handler)`
* Return `awesomeSwiper` instance

#### `off(event, handler)`: Remove event handler
* Same as `swiper.off(event, handler)`
* Return `awesomeSwiper` instance

#### new css classes in AwesomeSwiper
* `.swiper-full-img`: Full images container.
* `.swiper-full-bg`: Full background container.
* `.swiper-explain`: Explain text container.
* `.active-thumb`: Active slide of thumbs.

### Quick experience(Use in browser)
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

or use standalone, which carries swiper and its styles:
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

## Migration from v3

* The CommonJS bundle (`dist/awesome-swiper.cjs`) is gone. Bundlers and Node 22+
  use `dist/awesome-swiper.esm.js`; there is nothing to configure for `import`.
* `swiper` moved from a dependency to a peer dependency and is now `^14`. The
  `module`, `navigation`, `pagination`, `mousewheel` and `autoplay` parameters
  come from `swiper/bundle`, which the default constructor already uses.
* `swiper` 9 renamed `.swiper-container` to `.swiper`; the markup in the docs and
  the demo now uses `class="swiper"` only. The wrapper styles target the swiper
  14 class names (`.swiper-vertical`, `.swiper-pagination-bullet`, ...).
* `navigation.size` styles the SVG arrows of swiper 14 instead of the old font
  icon.
* `init()` now throws when a selector matches nothing, instead of failing later
  with a `TypeError`, and `navigation.custom` requires both `prevEl` and `nextEl`.
* `setInitialSlide()` uses the loop aware transition, so it also works with
  `loop: true`.

## Compatibility
* Builds target ES2020 (`chrome >= 87`, `safari >= 14`, `firefox >= 78`) and the
  browser baseline of swiper 14.
* IE is not supported. Use [awesome-swiper v2](https://github.com/cycjimmy/awesome-swiper/tree/v2)
  if you need it.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development, test and release
workflow.

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

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[vitest-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/awesome-swiper/dev/vitest
[vitest-url]: https://vitest.dev

[license-image]: https://img.shields.io/npm/l/@cycjimmy/awesome-swiper

[github-pages-url]: https://cycjimmy.github.io/awesome-swiper/
