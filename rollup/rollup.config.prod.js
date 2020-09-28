import pkg from '../package.json';

import {banner, input, name, plugins, terserPlugins} from './rollup.common';

export default [
  {
    external: ['swiper'],
    globals: {
      'swiper': 'Swiper'
    },
    input,
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ],
    plugins
  },
  {
    external: ['swiper'],
    globals: {
      'swiper': 'Swiper'
    },
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner
    },
    plugins: [...plugins, terserPlugins]
  },
  {
    input,
    output: {
      name,
      file: pkg['browser:standalone'],
      format: 'umd',
      banner
    },
    plugins: [...plugins, terserPlugins]
  }
];
