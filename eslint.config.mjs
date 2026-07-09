import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Surface (don't hard-block) untyped escapes so they get cleaned up
      // incrementally. Existing `// eslint-disable-next-line` usages still apply.
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // `.cjs` scripts are intentionally CommonJS; `require()` is valid there.
    // These are being migrated to ESM (see script-hygiene work).
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      '.source/**',
      'next-env.d.ts',
      'fumadocs/**',
    ],
  },
];

export default eslintConfig;
