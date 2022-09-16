import { Meta, Story } from '@storybook/vue';
import {
  animationOptions,
  colors,
  correlationData,
  padding,
} from 'eazychart-dev/storybook/data';
import ScatterChart from '../src/recipes/scatter/ScatterChart';
import BubbleChart from '../src/recipes/scatter/BubbleChart';
import { baseChartArgTypes, ChartWrapper } from './lib/utils';

const meta: Meta = {
  title: 'Vue/Charts/Scatter Chart',
  component: ScatterChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args, { argTypes }) => ({
  title: 'Default',
  components: { ScatterChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <ScatterChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const BubbleTemplate: Story = (args, { argTypes }) => ({
  title: 'Bubble',
  components: { BubbleChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <BubbleChart v-bind="$props" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  swapAxis: false,
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
  rawData: correlationData,
};

Default.args = {
  ...defaultArguments,
  point: {
    color: colors[1],
    radius: 5,
  },
};

export const Bubble = BubbleTemplate.bind({});

Bubble.args = {
  ...defaultArguments,
  bubble: {
    domainKey: 'rValue',
    minRadius: 1,
    maxRadius: 25,
    fill: 'rgba(209, 46, 84, 0.5)',
  },
};
