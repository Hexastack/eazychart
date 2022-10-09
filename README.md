# EazyChart
<img align="center" width="500" alt="EazyChart logo" src="https://eazychart.com/img/logo.png"/>
<br/>
<a href="https://eazychart.com/">EazyChart</a> is a reactive chart library, it offers the ability to easily add charts in your React and Vue web applications. EazyChart does not depend on a JS chart library instead it depends only on some of the <a href="https://d3js.org/">D3.js</a> library's submodules.

<br />
<a href="https://docs.eazychart.com/">Website</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://docs.eazychart.com/?path=/story/get-started-introduction--page">Get Started</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://docs.eazychart.com/?path=/story/get-started-installation--page">Installation</a>
<br />
<hr />

## Motivation

The purpose of this library is to provide :
- Highly customizable charts.
- Less library dependencies.
- Easy integration charts into React / Vue applications.
- Simple syntax.
- SVG Render with some HTML/CSS.
- Responsive and functional across all devices and modern browsers.
- Animation support.

## Installation

EazyChart has not been yet released. It's still in the alpha stage as we are currently working on some details before releasing a major version. You still can install and try out the library but we don't recommend using it in a production environment.

For each framework, you will need to install the appropriate packages.

### React

Use one of the following commands :

```
// Using npm
npm install --save eazychart-react eazychart-css

// Using yarn
yarn add eazychart-react eazychart-css
```

### Vue

You will need one of the following commands :

```
// Using npm
npm install --save eazychart-vue eazychart-css

// Using yarn
yarn add eazychart-vue eazychart-css
```
> **_NOTE:_**  This library supports Vue v2.x as it hasn't been tested for v3.x. We expect to work on v3 soon.

## Basic Usage

### React
Import the chart from library :
```js
import { PieChart } from 'eazychart-react';
import 'eazychart-css'; // You just need to import this once.
// ...
```
Use the chart component with the help of the JSX syntax :
```jsx
<PieChart
  colors={['red', 'blue', 'green']}
  valueDomainKey={'value'}
  labelDomainKey={'label'}
  data={[
    { label: 'Alpha', value: 10 },
    { label: 'Beta', value: 20 },
    { label: 'Gamma', value: 30 },
  ]}
/>
```

### Vue
Import the chart from the library :
```js
import { PieChart } from 'eazychart-react'; // Don't forget to add "PieChart" to the "components" !
import 'eazychart-css'; // You just need to import this once in your "main.js" file.
```
Use the chart component :
```vue
<template>
  <div id="app">
    <pie-chart :colors="colors" valueDomainKey="value" labelDomainKey="label" :data="data"/>
  </div>
</template>
<script>
import { PieChart } from 'eazychart-vue';
import 'eazychart-css';

export default {
  name: 'App',
  components: {
    PieChart
  },
  data() {
    return {
      colors: ['red', 'blue', 'green'],
      data: [
        { label: 'Alpha', value: 10 },
        { label: 'Beta', value: 20 },
        { label: 'Gamma', value: 30 },
      ],
    };
  },
};
</script>
```

## Documentation
To learn more about EazyChart please visit our documentation website : [https://docs.eazychart.com](https://docs.eazychart.com)

## Contributing
You could contribute the way you want, even by simply sharing the repo URL. You could test out the features, add some content to the documentation, raise issues, or push some PRs. Please read through our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) and let us hear from you. 

Here are some of technical stuff that you need to know before adding any code :
- This project is a mono-repo using [Lerna](https://lerna.js.org/).
- All packages, including React and Vue libraries, are written in TypeScript.
- Vue uses JSX + the class component syntax.
- We use Jest snapshots in `ez-dev` so that we ensure React and Vue output the same result across all components.
- For each component we implement unit tests using Jest / [Testing Library](https://testing-library.com/).
- Documentation is provided using [Storybook](https://storybook.js.org/) with the help of the [Composition](https://storybook.js.org/docs/react/sharing/storybook-composition).

### Installation

Clone the project and then in the root folder, perform the following commands :
```
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
