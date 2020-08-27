const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  parser: 'babel-eslint',

  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:package-json/recommended',
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier', 'package-json'],

  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    curly: ['error', 'multi-line'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'dot-location': ['error', 'property'],
    eqeqeq: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
    // React
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': [2, 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/no-unescaped-entities': 0,
    // Prettier
    'prettier/prettier': ['error', prettierOptions],
    // Import
    'import/no-unresolved': [2, { commonjs: true, amd: true, caseSensitive: false }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/no-extraneous-dependencies': 0,
  },
};
