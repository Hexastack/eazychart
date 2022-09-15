const path = require('path');
const SEP = path.sep;

const resolveLocal = (path) => {
  return path
    .replace(`ez-vue${SEP}`, `ez-dev${SEP}`)
    .replace(`ez-react${SEP}`, `ez-dev${SEP}`)
    .replace(`tests${SEP}unit${SEP}`, `jest${SEP}snapshots${SEP}`);
};

/**
 *
 * @param testPath Path of the test file being test3ed
 * @param snapshotExtension The extension for snapshots (.snap usually)
 */
const resolveSnapshotPath = (testPath, snapshotExtension) => {
  const snapshotFilePath = resolveLocal(testPath) + snapshotExtension; //(i.e. some.test.js + '.snap')
  return snapshotFilePath;
};

/**
 *
 * @param snapshotFilePath The filename of the snapshot (i.e. some.test.js.snap)
 * @param snapshotExtension The extension for snapshots (.snap)
 */
const resolveTestPath = (snapshotFilePath, snapshotExtension) => {
  const testPath = resolveLocal(snapshotFilePath)
    .replace(snapshotExtension, '')
    .replace(`__snapshots__${SEP}`, ''); // Remove the .snap
  return testPath;
};

/* Used to validate resolveTestPath(resolveSnapshotPath( {this} )) */
const testPathForConsistencyCheck = 'some.spec.ts';

module.exports = {
  resolveSnapshotPath,
  resolveTestPath,
  testPathForConsistencyCheck,
};
