const baseConfig = require('eazychart-dev/jest/base.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/ignoreSvgTags.ts'],
};
