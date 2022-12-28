const esModules = [
  'd3-scale',
  'd3-interpolate',
  'd3-color',
  'd3-ease',
  'd3-array',
  'internmap',
  'd3-format',
  'd3-time',
  'd3-shape',
  'd3-path',
  'd3-geo',
].join('|');

module.exports = {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  snapshotResolver: '../ez-dev/jest/snapshotResolver.js',
  snapshotSerializers: ['../ez-dev/jest/jest-html-serializer'],
};
