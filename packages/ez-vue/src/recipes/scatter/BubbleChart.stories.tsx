import { Meta, Story } from '@storybook/vue';
import {
  animationOptions,
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
import BubbleChart from './BubbleChart';

const bubbleChartArgTypes = {
  ...yAxisArgTypes,
  ...cartesianChartArgTypes,
  ...getArgTypesByProp('bubble'),
  ...baseChartArgTypes,
};

const meta: Meta = {
  title: 'Vue/Bubble Chart',
  component: BubbleChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: bubbleChartArgTypes,
};
export default meta;

type BubbleChartProps = InstanceType<typeof BubbleChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: BubbleChartProps) => ({
  title: 'Bubble',
  components: { BubbleChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <BubbleChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  grid: { directions: [] },
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
  padding,
  animationOptions,
  isRTL: false,
  data: correlationData,
  bubble: {
    domainKey: 'rValue',
    minRadius: 1,
    maxRadius: 25,
    fill: 'rgba(209, 46, 84, 0.5)',
  },
  dimensions: { width: 800, height: 600 },
});

Default.args = defaultArguments;
