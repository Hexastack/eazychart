# EazyChart
<img align="center" width="500" alt="EazyChart logo" src="https://eazychart.com/img/logo.png"/>
<br/>
[EazyChart](https://eazychart.com) is a chart library, `eazychart-react` offers the ability to easily add charts in your React web applications. EazyChart does not depend on a JS chart library instead it depends only on some of the [D3.js](https://d3js.org/) library's submodules.

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

Use one of the following commands :

```
// Using npm
npm install --save eazychart-react eazychart-css

// Using yarn
yarn add eazychart-react eazychart-css
```

## Basic Usage

Import the chart from the library first :
```js
import { PieChart } from 'eazychart-react';
import 'eazychart-css'; // You just need to import this once.
```

Use any chart component with the JSX syntax :
```jsx
<PieChart
  colors={['red', 'blue', 'green']}
  domainKey={'value'}
  data={[
    { label: 'Alpha', value: 10 },
    { label: 'Beta', value: 20 },
    { label: 'Gamma', value: 30 },
  ]}
/>
```

## Documentation

To learn more about EazyChart please visit our documentation website : [https://docs.eazychart.com](https://docs.eazychart.com)

## Contributing

Please refer to the main [README](../../README.md) file to learn how you could contribute to the project.

## License

EazyChart is available under the MIT license.

Copyright (c) 2022 Hexastack.
