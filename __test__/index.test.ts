import Swiper from 'swiper/bundle'

import { afterEach, describe, expect, it, vi } from 'vitest'

import AwesomeSwiper from '../src/index'

import style from '../src/style/main.module.scss'

const commonInnerHtml = `
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <a class="swiper-full-bg" href="javascript:"></a>
      <div class="swiper-explain">Slide 1</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg" href="javascript:"></a>
      <div class="swiper-explain">Slide 2</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg" href="javascript:"></a>
      <div class="swiper-explain">Slide 3</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg" href="javascript:"></a>
      <div class="swiper-explain">Slide 4</div>
    </div>
    <div class="swiper-slide">
      <a class="swiper-full-bg" href="javascript:"></a>
      <div class="swiper-explain">Slide 5</div>
    </div>
  </div>`

const created: AwesomeSwiper[] = []

function track(instance: AwesomeSwiper): AwesomeSwiper {
  created.push(instance)
  return instance
}

function createWrapper(html = commonInnerHtml, height = '640px'): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.style.width = '360px'
  wrapper.style.height = height
  wrapper.innerHTML = html
  document.body.appendChild(wrapper)
  return wrapper
}

afterEach(() => {
  created.forEach((instance) => {
    instance.swiper.main?.destroy(true, true)
    instance.swiper.thumbs?.destroy(true, true)
  })
  created.length = 0
  document.body.innerHTML = ''
})

describe('awesome swiper', () => {
  it('initializes from a selector', () => {
    const wrapper = createWrapper()
    wrapper.id = 'basic'
    const instance = track(new AwesomeSwiper()).init('#basic')

    expect(instance.el.mainContainer).toBe(wrapper)
    expect(instance.swiper.main).toBeInstanceOf(Swiper)
  })

  it('keeps the injected swiper module', () => {
    const wrapper = createWrapper()
    const instance = track(new AwesomeSwiper(Swiper)).init(wrapper)

    expect(instance.swiper.constructor).toBe(Swiper)
    expect(instance.el.mainContainer).toBe(wrapper)
  })

  it('throws when the selector matches nothing', () => {
    expect(() => new AwesomeSwiper().init('#not-there')).toThrow(/#not-there/)
  })

  it('passes the documented options to swiper', () => {
    const wrapper = createWrapper()
    const instance = track(new AwesomeSwiper(Swiper)).init(wrapper, {
      speed: 500,
      loop: true,
      autoplay: 5e3,
      spaceBetween: 12,
      slidesPerView: 2,
      mousewheel: true,
      themeColor: 'white',
      autoHeight: true,
    })

    expect(wrapper.style.getPropertyValue('--swiper-theme-color')).toBe('white')
    expect(instance.swiper.main?.params.speed).toBe(500)
    expect(instance.swiper.main?.params.spaceBetween).toBe(12)
    // The autoplay module normalizes the object with its own defaults.
    expect(instance.swiper.main?.params.autoplay).toMatchObject({ enabled: true, delay: 5e3 })
    expect(instance.swiper.main?.params.mousewheel).toBeTruthy()
  })

  it('omits autoplay when the delay is 0', () => {
    const instance = track(new AwesomeSwiper(Swiper)).init(createWrapper())

    expect(instance.swiper.main?.params.autoplay).toMatchObject({ enabled: false })
  })

  it('applies an overlay swiper config after the wrapper options', () => {
    const instance = track(new AwesomeSwiper(Swiper)).init(
      createWrapper(),
      { speed: 300 },
      { speed: 900 },
    )

    expect(instance.swiper.main?.params.speed).toBe(900)
  })

  it('adds a pagination element unless it is disabled', () => {
    const wrapper = createWrapper()

    const disabled = track(new AwesomeSwiper(Swiper)).init(wrapper, { pagination: null })
    expect(disabled.el.pagination).toBeNull()
    expect(wrapper.querySelector('.swiper-pagination')).toBeNull()

    const enabled = track(new AwesomeSwiper(Swiper)).init(wrapper, {
      pagination: {
        color: 'white',
        style: { bottom: '10px' },
        dynamicBullets: true,
      },
    })

    expect(enabled.el.pagination).toBeInstanceOf(HTMLElement)
    expect(wrapper.querySelector('.swiper-pagination')).not.toBeNull()
    expect(wrapper.style.getPropertyValue('--swiper-pagination-color')).toBe('white')
    expect(enabled.el.pagination?.style.bottom).toBe('10px')
  })

  it('marks the explain elements with the bottom space class', () => {
    const wrapper = createWrapper()
    track(new AwesomeSwiper(Swiper)).init(wrapper)

    expect(wrapper.querySelector('.swiper-explain')?.classList.contains(style.bottomSpace))
      .toBe(true)
  })

  it('creates the navigation buttons unless it is disabled', () => {
    const wrapper = createWrapper()

    const disabled = track(new AwesomeSwiper(Swiper)).init(wrapper, { navigation: null })
    expect(disabled.el.navigation.nextEl).toBeNull()
    expect(wrapper.querySelector('.swiper-button-next')).toBeNull()

    const enabled = track(new AwesomeSwiper(Swiper)).init(wrapper, {
      navigation: {
        color: '#fff',
        size: 20,
        styles: {
          prev: { opacity: '0.5' },
          next: { opacity: '0.5' },
        },
      },
    })

    expect(wrapper.querySelector('.swiper-button-next')).not.toBeNull()
    expect(wrapper.querySelector('.swiper-button-prev')).not.toBeNull()
    expect(wrapper.style.getPropertyValue('--swiper-navigation-color')).toBe('#fff')
    expect(wrapper.style.getPropertyValue('--swiper-navigation-size')).toBe('20px')
    expect(enabled.el.navigation.nextEl?.style.opacity).toBe('0.5')
  })

  it('accepts a string size for the navigation', () => {
    const wrapper = createWrapper()
    track(new AwesomeSwiper(Swiper)).init(wrapper, {
      navigation: { size: '40px' },
    })

    expect(wrapper.style.getPropertyValue('--swiper-navigation-size')).toBe('40px')
  })

  it('uses custom navigation elements when they are configured', () => {
    const wrapper = createWrapper()
    const prevEl = document.createElement('button')
    const nextEl = document.createElement('button')
    document.body.append(prevEl, nextEl)
    prevEl.id = 'custom-prev'

    const instance = track(new AwesomeSwiper(Swiper)).init(wrapper, {
      navigation: {
        custom: {
          prevEl: '#custom-prev',
          nextEl,
        },
      },
    })

    expect(instance.el.navigation.prevEl).toBe(prevEl)
    expect(instance.el.navigation.nextEl).toBe(nextEl)
    expect(prevEl.classList.contains(style.customNavigationEl)).toBe(true)
    expect(nextEl.classList.contains(style.customNavigationEl)).toBe(true)
  })

  it('rejects incomplete custom navigation', () => {
    const wrapper = createWrapper()

    expect(() => track(new AwesomeSwiper(Swiper)).init(wrapper, {
      navigation: {
        custom: { prevEl: '#missing-prev' },
      },
    })).toThrow(/navigation\.custom\.prevEl/)
  })

  it('syncs the thumbs swiper with the main one', () => {
    const wrapper = createWrapper()
    const thumbsWrapper = createWrapper(commonInnerHtml, '100px')

    const instance = track(new AwesomeSwiper(Swiper))
      .init(wrapper, { pagination: null })
      .addThumbs(thumbsWrapper, { slidesPerView: 5 })

    const thumbs = instance.swiper.thumbs

    expect(thumbs).toBeInstanceOf(Swiper)
    expect(thumbsWrapper.classList.contains(style.thumbsWrapper)).toBe(true)
    expect(thumbs?.slides[0].classList.contains('active-thumb')).toBe(true)

    thumbs?.slides[2].click()

    expect(thumbs?.slides[2].classList.contains('active-thumb')).toBe(true)
    expect(instance.swiper.main?.activeIndex).toBe(2)
  })

  it('supports mouse over thumbs mode', () => {
    const wrapper = createWrapper()
    const thumbsWrapper = createWrapper(commonInnerHtml, '100px')

    const instance = track(new AwesomeSwiper(Swiper))
      .init(wrapper, { pagination: null })
      .addThumbs(thumbsWrapper, { slidesPerView: 5 }, { mouseOverMode: true })

    const thumbs = instance.swiper.thumbs
    thumbs?.slides[3].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))

    expect(thumbs?.slides[3].classList.contains('active-thumb')).toBe(true)
  })

  it('jumps to the initial slide', () => {
    const instance = track(new AwesomeSwiper(Swiper)).init(createWrapper())
    instance.setInitialSlide(2)

    expect(instance.swiper.main?.activeIndex).toBe(2)
  })

  it('does nothing when setInitialSlide is called before init', () => {
    const instance = track(new AwesomeSwiper(Swiper))

    expect(() => instance.setInitialSlide(1)).not.toThrow()
  })

  it('adds and removes event handlers', () => {
    const instance = track(new AwesomeSwiper(Swiper)).init(createWrapper())
    const handler = vi.fn()

    instance.on('slideChange', handler)
    instance.swiper.main?.emit('slideChange')
    expect(handler).toHaveBeenCalledTimes(1)

    instance.off('slideChange', handler)
    instance.swiper.main?.emit('slideChange')
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('is safe to use before init', () => {
    const instance = track(new AwesomeSwiper(Swiper))

    expect(() => instance.on('slideChange', () => {})).not.toThrow()
    expect(() => instance.off('slideChange', () => {})).not.toThrow()
  })

  it('types known events with their swiper arguments', () => {
    const instance = track(new AwesomeSwiper(Swiper)).init(createWrapper())
    const progress: number[] = []
    // The second parameter only compiles while `on()` follows `SwiperEvents`.
    const handler = (_swiper: Swiper, value: number): void => {
      progress.push(value)
    }

    instance.on('progress', handler)
    instance.swiper.main?.emit('progress', 0.5)
    expect(progress).toEqual([0.5])

    instance.off('progress', handler)
    instance.swiper.main?.emit('progress', 0.75)
    expect(progress).toEqual([0.5])
  })

  it('removes every handler of an event when the handler is omitted', () => {
    const instance = track(new AwesomeSwiper(Swiper)).init(createWrapper())
    const first = vi.fn()
    const second = vi.fn()

    instance.on('slideChange', first).on('slideChange', second)
    instance.swiper.main?.emit('slideChange')
    expect(first).toHaveBeenCalledTimes(1)

    // The handler is optional here, exactly as in Swiper.
    instance.off('slideChange')
    instance.swiper.main?.emit('slideChange')
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('accepts any swiper option for the thumbs swiper', () => {
    const instance = track(new AwesomeSwiper(Swiper))
      .init(createWrapper(), { pagination: null })
      .addThumbs(createWrapper(commonInnerHtml, '100px'), { speed: 500 })

    expect(instance.swiper.thumbs?.params.speed).toBe(500)
  })

  it('fixes full images of the main and thumbs swipers', () => {
    const wrapper = createWrapper(`
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a class="swiper-full-img" href="javascript:"><img src="a.jpg" alt=""></a>
        </div>
      </div>`)
    const thumbsWrapper = createWrapper(commonInnerHtml, '100px')

    expect(() => track(new AwesomeSwiper(Swiper))
      .init(wrapper, { autoFixFullImg: true })
      .addThumbs(thumbsWrapper, { slidesPerView: 5 }, { autoFixFullImg: true }))
      .not
      .toThrow()
  })
})
