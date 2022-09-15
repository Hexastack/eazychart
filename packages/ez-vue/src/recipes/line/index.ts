import LineChart from '@/recipes/line/LineChart';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
LineChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(LineChart.name, LineChart);
};

export default LineChart;
