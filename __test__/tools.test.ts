import { describe, expect, it, vi } from 'vitest'

import style from '../src/style/main.module.scss'

import { fixFullImg, getImgNaturalDimensions } from '../src/tools'

describe('tools', () => {
  it('returns the natural dimensions when the image is loaded', () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'naturalWidth', { value: 800 })
    Object.defineProperty(img, 'naturalHeight', { value: 600 })

    expect(getImgNaturalDimensions(img)).toEqual({ width: 800, height: 600 })
  })

  it('falls back to the rendered dimensions', () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'offsetWidth', { value: 320 })
    Object.defineProperty(img, 'offsetHeight', { value: 240 })

    expect(getImgNaturalDimensions(img)).toEqual({ width: 320, height: 240 })
  })

  it('ignores an empty swiper', () => {
    const container = document.createElement('div')

    expect(() => fixFullImg(container)).not.toThrow()
  })

  it('marks images that are narrower than their slide', () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a class="swiper-full-img" href="javascript:"><img src="a.jpg" alt=""></a>
        </div>
      </div>`

    const slide = container.querySelector('.swiper-slide')
    vi.spyOn(slide as Element, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 200,
      top: 0,
      left: 0,
      right: 100,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect)

    const img = container.querySelector('img') as HTMLImageElement
    Object.defineProperty(img, 'naturalWidth', { value: 800 })
    Object.defineProperty(img, 'naturalHeight', { value: 600 })

    fixFullImg(container)

    expect(img.classList.contains(style.basedOnHeight)).toBe(true)
  })
})
