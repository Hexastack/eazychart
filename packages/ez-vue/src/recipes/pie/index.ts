import PieChart from './PieChart';
import SemiCircleChart from './SemiCircleChart';
import RadialChart from './RadialChart';
import IrregularPieChart from './IrregularPieChart';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
PieChart.install = function install(Vue) {
  Vue.component(PieChart.name, PieChart);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SemiCircleChart.install = function install(Vue) {
  Vue.component(SemiCircleChart.name, SemiCircleChart);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
RadialChart.install = function install(Vue) {
  Vue.component(RadialChart.name, RadialChart);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
IrregularPieChart.install = function install(Vue) {
  Vue.component(IrregularPieChart.name, IrregularPieChart);
};

export default {
  PieChart,
  SemiCircleChart,
  RadialChart,
  IrregularPieChart,
};
