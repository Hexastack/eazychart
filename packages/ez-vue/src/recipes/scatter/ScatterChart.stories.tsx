import { Meta, Story } from '@storybook/vue';
import {
  animationOptions,
  colors,
  correlationData,
  padding,
} from 'eazychart-dev/storybook/data';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  getArgTypesByProp,
  cartesianChartArgTypes,
  yAxisArgTypes,
} from 'eazychart-dev/storybook/utils';
import ScatterChart from './ScatterChart';

const scatterChartArgTypes = {
  ...getArgTypesByProp('point'),
  ...cartesianChartArgTypes,
  ...yAxisArgTypes,
  ...baseChartArgTypes,
};

const meta: Meta = {
  title: 'Vue/Scatter Chart',
  component: ScatterChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: scatterChartArgTypes,
};
export default meta;

type ScatterChartProps = InstanceType<typeof ScatterChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: ScatterChartProps) => ({
  title: 'Default',
  components: { ScatterChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <ScatterChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  grid: { directions: [] },
  isRTL: false,
  padding,
  dimensions: { width: 800, height: 600 },
  xAxis: {
    domainKey: 'xValue',
    title: 'Width',
    tickFormat: (d: number) => `${d}m`,
    nice: 0,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Height',
    tickFormat: (d: number) => `${d}c`,
    nice: 0,
  },
  data: correlationData,
  point: {
    color: colors[1],
    radius: 5,
  },
  animationOptions,
});

Default.args = defaultArguments;
