/* eslint import/extensions: ["error", "ignorePackages", {"mjs": off}] */
import pkg from '../package.cjs';

import {
  banner,
  input,
  inputForStandalone,
  name,
  pluginsWithoutExternals, plugins,
  terserPlugins,
  globalsForOutput,
} from './rollup.common.mjs';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' },
    ],
    plugins,
  },
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner,
      exports: 'default',
      globals: globalsForOutput,
    },
    plugins: [...plugins, terserPlugins],
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
      ...pluginsWithoutExternals,
      terserPlugins,
    ],
  },
];
