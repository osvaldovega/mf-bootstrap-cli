const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  ignorePatterns: ['/node_modules/**', '/templates/**'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    curly: ['error'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'dot-location': ['error', 'property'],
    eqeqeq: ['error', 'always'],
    'prettier/prettier': ['error', prettierOptions],
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': ['error', { props: false }],
  },
};
