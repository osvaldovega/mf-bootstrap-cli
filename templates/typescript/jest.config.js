module.exports = {
  roots: ['<rootDir>/src'],

  verbose: true,

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.(ts|tsx)': 'ts-jest',
    '^.+\\.(css|scss|less)$': 'jest-css-modules',
  },

  testURL: 'http://localhost',

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],

  testPathIgnorePatterns: ['/node_modules/'],

  setupFiles: ['raf/polyfill', './jest/setupJest.js'],

  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],

  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2)$': '<rootDir>/jest/fileMock.js',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^jest/(.*)$': '<rootDir>/jest/$1',
  },

  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],

  coverageReporters: ['html', 'text-summary', 'lcov'],

  collectCoverage: true,

  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  watchPathIgnorePatterns: ['node_modules'],
};
