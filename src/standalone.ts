/* eslint-disable perfectionist/sort-imports -- the import order is the CSS cascade order */
// Swiper's own stylesheet has to be evaluated first: the library stylesheet is
// imported by `./index` and overrides it, so it has to come second.
import 'swiper/css/bundle'

import AwesomeSwiper from './index'

export default AwesomeSwiper
