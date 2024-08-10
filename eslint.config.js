import globals from 'globals';

import eslintJS from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import tsESlint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Игнорируемые файлы
    ignores: ['node_modules', 'dist', 'public', 'calc_old'],
  },
  // Файлы, которые будут линтиться
  {
    files: ['**/*.{js,cjs,mjs,ts,vue}'],
  },
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  // JS
  eslintJS.configs.recommended,
  // VUE
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/component-definition-name-casing': ['error', 'kebab-case'],
    },
  },
  ...tsESlint.configs.recommended,
  // Должно быть последним, чтобы Prettier не конфликтовал с Eslint
  eslintPluginPrettierRecommended,
];
