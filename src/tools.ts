import nodeListToArray from '@cycjimmy/awesome-js-funcs/typeConversion/nodeListToArray'

import style from './style/main.module.scss'

export interface ImgNaturalDimensions {
  width: number
  height: number
}

/**
 * getImgNaturalDimensions
 */
export function getImgNaturalDimensions(img: HTMLImageElement): ImgNaturalDimensions {
  let width: number
  let height: number

  if (img.naturalWidth) {
    width = img.naturalWidth
    height = img.naturalHeight
  }
  else {
    width = img.offsetWidth
    height = img.offsetHeight
  }

  return {
    width,
    height,
  }
}

/**
 * fixFullImg
 */
export function fixFullImg(eContainer: HTMLElement): void {
  const eSide = eContainer.querySelector('.swiper-slide')

  // fix empty swiper
  if (!eSide) {
    return
  }

  const slideClientRect = eSide.getBoundingClientRect()
  const aImgEls = nodeListToArray(
    eContainer.querySelectorAll<HTMLImageElement>('.swiper-full-img > img'),
  )

  aImgEls.forEach((img) => {
    const imgNaturalDimensions = getImgNaturalDimensions(img)

    if (
      slideClientRect.width / slideClientRect.height
      < imgNaturalDimensions.width / imgNaturalDimensions.height
    ) {
      img.classList.add(style.basedOnHeight)
    }
  })
}
