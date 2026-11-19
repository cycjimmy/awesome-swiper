# Contributing

The repository is released under the MIT license, and follows a standard Github
development process, using Github tracker for issues and merging pull requests
into main.

## Requirements

* Node.js `^22.22.2 || >=24.15.0`, the same range as `engines` in `package.json`
  (CI runs the test matrix on 22 and 24)
* npm 10+

## Development

```shell
$ npm install
$ npm run dev          # Vite dev server, opens static/index.html
$ npm run type-check   # tsc --noEmit over src, __test__, tasks and the configs
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm run lint:style   # Stylelint for src/**/*.{css,scss}
$ npm test             # Vitest
$ npm run package      # build dist/ and assemble .release/
```

`npm run check` runs the lint, style and type checks plus the tests in one go.

`static/index.html` is the only page: it imports `src/` directly through one
`<script type="module">` block, so the dev server and the GitHub Pages demo share
it. The page uses the `swiper/bundle` constructor, because the sections exercise
navigation, pagination, mousewheel and autoplay. `build:deployment` builds that
same file with `static/` as the Vite root, which is what puts `index.html` at the
root of the `.publish` artifact.

`demo/*.html` are the snippets linked from the demo page. They load the published
standalone build from unpkg, so they are documentation rather than part of the
dev server.

## TypeScript specifics

* `src/index.ts` holds the public configuration types as well, so the emitted
  `dist/index.d.ts` is self-contained: it only imports from `swiper`, never from
  a relative module or a stylesheet.
* `src/shims.d.ts` declares the two untyped surfaces: `*.module.scss` and the
  `@cycjimmy/awesome-js-funcs` helpers this package calls.
* `tsconfig.json` type-checks everything (`noEmit`) and is the config the CI
  `type-check` step uses. `tsconfig.build.json` is the declaration-only config
  that writes `dist/index.d.ts` during the build; `src/standalone.ts` is excluded
  there because a declaration for it would import `swiper/css/bundle`.
* `tasks/*.ts` are executed by Node's built-in type stripping, so they may only
  use syntax that can be erased: no `enum`, `namespace` or constructor parameter
  properties. `erasableSyntaxOnly` enforces this during `type-check`.
* `release.config.js` stays JavaScript on purpose: semantic-release loads it
  through cosmiconfig, whose TypeScript loader resolves `typescript` from
  semantic-release's own install tree (inside the action) rather than from this
  project.

## Build outputs

`npm run build` runs `build:types` (`tsc -p tsconfig.build.json`) and then four
Vite builds, each with its own `--mode`. Vite runs with `emptyOutDir: false`, so
the declarations and the previous files survive:

| File | Format | Purpose |
| --- | --- | --- |
| `awesome-swiper.esm.js` | ESM | `main`, `module` and `exports` entry; `swiper/bundle` stays external |
| `awesome-swiper.umd.js` | UMD | unminified browser build, reads the `Swiper` global |
| `awesome-swiper.umd.min.js` | UMD | minified browser/CDN build with the banner, attached to the release |
| `awesome-swiper.standalone.umd.min.js` | UMD | minified build with `swiper` and its stylesheet bundled in |
| `index.d.ts` | Types | declarations for `types` and the `exports` `types` condition |

`tsc` also emits `tools.d.ts` for the internal helper module. It is not reachable
from the public types, so it is published alongside `index.d.ts` but never loaded
by a consumer.

The CSS Modules output is inlined into the entry chunk by the `injectCss` plugin
in `vite.config.ts`, which is why `dist/` contains no `.css` file. The standalone
entry imports `swiper/css/bundle` before `./index`, so swiper's styles come first.

## Repository settings required by the deployment

The Pages deployment cannot be fully expressed in code, so the switch itself lives in the repository settings:

1. **Settings → Pages → Build and deployment → Source**: select **GitHub Actions**. With *Deploy from a branch* selected, `actions/deploy-pages` refuses to run, because no Pages site is served from the artifact flow.
2. `ACCESS_TOKEN` and the `gh-pages` branch are no longer used: the site is uploaded as an artifact and published with the workflow's own OIDC token, so no stored credential is involved. Both can be removed once the first deployment from `main` has succeeded.

## Repository settings required by the release

1. **npm trusted publisher**: on npmjs.com, open the package settings and add a
   GitHub Actions trusted publisher with repository `cycjimmy/awesome-swiper` and
   workflow `release.yml` (no environment). The release workflow publishes with
   `id-token: write`, so the `NPM_TOKEN` secret can be deleted afterwards.
2. **Settings → Actions → General → Workflow permissions**: choose *Read and
   write permissions*. Dependabot opens its pull requests from branches inside
   this repository, which is why the `pull_request` event can hand `GITHUB_TOKEN`
   a write token there. Pull requests from forks stay read-only, and the workflow
   skips them through the `head.repo.full_name` guard.
3. **Settings → General**: enable *Allow auto-merge*.
4. **Branch protection on `main`**: block force pushes and deletions, but leave
   *Require status checks to pass before merging* **off**. `semantic-release`
   pushes `chore(release): … [skip ci]` straight to `main`, and GitHub rejects
   that push while a required check is configured. A repository owned by a
   personal account cannot add the GitHub Actions app to a ruleset bypass list
   either, so there is no way to have both.

The CI gate for Dependabot lives in `dependabotAutoMerge.yml` instead: it polls
`gh pr checks` for `Test CI Summary`, squash merges only after it passes, and
confirms the pull request reached `MERGED` before it asks for the Pages
deployment. `Test CI` reports one check per matrix cell (`test (22, ubuntu-latest)`
and so on), so the `test-status` job aggregates them into that single check.

`Test CI` keeps the write token away from the steps that execute repository code:
the `test` job is read-only, and the semantic-release dry-run lives in its own
`release-dry-run` job gated to trusted refs.

## Labels

The triage bot and the issue forms reference labels that have to exist in the
repository. `issues.addLabels` fails with `422` for unknown labels, so keep this
list in sync when a rule changes:

| Label | Used by |
| --- | --- |
| `bug` | `bug_report.yml` form |
| `enhancement` | `feature_request.yml` form |
| `needs-info` | triage rule 2, plus the 7-day lifecycle in `stale.yml` |
| `usage` | triage rule 1 (questions about using the wrapper) |
| `triaged` | manual exemption from the half-year staleness in `stale.yml` |
| `stale` | applied and removed by `actions/stale` |
| `ci` | `dependabot.yml` github-actions group |
| `dependencies` | `dependabot.yml` both ecosystems |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) are required:
`semantic-release` derives the version and the changelog from them. A breaking
change must be marked with `!` and a `BREAKING CHANGE:` footer. Commit subjects
and bodies are written in English.
