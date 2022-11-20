import { Meta, Story } from '@storybook/vue';
import {
  baseChartArgTypes,
  ChartWrapper,
  flattenArgs,
  ResizableChartWrapper,
  setColorArgs,
  unFlattenArgs,
  flattenColors,
} from '@/lib/storybook-utils';
import {
  animationOptions,
  colors,
  dimensions,
  rawData,
} from 'eazychart-dev/storybook/data';
import ResponsiveChartContainer from '@/components/ResponsiveChartContainer';
import BarChart from './BarChart';

const barChartArgTypes = {
  colors: {
    table: {
      disable: true,
    },
  },
  'xAxis.nice': {
    control: { type: 'number' },
    table: { category: 'Axis Options', defaultValue: { summary: '2' } },
    description: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
  ...baseChartArgTypes,
  ...setColorArgs(colors),
};

const meta: Meta = {
  title: 'Vue/Bar Chart',
  component: BarChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: barChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args) => ({
  components: { BarChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <BarChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const TemplateWithParentDimensions: Story = (args) => ({
  title: 'Withparent',
  components: { BarChart, ResizableChartWrapper, ResponsiveChartContainer },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ResizableChartWrapper>
      <ResponsiveChartContainer>
        <BarChart v-bind="allPropsFromArgs" />
      </ResponsiveChartContainer>
    </ResizableChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
export const Resizable = TemplateWithParentDimensions.bind({});

const initialArguments = {
  ...flattenArgs({
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
    data: rawData,
  }),
  ...flattenColors(colors),
};

Default.args = {
  ...initialArguments,
  dimensions,
};

Resizable.args = initialArguments;
