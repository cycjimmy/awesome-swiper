import type { BuildOptions, Plugin, TerserOptions } from 'vite'

import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

import myBanner from '@cycjimmy/config-lib/dist/chore/myBanner.js'
import terserOption from '@cycjimmy/config-lib/dist/terser/4.x/production.js'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

interface PackageJsonMeta {
  name: string
  version: string
  [key: string]: unknown
}

interface LibraryBuildOptions {
  entry: string
  formats: ('es' | 'umd')[]
  fileName: string
  minify?: false | 'terser'
  external?: string[]
  globals?: Record<string, string>
}

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const pkg = createRequire(import.meta.url)('./package.json') as PackageJsonMeta

// config-lib's shared option follows terser 4's legacy `output` key. Vite 8 always
// injects `format` and terser rejects having both, so convert `output` → `format`.
// The assertion is confined to this boundary because config-lib ships no types.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output } as TerserOptions

// Output names are part of the public contract (`main`, `unpkg`, CDN snippets in
// the README and the GitHub release assets), so they are spelled out instead of
// being derived from package.json fields.
const OUTPUT = {
  esm: 'awesome-swiper.esm.js',
  umd: 'awesome-swiper.umd.js',
  umdMin: 'awesome-swiper.umd.min.js',
  standaloneMin: 'awesome-swiper.standalone.umd.min.js',
} as const

// `swiper/bundle` is the only swiper specifier imported by the sources: it
// installs every module on the constructor, which is what pagination,
// navigation, mousewheel and autoplay need. It is external for the ESM and UMD
// builds and bundled for the standalone one.
const SWIPER_BUNDLE = 'swiper/bundle'

// Inlines the emitted CSS assets into the entry chunks as a runtime <style>
// injection, replicating the old rollup-plugin-postcss behavior so UMD script
// tags keep working without a separate CSS file. Implemented as a micro plugin
// because vite-plugin-css-injected-by-js 5.0.2 produces syntactically broken
// unminified output on Vite 8 (Rolldown module comments swallow the collapsed
// single-line injection code).
function injectCss({ banner = null }: { banner?: string | null } = {}): Plugin {
  return {
    name: 'inject-css',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const cssAssets = Object.keys(bundle).filter(name => name.endsWith('.css'))
      if (cssAssets.length === 0)
        return

      const css = cssAssets
        .flatMap((name) => {
          const asset = bundle[name]
          // Only assets can carry CSS; narrowing keeps the access honest.
          if (asset.type !== 'asset')
            return []

          const { source } = asset
          return source instanceof Uint8Array
            ? new TextDecoder().decode(source)
            : String(source)
        })
        .join('\n')
        .replace(/\/\*\$vite\$:\d+\*\//g, '') // strip Vite internal CSS markers
      cssAssets.forEach((name) => {
        delete bundle[name]
      })

      // Kept compact by construction: terser runs at renderChunk (before this
      // generateBundle hook), so this code is never minified afterwards.
      const injectionCode = `;(function(){try{if(typeof document!='undefined'){var e=document.createElement('style');e.appendChild(document.createTextNode(${JSON.stringify(css.trim())}));document.head.appendChild(e)}}catch(t){console.error('inject-css',t)}})();\n`

      const bannerPrefix = banner
        ? `${banner}\n`
        : ''

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry)
          chunk.code = `${bannerPrefix}${injectionCode}${chunk.code}`
      }
    },
  }
}

function libBuild({
  entry,
  formats,
  fileName,
  minify = false,
  external = [],
  globals = {},
}: LibraryBuildOptions): BuildOptions {
  return {
    target: 'es2020',
    // Absolute on purpose: `root` switches to `static/` for the demo build, and
    // a relative `outDir` would then point inside the demo directory.
    outDir: `${projectRoot}dist`,
    // Keep artifacts of previous incremental builds (`npm run build` cleans dist first).
    emptyOutDir: false,
    cssCodeSplit: false,
    // Replicates the old pipeline: JS unminified while the injected CSS is minified.
    cssMinify: true,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: `${projectRoot}${entry}`,
      name: 'AwesomeSwiper',
      formats,
      fileName: () => fileName,
      cssFileName: 'awesome-swiper',
    },
    rolldownOptions: {
      external,
      output: {
        exports: 'default',
        ...(Object.keys(globals).length > 0 && { globals }),
      },
    },
  }
}

const builds: Record<string, BuildOptions> = {
  'esm': libBuild({
    entry: 'src/index.ts',
    formats: ['es'],
    fileName: OUTPUT.esm,
    external: [SWIPER_BUNDLE],
  }),
  'umd': libBuild({
    entry: 'src/index.ts',
    formats: ['umd'],
    fileName: OUTPUT.umd,
    external: [SWIPER_BUNDLE],
    globals: { [SWIPER_BUNDLE]: 'Swiper' },
  }),
  'umd-min': libBuild({
    entry: 'src/index.ts',
    formats: ['umd'],
    fileName: OUTPUT.umdMin,
    minify: 'terser',
    external: [SWIPER_BUNDLE],
    globals: { [SWIPER_BUNDLE]: 'Swiper' },
  }),
  'standalone-umd-min': libBuild({
    entry: 'src/standalone.ts',
    formats: ['umd'],
    fileName: OUTPUT.standaloneMin,
    minify: 'terser',
  }),
}

// The Pages demo is a normal HTML build of static/index.html: `root: 'static'`
// makes `outDir` resolve to `.publish/` and drops index.html at the artifact
// root, where Pages serves it from.
const deploymentBuild: BuildOptions = {
  outDir: `${projectRoot}.publish`,
  emptyOutDir: true,
  target: 'es2020',
}

export default defineConfig(({ command, mode }) => {
  const isDeployment = mode === 'deployment'
  const isServe = command === 'serve'

  if (!isServe && !isDeployment && !(mode in builds))
    throw new Error(`Unknown build mode: ${mode}`)

  const build = builds[mode]

  return {
    // Building (or serving) from static/ keeps the demo at the site root and
    // lets it import src/ directly, so dev and Pages share one page.
    ...((isDeployment || isServe) && { root: 'static' }),
    ...(isDeployment && { base: './' }),
    // Avoid copying static/ (or any other public dir) into the output, and keep
    // `../src` importable from the demo page.
    publicDir: false,
    ...(isServe && {
      server: {
        open: '/index.html',
        fs: {
          allow: [projectRoot],
        },
      },
    }),
    plugins: [
      // The demo build emits real CSS assets; only the library builds inline it.
      ...((isDeployment || isServe)
        ? []
        : [
            injectCss({
              banner: mode === 'umd-min' || mode === 'standalone-umd-min'
                ? myBanner(pkg)
                : null,
            }),
          ]),
    ],
    css: {
      // Inline postcss config keeps the build setup in a single file.
      postcss: {
        plugins: [autoprefixer],
      },
      modules: {
        // Kebab-case class names in SCSS with camelCase JS keys, so the
        // exported `style` shape stays identical to the old rollup builds.
        localsConvention: 'camelCaseOnly',
        generateScopedName: (isServe || isDeployment)
          ? '[name]__[local]' // readable names while debugging the demo
          : '[hash:base64:10]', // same as the old production builds
      },
    },
    ...(isDeployment
      ? { build: deploymentBuild }
      : (build && { build })),
  }
})
