import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // JavaScript 用の設定
  pluginJs.configs.recommended,

  // TypeScript 用の設定
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node, // Node.js 環境のグローバル変数
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },

  // Prettier の設定
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Prettier のフォーマットエラーを ESLint に反映
    },
  },

  // Prettier の競合ルールを無効化
  prettierConfig,
];
