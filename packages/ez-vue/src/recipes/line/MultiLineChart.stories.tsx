// eslint-disable-next-line object-curly-newline
import { Args, ArgTypes, Meta, Story } from '@storybook/vue';
import LineChart from '@/recipes/line/LineChart';
import MultiLineChart from '@/recipes/line/MultiLineChart';

import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  animationOptions,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';
import { LineCurve } from 'eazychart-core/src/types';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKey'] }),
  ...getArgTypesByProp('line', { omit: ['stroke'] }),
};

const meta: Meta = {
  title: 'Vue/Line Chart/MultiLine',
  component: LineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};
export default meta;

type MultiLineChartProps = InstanceType<typeof MultiLineChart>['$props'];

const MultiLineTemplate: Story = buildTemplate((args: MultiLineChartProps) => ({
  title: 'MultiLine',
  components: { MultiLineChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <MultiLineChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const MultiLine = MultiLineTemplate.bind({});

const defaultArguments = flattenArgs({
  colors: ['#339999', '#993399', '#333399'],
  line: {
    strokeWidth: 2,
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
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
    nice: 0,
  },
  data: evolutionData,
});

MultiLine.args = defaultArguments;
