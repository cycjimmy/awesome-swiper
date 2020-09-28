import browsersync from 'rollup-plugin-browsersync';
import copy from 'rollup-plugin-copy';

import pkg from '../package.json';

import {input, IS_DEVELOPMENT, IS_DEPLOYMENT, name, plugins, banner, terserPlugins} from './rollup.common';

export default [
  {
    input,
    output: {
      name,
      file: pkg['browser:standalone'],
      format: 'umd',
      banner
    },
    plugins: [
      ...plugins, terserPlugins,
      IS_DEPLOYMENT &&
      copy({
        hook: 'writeBundle',
        targets: [
          {
            src: ['static/**/*', 'dist/**.standalone.umd.min.js'],
            dest: '.publish'
          }
        ]
      }),
      IS_DEVELOPMENT &&
      browsersync({
        server: ['static', 'dist'],
        watch: true
      })
    ]
  }
];
