import { Meta, Story } from '@storybook/vue';
import {
  baseChartArgTypes,
  ChartWrapper,
  ResizableChartWrapper,
} from './lib/utils';
import BarChart from '../src/recipes/bar/BarChart';
import { animationOptions, colors, dimensions, rawData } from 'eazychart-dev/storybook/data';

const meta: Meta = {
  title: 'Vue/Charts/Bar Chart',
  component: BarChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args, { argTypes }) => ({
  title: 'Default',
  components: { BarChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <BarChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const TemplateWithParentDimensions: Story = (args, { argTypes }) => ({
  title: 'Withparent',
  components: { BarChart, ResizableChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ResizableChartWrapper>
      <BarChart v-bind="$props" />
    </ResizableChartWrapper>
  `,
});


// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
export const Resizable = TemplateWithParentDimensions.bind({});

const initialArguments = {
  colors,
  grid: { directions: [] },
  xAxis: {
    domainKey: 'value',
    title: 'Count',
    nice: 2,
  },
  yAxis: {
    domainKey: 'name',
    title: 'Letter',
  },
  padding: {
    left: 150,
    bottom: 100,
    right: 150,
    top: 100,
  },
  animationOptions,
  isRTL: false,
  rawData,
}

Default.args = {
  ...initialArguments,
  dimensions,
};

Resizable.args = initialArguments;
