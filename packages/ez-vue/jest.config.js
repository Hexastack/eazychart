const baseConfig = require('@ez/dev/jest/base.config');

module.exports = {
  ...baseConfig,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/tests/$1',
  },
};
