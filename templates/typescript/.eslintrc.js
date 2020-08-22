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

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
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

	plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks', 'jsx-a11y'],

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
		// TS
		'@typescript-eslint/explicit-member-accessibility': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/triple-slash-reference': 0,
		'react/no-unescaped-entities': 0,
	},

	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
	},

	parser: '@typescript-eslint/parser',
};
