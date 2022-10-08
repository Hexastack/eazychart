import ScatterChart from './ScatterChart';
import BubbleChart from './BubbleChart';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
ScatterChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(ScatterChart.name, ScatterChart);
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
BubbleChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(BubbleChart.name, BubbleChart);
};

export default {
  ScatterChart,
  BubbleChart,
};
