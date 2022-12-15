// eslint-disable-next-line object-curly-newline
import { Args, ArgTypes, Meta, Story } from '@storybook/vue';
import LineErrorMarginChart from '@/recipes/line/LineErrorMarginChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  animationOptions,
  colors,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';
import { LineCurve } from 'eazychart-core/src/types';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('errorMargins'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('area', { omit: ['beta', 'curve'] }),
  ...getArgTypesByProp('line'),
};

const meta: Meta = {
  title: 'Vue/Line Chart/LineErrorMargin',
  component: LineErrorMarginChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};
export default meta;

type LineErrorMarginChartProps = InstanceType<
  typeof LineErrorMarginChart
>['$props'];

const LineErrorMarginTemplate: Story = buildTemplate(
  (args: LineErrorMarginChartProps) => ({
    title: 'LineErrorMargin',
    components: { LineErrorMarginChart, ChartWrapper },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ChartWrapper>
      <LineErrorMarginChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
  }),
);

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const LineErrorMargin = LineErrorMarginTemplate.bind({});

const defaultArguments = flattenArgs({
  errorMargins: { positive: 'positiveMargin', negative: 'negativeMargin' },
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear' as LineCurve,
    beta: 0,
  },
  animationOptions,
  isRTL: false,
  padding,
  dimensions: { width: 800, height: 600 },
  marker: {
    hidden: false,
    radius: 5,
    color: '#FFF',
  },
  grid: { directions: [] },
  xAxis: {
    domainKey: 'xValue',
    title: 'Hours',
    tickFormat: (d: number) => `${d}h`,
    nice: 0,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
    nice: 0,
  },
  area: {
    fill: `${colors[1]}b0`,
    stroke: '#339999',
    strokeWidth: 0,
    opacity: 1,
  },
  data: evolutionData,
});

LineErrorMargin.args = defaultArguments;
