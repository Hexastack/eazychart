import ScatterChart from './ScatterChart';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
ScatterChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(ScatterChart.name, ScatterChart);
};

export default ScatterChart;
