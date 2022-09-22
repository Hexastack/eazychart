# EazyChart

EazyChart is a reactive chart library, it offers the ability to easily add charts in your React and Vue web applications.

The purpose of this library is to help you to write charts in React applications without any pain. Main principles of Recharts are:

- Easily integrate charts.
- Highly customizable charts
- Simple usage of React and Vue components with the same syntax.
- SVG charts, depending only on some D3.js submodules.
- Responsive charts that work across all modern browsers.
- Includes animation support.

## Basic Usage

```js
<PieChart
  colors={['red', 'blue', 'green']}
  domainKey={'value'}
  rawData={[
    { label: 'Alpha', value: 10 },
    { label: 'Beta', value: 20 },
    { label: 'Gamma', value: 30 },
  ]} />
```
## Installation

EazyChart has not been yet released, we are currently working on some details before releasing the 1st version.


## Documentation

Under construction ... coming soon.

## Contributing

This project is a mono-repo using Lerna.

### Installation

Clone the project and then in the root folder, perform the following commands :
```
yarn
yarn setup
```

### Useful Commands
```
yarn clean // removes node_modules folders
yarn setup // installs node_modules in each package
yarn storybook // runs storybook for both react and vue
```

### FAQ

- Why is there a "nohoist" to all npm packages ? 
> We have had some trouble with Vue + TSX, as it occured multiple times where we get react TS errors in Vue JSX code. After passing a long time troubleshooting, we didn't find the root cause. We hope this gets fixed in Vue3 or with Vite bundler. Until then ... we do not hoist ! More on https://lerna.js.org/docs/concepts/hoisting

## License

EazyChart is available under the MIT license.

Copyright (c) 2022 Hexastack.
