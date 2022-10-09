# EazyChart
<img align="center" width="500" alt="EazyChart logo" src="https://eazychart.com/img/logo.png"/>
<br/>
<a href="https://eazychart.com/">EazyChart</a> is a chart library, `eazychart-vue` offers the ability to easily add charts in your Vue web applications. EazyChart does not depend on a JS chart library instead it depends only on some of the <a href="https://d3js.org/">D3.js</a> library's submodules.

<br />
<a href="https://docs.eazychart.com/">Website</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://docs.eazychart.com/?path=/story/get-started-introduction--page">Get Started</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://docs.eazychart.com/?path=/story/get-started-installation--page">Installation</a>
<br />
<hr />

> **_NOTE:_**  This library supports Vue v2.x as it hasn't been tested for v3.x. We expect to work on v3 soon.

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

Use one of the following commands :

```
// Using npm
npm install --save eazychart-vue eazychart-css

// Using yarn
yarn add eazychart-vue eazychart-css
```

## Basic Usage

Import the chart from the library :
```js
import { PieChart } from 'eazychart-vue';
import 'eazychart-css'; // You just need to import this once.
```
Use any chart component with vue component syntax :
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

Please refer to the main [README](../../README.md) file to learn how you could contribute to the project.

## License

EazyChart is available under the MIT license.

Copyright (c) 2022 Hexastack.
