import { Meta, Story } from '@storybook/vue';
import MultiAreaChart from '@/recipes/area/MultiAreaChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';

const areaChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKey'] }),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('area', { omit: ['stroke', 'fill'] }),
};

const meta: Meta = {
  title: 'Vue/Area Chart/MultiArea',
  component: MultiAreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: areaChartArgTypes,
};
export default meta;

type MultiAreaChartProps = InstanceType<typeof MultiAreaChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: MultiAreaChartProps) => ({
  title: 'MultiArea',
  components: { MultiAreaChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <MultiAreaChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const MultiArea = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  area: {
    curve: 'curveLinear',
    beta: 0,
    strokeWidth: 2,
    opacity: 0.5,
  },
  colors: ['#339999', '#993399', '#333399'],
  marker: {
    hidden: true,
    radius: 5,
    color: '#FFF',
  },
  animationOptions,
  isRTL: false,
  padding,
  dimensions: { width: 800, height: 600 },
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

MultiArea.args = defaultArguments;
