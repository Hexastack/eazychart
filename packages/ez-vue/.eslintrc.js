module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    webpack: {
      config: require.resolve('@vue/cli-service/webpack.config.js'),
    },
    // 'import/resolver': {
    //   typescript: {
    //     // paths: "./tsconfig.json",
    //     // alwaysTryTypes: true
    //   },
    // },
  },
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'no-return-assign': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    radix: 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error', // or warn
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  // ignore storybook files
  ignorePatterns: [
    'jest.config.js',
    'storybook-*.js',
    'generated-*.js',
    'resize-observer.d.ts',
  ],
};
