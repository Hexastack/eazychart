import BarChart from './BarChart';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BarChart.install = function install(Vue) {
  Vue.component(BarChart.name, BarChart);
};

export default BarChart;
