import ColumnChart from './ColumnChart';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
ColumnChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(ColumnChart.name, ColumnChart);
};

export default ColumnChart;
