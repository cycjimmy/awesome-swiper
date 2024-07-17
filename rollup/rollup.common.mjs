/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint import/extensions: ["error", "ignorePackages", {"js": off}] */
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import externals from 'rollup-plugin-node-externals';

import myBanner from '@cycjimmy/config-lib/esm/chore/myBanner.js';
import terserOption from '@cycjimmy/config-lib/esm/terser/4.x/production.js';

import pkg from '../package.cjs';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEPLOYMENT = process.env.NODE_ENV === 'deployment';

export const input = './src/index.js';
export const inputForStandalone = './src/standalone.js';
export const name = 'AwesomeSwiper';
export const banner = myBanner(pkg);

export const pluginsWithoutExternals = [
  json(),
  postcss({
    modules: {
      generateScopedName: IS_PRODUCTION ? '[hash:base64:10]' : '[name]__[local]',
    },
    autoModules: true,
    minimize: true,
    plugins: [autoprefixer],
  }),
  eslint({
    fix: true,
    exclude: [
      'node_modules/**',
      '**/*.(css|scss)',
    ],
  }),
  resolve(),
  babel({ babelHelpers: 'bundled' }),
];

export const plugins = [
  externals({
    deps: false,
    include: /^swiper/,
  }),
  ...pluginsWithoutExternals,
];

export const globalsForOutput = {
  swiper: 'Swiper',
};

export const terserPlugins = IS_PRODUCTION && terser(terserOption);
