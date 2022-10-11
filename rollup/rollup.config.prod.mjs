/* eslint import/extensions: ["error", "ignorePackages", {"mjs": off}] */
import pkg from '../package.cjs';

import {
  banner, input, inputForStandalone, name, plugins, terserPlugins, external,
} from './rollup.common.mjs';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' },
    ],
    plugins,
    external,
  },
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner,
      exports: 'default',
      globals: {
        swiper: 'Swiper',
      },
    },
    plugins: [...plugins, terserPlugins],
    external,
  },
  {
    input: inputForStandalone,
    output: {
      name,
      file: pkg['browser:standalone'],
      format: 'umd',
      banner,
      exports: 'default',
    },
    plugins: [
      ...plugins,
      terserPlugins,
    ],
  },
];
