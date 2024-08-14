module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    '@babel/plugin-transform-private-property-in-object',
  ],
  rules: {
    'no-console': 'error',
  },
};
