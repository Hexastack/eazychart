const vueConfig = require('@vue/cli-service/webpack.config.js');
const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue',
  webpackFinal: async (config) => {
    // Add TS/TSX support
    const tsxRule = vueConfig.module.rules.find(
      ({ test }) => test.toString() === /\.tsx$/.toString(),
    );
    const tsRule = vueConfig.module.rules.find(
      ({ test }) => test.toString() === /\.ts$/.toString(),
    );
    config.module.rules.push(tsxRule);
    config.module.rules.push(tsRule);
    // Add eslint loader
    // const eslintRule = vueConfig.module.rules.find(
    //   ({ test }) => test.toString() === /\.(vue|(j|t)sx?)$/.toString(),
    // );
    // config.module.rules.push(eslintRule);
    // Resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    // Disable symbolic links
    config.resolve.symlinks = false;
    return config;
  },
};
