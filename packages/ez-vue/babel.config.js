module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
};
