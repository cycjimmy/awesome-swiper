export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
  ],
  ignoreFiles: [
    'dist/**',
    '.release/**',
    '.publish/**',
    'coverage/**',
  ],
  rules: {
    // CSS Modules' own pseudo classes are not part of standard CSS.
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
}
