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
		'prettier/prettier': 'error',
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-param-reassign': ['error', { props: false }],
	},
};
