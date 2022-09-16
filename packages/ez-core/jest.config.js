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
].join('|');

module.exports = {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest.setup.ts'],
};