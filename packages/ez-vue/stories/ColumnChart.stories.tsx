import { Meta, Story } from '@storybook/vue';
import { baseChartArgTypes, ChartWrapper } from './lib/utils';
import ColumnChart from '../src/recipes/column/ColumnChart';
import LineColumnChart from '../src/recipes/column/LineColumnChart';
import { animationOptions, colors, padding, rawData } from 'eazychart-dev/storybook/data';

const meta: Meta = {
  title: 'Vue/Charts/Column Chart',
  component: ColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args, { argTypes }) => ({
  title: 'Default',
  components: { ColumnChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <ColumnChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const LineColumnTemplate: Story = (args, { argTypes }) => ({
  title: 'LineColumn',
  components: { LineColumnChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <LineColumnChart v-bind="$props" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  colors,
  grid: { directions: [] },
  xAxis: {
    domainKey: 'name',
    title: 'Letter',
  },
  yAxis: {
    domainKey: 'value',
    title: 'Count',
    nice: 2,
  },
  padding,
  animationOptions,
  isRTL: false,
  rawData,
};

Default.args = defaultArguments;

export const LineColumn = LineColumnTemplate.bind({});

const lineColumnArguments = {
  ...defaultArguments,
  line: {
    strokeWidth: 2,
    stroke: '#81248d',
  },
  marker: {
    hidden: false,
    radius: 5,
    color: '#c400c4',
  },
  yLineAxis: {
    domainKey: 'v',
    title: 'Value',
    nice: 2,
  },
};

LineColumn.args = lineColumnArguments;
