const baseConfig = require('@ez/dev/jest/base.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
};
