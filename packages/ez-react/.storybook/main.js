import { dirname, join } from 'path';
const path = require('path');

module.exports = {
  stories: ['../src/**/*.@(mdx|stories.@(ts|tsx|js|jsx))'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook',
  ],
  framework: getAbsolutePath('@storybook/react'),

  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
    reactDocgen: false
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },

  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../'),
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    return config;
  },

  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        vue: {
          title: 'VUE',
          url: 'http://localhost:6007',
          expanded: true,
        },
      };
    }
    return {
      vue: {
        title: 'VUE',
        url: 'https://docs-vue.eazychart.com',
        expanded: true,
      },
    };
  },

  docs: {},
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
