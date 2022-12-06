const baseConfig = require('eazychart-dev/jest/base.config');

const esModules = [
  'd3-scale',
  'd3-array',
  'internmap',
  'd3-interpolate',
  'd3-color',
  'd3-format',
  'd3-time',
  'd3-shape',
  'd3-path',
  'd3-ease',
  'd3-geo',
].join('|');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
