// eslint-disable-next-line object-curly-newline
import { Args, ArgTypes, Meta, Story } from '@storybook/vue';
import LineChart from '@/recipes/line/LineChart';
import MultiLineChart from '@/recipes/line/MultiLineChart';

import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypes,
  getArgTypesByProp,
  cartesianChartArgTypes,
  setTabArgs,
} from 'eazychart-dev/storybook/utils';
import {
  animationOptions,
  areaColors,
  colors,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';
import { MULTI_Y_AXIS_CONTROLS } from 'eazychart-dev/storybook/storybook-configs';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...getArgTypesByProp('line'),
  ...setTabArgs(areaColors, 'colors', 'color'),
  ...cartesianChartArgTypes,
  ...markerArgTypes,
  ...baseChartArgTypes,
  ...MULTI_Y_AXIS_CONTROLS,
};

const meta: Meta = {
  title: 'Vue/Multi Line Chart',
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
export const Default = MultiLineTemplate.bind({});

const defaultArguments = flattenArgs({
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear',
    beta: 0,
  },
  isRTL: false,
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
  },
  padding,
  animationOptions,
  data: evolutionData,
});

Default.args = {
  ...defaultArguments,
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};
