module.exports = {
  verbose: true,

  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(css|scss|less)$': 'jest-css-modules',
  },

  testURL: 'http://localhost',

  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)'],

  testPathIgnorePatterns: [],

  setupFiles: ['raf/polyfill', './jest/setupJest.js'],

  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],

  transformIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|webp|svg|ttf|woff|woff2)$': '<rootDir>/jest/fileMock.js',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^jest/(.*)$': '<rootDir>/jest/$1',
  },

  coverageReporters: ['html', 'text-summary', 'lcov'],

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/**/*.js'],

  watchPathIgnorePatterns: ['node_modules'],
};
