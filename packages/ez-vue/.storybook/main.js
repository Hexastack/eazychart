import { dirname, join } from "path";
const vueConfig = require('@vue/cli-service/webpack.config.js');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],
  framework: getAbsolutePath("@storybook/vue"),
  typescript: {
    check: true, // type-check stories during Storybook build
    reactDocgen: false
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
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

  features: {
    // We enable this to build the stories.json file.
    // This is useful to be able to display vue storybook inside the react storybook.
    buildStoriesJson: true,
  },

  docs: {}
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
