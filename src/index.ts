import type { SwiperEvents, SwiperOptions } from 'swiper/types'

import addStyles from '@cycjimmy/awesome-js-funcs/dom/addStyles'
import siblingFilter from '@cycjimmy/awesome-js-funcs/dom/siblingFilter'
import isNumber from '@cycjimmy/awesome-js-funcs/judgeBasic/isNumber'
import isString from '@cycjimmy/awesome-js-funcs/judgeBasic/isString'
import nodeListToArray from '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray'
import Swiper from 'swiper/bundle'

// style
import style from './style/main.module.scss'

// services
import { fixFullImg } from './tools'

// static
const ACTIVE_THUMB_CLASS = 'active-thumb'
const STYLE_PROPERTY_NAME = {
  themeColor: '--swiper-theme-color',
  navigationColor: '--swiper-navigation-color',
  navigationSize: '--swiper-navigation-size',
  paginationColor: '--swiper-pagination-color',
}
const THUMBS_DEFAULT_SPACE_BETWEEN = 10

/** A selector or an already resolved element. */
export type ElementInput = string | HTMLElement

/** Inline style object, camel-cased like `element.style` expects it. */
export type StylesRecord = Record<string, string | number>

/**
 * Handler signature of `on()` / `off()` for events Swiper does not know about.
 * Known events are typed through `SwiperEvents`, exactly like Swiper's own
 * `on()` / `off()`, so their extra arguments (`progress`, `direction`, ...) reach
 * the handler.
 */
export type AwesomeSwiperEventHandler = (...args: any[]) => any

export interface PaginationConfig {
  color?: string
  style?: StylesRecord | null
  dynamicBullets?: boolean
}

export interface NavigationStyles {
  prev?: StylesRecord | null
  next?: StylesRecord | null
}

export interface NavigationConfig {
  color?: string
  size?: number | string
  styles?: NavigationStyles
  custom?: {
    prevEl?: ElementInput | null
    nextEl?: ElementInput | null
  } | null
}

export interface AwesomeSwiperMainConfig {
  speed?: number
  loop?: boolean
  /** Autoplay delay in ms. `0` disables autoplay. */
  autoplay?: number
  direction?: 'horizontal' | 'vertical'
  spaceBetween?: number
  slidesPerView?: number | 'auto'
  mousewheel?: boolean
  autoFixFullImg?: boolean
  autoHeight?: boolean
  themeColor?: string
  pagination?: PaginationConfig | null
  navigation?: NavigationConfig | null
}

/**
 * Configuration of the thumbs swiper. Swiper's own options are accepted, the
 * wrapper only defaults `spaceBetween` and `slidesPerView`.
 */
export type ThumbsConfig = SwiperOptions

export interface ThumbsExtraConfig {
  mouseOverMode?: boolean
  autoFixFullImg?: boolean
}

/** `AwesomeSwiperMainConfig` after the defaults were merged in. */
interface ResolvedMainConfig extends AwesomeSwiperMainConfig {
  pagination: PaginationConfig | null
  navigation: NavigationConfig | null
}

interface AwesomeSwiperElements {
  mainContainer: HTMLElement | null
  thumbsContainer: HTMLElement | null
  pagination: HTMLElement | null
  navigation: {
    nextEl: HTMLElement | null
    prevEl: HTMLElement | null
  }
}

interface AwesomeSwiperInstances {
  /** Swiper constructor, replaceable through the `AwesomeSwiper` constructor. */
  constructor: typeof Swiper
  main?: Swiper
  thumbs?: Swiper
}

interface AwesomeSwiperState {
  mainOrigin?: ResolvedMainConfig
  main: SwiperOptions
  thumbs?: ThumbsConfig
  thumbsExtra?: ThumbsExtraConfig
}

export default class AwesomeSwiper {
  emptyDiv: HTMLDivElement

  el: AwesomeSwiperElements

  swiper: AwesomeSwiperInstances

  config: AwesomeSwiperState

  /**
   * AwesomeSwiper constructor
   * @param SwiperModule Custom swiper constructor. Defaults to `swiper/bundle`,
   * which already installs the navigation, pagination, mousewheel and autoplay
   * modules this wrapper configures.
   */
  constructor(SwiperModule?: typeof Swiper) {
    this.emptyDiv = document.createElement('div')

    this.el = {
      mainContainer: null,
      thumbsContainer: null,
      pagination: null,
      navigation: {
        nextEl: null,
        prevEl: null,
      },
    }
    this.swiper = {
      constructor: SwiperModule || Swiper,
    }
    this.config = {
      main: {},
    }
  }

  /**
   * init
   */
  init(
    container: ElementInput,
    customMainConfig: AwesomeSwiperMainConfig = {},
    overlaySwiperConfig: SwiperOptions = {},
  ): this {
    this.el.mainContainer = this.resolveElement(container, 'container')

    const mainDefault: ResolvedMainConfig = {
      speed: 300,
      loop: false,
      autoplay: 0,
      direction: 'horizontal',
      spaceBetween: 0,
      slidesPerView: 1,
      mousewheel: false,
      autoFixFullImg: false,
      autoHeight: false,
      themeColor: '',
      pagination: {
        color: '',
        style: null,
        dynamicBullets: false,
      },
      navigation: {
        color: '',
        size: '',
        styles: {
          prev: null,
          next: null,
        },
        custom: null,
      },
    }

    const mainOrigin: ResolvedMainConfig = {
      ...mainDefault,
      ...customMainConfig,
    }
    this.config.mainOrigin = mainOrigin

    this.config.main = {
      speed: mainOrigin.speed,
      loop: mainOrigin.loop,
      direction: mainOrigin.direction,
      spaceBetween: mainOrigin.spaceBetween,
      slidesPerView: mainOrigin.slidesPerView,
      mousewheel: mainOrigin.mousewheel,
      autoHeight: mainOrigin.autoHeight,
    }

    // set customConfig.autoplay
    if (mainOrigin.autoplay) {
      this.config.main.autoplay = { delay: mainOrigin.autoplay }
    }

    this.initPagination(mainOrigin)
    this.initNavigation(mainOrigin)

    this.config.main = Object.assign(this.config.main, overlaySwiperConfig)
    this.initMainSwiper(mainOrigin)

    return this
  }

  /**
   * addThumbs
   */
  addThumbs(
    thumbsContainer: ElementInput,
    customThumbsConfig: ThumbsConfig = {},
    extraConfig: ThumbsExtraConfig = {},
  ): this {
    const container = this.resolveElement(thumbsContainer, 'thumbsContainer')
    this.el.thumbsContainer = container

    container.classList.add(style.thumbsWrapper)

    // config
    const thumbsDefault: ThumbsConfig = {
      spaceBetween: THUMBS_DEFAULT_SPACE_BETWEEN,
      slidesPerView: 'auto',
    }

    const thumbsExtraDefault: ThumbsExtraConfig = {
      mouseOverMode: false,
    }

    this.config.thumbs = {
      ...thumbsDefault,
      ...customThumbsConfig,
    }
    this.config.thumbsExtra = {
      ...thumbsExtraDefault,
      ...extraConfig,
    }

    const SwiperConstructor = this.swiper.constructor
    const thumbs = new SwiperConstructor(container, this.config.thumbs)
    this.swiper.thumbs = thumbs

    thumbs.slides[0]?.classList.add(ACTIVE_THUMB_CLASS)

    this.thumbsCtrl(this.config.thumbsExtra)

    // fix full img
    if (this.config.thumbsExtra.autoFixFullImg) {
      fixFullImg(container)
    }

    return this
  }

  /**
   * setInitialSlide
   * @param initialSlide Index number of initial slide.
   */
  setInitialSlide(initialSlide: number): this {
    const main = this.swiper.main

    if (main) {
      // `slideTo()` cannot resolve loop indexes, `slideToLoop()` is the loop aware one.
      if (main.params.loop) {
        main.slideToLoop(initialSlide, 0)
      }
      else {
        main.slideTo(initialSlide, 0)
      }
    }

    return this
  }

  /**
   * on
   */
  on<E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E]): this
  on(event: string, handler: AwesomeSwiperEventHandler): this
  on(event: string, handler: AwesomeSwiperEventHandler): this {
    this.swiper.main?.on(event, handler)

    return this
  }

  /**
   * off
   * Without a handler every listener of the event is removed, as in Swiper.
   */
  off<E extends keyof SwiperEvents>(event: E, handler?: SwiperEvents[E]): this
  off(event: string, handler?: AwesomeSwiperEventHandler): this
  off(event: string, handler?: AwesomeSwiperEventHandler): this {
    this.swiper.main?.off(event, handler)

    return this
  }

  /**
   * Resolves a selector or element into a container, failing loudly when the
   * selector matches nothing.
   * @private
   */
  private resolveElement(input: ElementInput, name: string): HTMLElement {
    if (!isString(input)) {
      return input
    }

    const element = document.querySelector<HTMLElement>(input)

    if (!element) {
      throw new Error(`AwesomeSwiper: ${name} "${input}" does not match any element.`)
    }

    return element
  }

  /**
   * Like `resolveElement`, but rejects a missing custom navigation element
   * instead of silently falling back to the main container.
   * @private
   */
  private requireElement(input: ElementInput | null | undefined, name: string): HTMLElement {
    if (!input) {
      throw new Error(`AwesomeSwiper: ${name} is required when custom navigation is used.`)
    }

    return this.resolveElement(input, name)
  }

  /**
   * The main container, which only exists after `init()`.
   * @private
   */
  private get mainContainer(): HTMLElement {
    const container = this.el.mainContainer

    if (!container) {
      throw new Error('AwesomeSwiper: init() has to be called before the swiper is created.')
    }

    return container
  }

  /**
   * initMainSwiper
   * @private
   */
  private initMainSwiper(mainOrigin: ResolvedMainConfig): void {
    const { themeColor, autoFixFullImg } = mainOrigin

    if (themeColor) {
      this.mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.themeColor,
        themeColor,
      )
    }

    const SwiperConstructor = this.swiper.constructor
    this.swiper.main = new SwiperConstructor(this.mainContainer, this.config.main)

    // fix full img
    if (autoFixFullImg) {
      fixFullImg(this.mainContainer)
    }
  }

  /**
   * thumbsCtrl
   * @private
   */
  private thumbsCtrl(thumbsExtraConfig: ThumbsExtraConfig): void {
    const thumbs = this.swiper.thumbs

    if (!thumbs) {
      return
    }

    const activateThumb = (index: number): void => {
      const activeThumb = siblingFilter(thumbs.slides[index], ACTIVE_THUMB_CLASS)[0]
      activeThumb?.classList.remove(ACTIVE_THUMB_CLASS)
      thumbs.slides[index]?.classList.add(ACTIVE_THUMB_CLASS)
    }

    // mainSwiper ctrl
    this.on('slideChange', () => {
      const swiperIndex = this.swiper.main?.realIndex ?? 0

      // ui change
      activateThumb(swiperIndex)
      thumbs.slideTo(swiperIndex)
    })

    nodeListToArray(thumbs.slides).forEach((el, index) => {
      const uiChange = (): void => {
        activateThumb(index)
        thumbs.slideTo(index)

        const main = this.swiper.main

        if (!main) {
          return
        }

        if (main.params.loop) {
          main.slideToLoop(index)
        }
        else {
          main.slideTo(index)
        }
      }

      if (thumbsExtraConfig.mouseOverMode) {
        el.addEventListener('mouseover', uiChange)
        el.addEventListener('touchstart', uiChange)
      }
      else {
        el.addEventListener('click', uiChange)
      }
    })
  }

  /**
   * initPagination
   * @private
   */
  private initPagination(mainOrigin: ResolvedMainConfig): void {
    const { pagination } = mainOrigin

    if (!pagination) {
      return
    }

    const mainContainer = this.mainContainer
    const paginationEl = this.cloneEmptyDiv()
    paginationEl.classList.add('swiper-pagination')
    this.el.pagination = paginationEl
    mainContainer.appendChild(paginationEl)

    // set swiperConfig
    if (pagination.color) {
      mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.paginationColor,
        pagination.color,
      )
    }

    this.config.main.pagination = {
      el: paginationEl,
      clickable: true,
      dynamicBullets: pagination.dynamicBullets,
    }

    // set custom styles
    if (pagination.style) {
      addStyles(paginationEl, pagination.style)
    }

    // Fix Explain Space
    this.fixExplainSpace()
  }

  /**
   * initNavigation
   * @private
   */
  private initNavigation(mainOrigin: ResolvedMainConfig): void {
    const { navigation } = mainOrigin

    if (!navigation) {
      return
    }

    const setSwiperConfig = (): void => {
      this.config.main.navigation = {
        nextEl: this.el.navigation.nextEl,
        prevEl: this.el.navigation.prevEl,
      }
    }

    if (navigation.custom) {
      // Set custom navigation
      const prevCustomEl = this.requireElement(
        navigation.custom.prevEl,
        'navigation.custom.prevEl',
      )
      const nextCustomEl = this.requireElement(
        navigation.custom.nextEl,
        'navigation.custom.nextEl',
      )

      this.el.navigation.prevEl = prevCustomEl
      this.el.navigation.nextEl = nextCustomEl
      prevCustomEl.classList.add(style.customNavigationEl)
      nextCustomEl.classList.add(style.customNavigationEl)

      setSwiperConfig()
      return
    }

    const mainContainer = this.mainContainer

    // add to Dom
    const prevEl = this.cloneEmptyDiv()
    const nextEl = this.cloneEmptyDiv()
    this.el.navigation.prevEl = prevEl
    this.el.navigation.nextEl = nextEl
    prevEl.classList.add('swiper-button-prev')
    nextEl.classList.add('swiper-button-next')

    if (navigation.color) {
      mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.navigationColor,
        navigation.color,
      )
    }

    if (navigation.size) {
      const { size } = navigation
      const navigationSize = isNumber(size)
        ? `${size}px`
        : size
      mainContainer.style.setProperty(
        STYLE_PROPERTY_NAME.navigationSize,
        navigationSize,
      )
    }

    // set custom styles
    if (navigation.styles?.next) {
      addStyles(nextEl, navigation.styles.next)
    }
    if (navigation.styles?.prev) {
      addStyles(prevEl, navigation.styles.prev)
    }

    mainContainer.appendChild(nextEl)
    mainContainer.appendChild(prevEl)
    setSwiperConfig()
  }

  /**
   * fixExplainSpace
   * @private
   */
  private fixExplainSpace(): void {
    nodeListToArray(this.mainContainer.querySelectorAll('.swiper-explain'))
      .forEach((el) => {
        el.classList.add(style.bottomSpace)
      })
  }

  /**
   * cloneEmptyDiv
   * @private
   */
  private cloneEmptyDiv(): HTMLDivElement {
    return this.emptyDiv.cloneNode() as HTMLDivElement
  }
}
