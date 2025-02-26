import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // JavaScript 用の設定 (Node.js 環境を明示)
  {
    files: ['**/*.js'], // `.js` ファイルを対象
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // Node.js のグローバル変数 (`process`, `__dirname` など)
      },
    },
    rules: {
      'no-undef': 'error', // 未定義の変数をエラーとする
    },
  },

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
        ...globals.node, // TypeScript ファイルにも Node.js グローバル変数を追加
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

  // 無視するファイル/ディレクトリの設定
  {
    ignores: ['node_modules/', 'dist/', '.*'],
  },
];
