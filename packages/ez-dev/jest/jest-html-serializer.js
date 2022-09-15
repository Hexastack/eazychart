var toDiffableHtml = require('diffable-html');

module.exports = {
  test(object) {
    const trimmed = object.toString().trim();
    return (
      trimmed.length > 2 &&
      trimmed[0] === '<' &&
      trimmed[trimmed.length - 1] === '>'
    );
  },
  // ez-react
  serialize(val) {
    return toDiffableHtml(val).trim();
  },
  // ez-vue
  print(val) {
    return toDiffableHtml(val).trim();
  },
};
