import nodeListToArray from '@cycjimmy/awesome-js-funcs/esm/typeConversion/nodeListToArray';
import style from './style/main.module.scss';

/**
 * getImgNaturalDimensions
 * @param img
 * @returns {{width: number, height: number}}
 */
export const getImgNaturalDimensions = (img) => {
  let width;
  let height;
  if (img.naturalWidth) {
    width = img.naturalWidth;
    height = img.naturalHeight;
  } else {
    width = img.offsetWidth;
    height = img.offsetHeight;
  }
  return {
    width,
    height,
  };
};

/**
 * fixFullImg
 * @param eContainer
 */
export const fixFullImg = (eContainer) => {
  const eSide = eContainer.querySelector('.swiper-slide');
  // fix empty swiper
  if (!eSide) {
    return;
  }

  const slideClientRect = eSide.getBoundingClientRect();
  const aImgEls = nodeListToArray(eContainer.querySelectorAll('.swiper-full-img > img'));

  aImgEls.forEach((img) => {
    const imgNaturalDimensions = getImgNaturalDimensions(img);
    if (
      slideClientRect.width / slideClientRect.height
      < imgNaturalDimensions.width / imgNaturalDimensions.height
    ) {
      img.classList.add(style.basedOnHeight);
    }
  });
};
