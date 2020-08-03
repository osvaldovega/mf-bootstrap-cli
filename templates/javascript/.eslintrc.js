module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
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
	plugins: ['react', 'prettier'],
	rules: {
		'linebreak-style': ['error', 'unix'],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		curly: ['error', 'multi'],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'dot-location': ['error', 'property'],
		eqeqeq: ['error', 'always'],
		'react/jsx-indent': [2, 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
	},
};
