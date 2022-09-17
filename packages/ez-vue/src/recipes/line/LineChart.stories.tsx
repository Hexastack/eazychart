import { Meta, Story } from '@storybook/vue';
import LineChart from '@/recipes/line/LineChart';
import LineErrorMarginChart from '@/recipes/line/LineErrorMarginChart';
import {
  baseChartArgTypes,
  ChartWrapper,
} from '@/lib/storybook-utils';
import { animationOptions, colors, evolutionData, padding } from 'eazychart-dev/storybook/data';

const meta: Meta = {
  title: 'Vue/Line Chart',
  component: LineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args, { argTypes }) => ({
  title: 'Default',
  components: { LineChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <LineChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const LineErrorMarginTemplate: Story = (args, { argTypes }) => ({
  title: 'LineErrorMargin',
  components: { LineErrorMarginChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <LineErrorMarginChart v-bind="$props" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  swapAxis: false,
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear',
    beta: 0,
  },
  marker: {
    hidden: false,
    radius: 5,
    color: '#FFF'
  },
  grid: { directions: [] },
  xAxis: {
    domainKey: 'xValue',
    title: 'Hours',
    tickFormat: (d: number) => `${d}h`,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
  padding,
  animationOptions,
  isRTL: false,
  rawData: evolutionData,
};

Default.args = defaultArguments;

export const LineErrorMargin = LineErrorMarginTemplate.bind({});

LineErrorMargin.args = {
  ...defaultArguments,
  area: {
    fill: `${colors[1]}b0`,
  },
};
