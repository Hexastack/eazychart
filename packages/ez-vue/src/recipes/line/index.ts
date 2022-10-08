import LineChart from '@/recipes/line/LineChart';
import LineErrorMarginChart from '@/recipes/line/LineErrorMarginChart';
import MultiLineChart from '@/recipes/line/MultiLineChart';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
LineChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(LineChart.name, LineChart);
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
LineErrorMarginChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(LineErrorMarginChart.name, LineErrorMarginChart);
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MultiLineChart.install = function install(Vue: Vue) {
  // @ts-ignore
  Vue.component(MultiLineChart.name, MultiLineChart);
};

export default {
  LineChart,
  LineErrorMarginChart,
  MultiLineChart,
};
