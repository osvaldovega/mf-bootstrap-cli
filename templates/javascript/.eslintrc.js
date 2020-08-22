const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
	env: {
		jest: true,
		browser: true,
		node: true,
		es6: true,
	},

	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],

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

	plugins: ['react', 'prettier', 'react-hooks', 'jsx-a11y'],

	rules: {
		'linebreak-style': ['error', 'unix'],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		curly: ['error', 'multi'],
		indent: ['error', 2],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'dot-location': ['error', 'property'],
		eqeqeq: ['error', 'always'],
		'react/jsx-filename-extension': 0,
		'react/jsx-indent': [2, 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
		'prettier/prettier': ['error', prettierOptions],
		'import/no-extraneous-dependencies': 0,
	},
};
