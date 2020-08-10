const { resolve } = require('path');

module.exports = {
	// preset: '/node_modules/jest/jest-preset.js',
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.test.{js,jsx,ts,tsx}'],
	coverageThreshold: {
		global: {
			statements: 98,
			branches: 70,
			functions: 98,
			lines: 98,
		},
	},
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'.*\\.(css|less|style|scss|sass)$': 'identity-obj-proxy',
		'@src/(.*)$': resolve(__dirname, './src/$1'),
	},
	setupFilesAfterEnv: ['<rootDir>/src/setupJest.js'],
	testRegex: '.*\\.test\\.(js|ts(x?))$',
	transform: {
		// '^.+\\.(ts(x?)|js)$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	testPathIgnorePatterns: [''],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
