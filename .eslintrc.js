module.exports = {
	env: {
		es2020: true,
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['standard'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'standard/object-curly-even-spacing': [2, 'either'],
		'standard/array-bracket-even-spacing': [2, 'either'],
		'standard/computed-property-even-spacing': [2, 'even'],
		'standard/no-callback-literal': [2, ['cb', 'callback']],
	},
};
