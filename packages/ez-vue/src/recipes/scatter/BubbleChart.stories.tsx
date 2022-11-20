import { Meta, Story } from '@storybook/vue';
import {
  animationOptions,
  correlationData,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  baseChartArgTypes,
  ChartWrapper,
  unFlattenArgs,
  flattenArgs,
} from '@/lib/storybook-utils';
import BubbleChart from './BubbleChart';

const bubbleChartArgTypes = {
  'bubble.minRadius': {
    control: { type: 'number' },
    table: { category: 'Bubble props', defaultValue: { summary: '1px' } },
    description: 'Sets the minimum bubble radius',
  },
  'bubble.domainKey': {
    table: { category: 'Bubble props', defaultValue: { summary: 'rValue' } },
    description: 'Sets the domain key',
  },
  'bubble.maxRadius': {
    control: { type: 'number' },
    table: { category: 'Bubble props', defaultValue: { summary: '25px' } },
    description: 'Sets the max bubble radius',
  },
  'bubble.fill': {
    control: { type: 'color' },
    table: { category: 'Bubble props', defaultValue: { summary: 'Color' } },
    description: 'Sets the bubble color',
  },

  yAxis: {
    table: {
      disable: true,
    },
  },
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

const DefaultTemplate: Story = (args) => ({
  title: 'Bubble',
  components: { BubbleChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <BubbleChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

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
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Height',
    tickFormat: (d: number) => `${d}c`,
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
