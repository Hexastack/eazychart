import { Meta, Story } from '@storybook/vue';
import AreaChart from '@/recipes/area/AreaChart';
import MultiAreaChart from '@/recipes/area/MultiAreaChart';
import { baseChartArgTypes, ChartWrapper } from '@/lib/storybook-utils';
import {
  animationOptions,
  colors,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';

const meta: Meta = {
  title: 'Vue/Area Chart',
  component: AreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (_args, { argTypes }) => ({
  title: 'Default',
  components: { AreaChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <AreaChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const MultiAreaTemplate: Story = (_args, { argTypes }) => ({
  title: 'MultiArea',
  components: { MultiAreaChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <MultiAreaChart v-bind="$props" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  area: {
    stroke: colors[0],
    strokeWidth: 2,
    fill: `${colors[0]}b0`,
  },
  marker: {
    hidden: true,
    radius: 5,
    color: '#FFF',
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
  data: evolutionData,
};

Default.args = defaultArguments;

export const MultiArea = MultiAreaTemplate.bind({});

MultiArea.args = {
  ...defaultArguments,
  area: {
    stroke: colors[0],
    strokeWidth: 2,
    fill: `${colors[0]}b0`,
    opacity: 0.5,
  },
  yAxis: {
    domainKeys: ['yValue2', 'yValue1', 'yValue'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};
