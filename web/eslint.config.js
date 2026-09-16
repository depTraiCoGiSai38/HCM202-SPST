import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'screenshots/**',
      'eslint.config.js',
      'tools/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
      globals: { window: 'readonly', document: 'readonly', navigator: 'readonly', localStorage: 'readonly', console: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', setInterval: 'readonly', clearInterval: 'readonly', requestAnimationFrame: 'readonly', matchMedia: 'readonly', HTMLElement: 'readonly', Element: 'readonly', Node: 'readonly', KeyboardEvent: 'readonly', MouseEvent: 'readonly', Event: 'readonly', IntersectionObserver: 'readonly', getComputedStyle: 'readonly', history: 'readonly', location: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  { files: ['**/*.test.ts', 'e2e/**/*.ts'], rules: { '@typescript-eslint/no-unsafe-assignment': 'off' } },
);
