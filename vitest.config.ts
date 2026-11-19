import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['__test__/**/*.test.ts'],
    setupFiles: ['__test__/setup.ts'],
    css: {
      modules: {
        // Deterministic class names keep the assertions readable; the production
        // hashing is covered by the build checks instead.
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      // `lcov` writes coverage/lcov.info, the default path the Coveralls action
      // reads.
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      // `standalone.ts` only re-exports the entry, and the shims carry no code.
      exclude: ['src/shims.d.ts', 'src/standalone.ts'],
      thresholds: {
        branches: 85,
        functions: 100,
        lines: 95,
        statements: 95,
      },
    },
  },
})
