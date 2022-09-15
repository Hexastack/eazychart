import AreaChart from '@/recipes/area/AreaChart';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
AreaChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(AreaChart.name, AreaChart);
};

export default AreaChart;
