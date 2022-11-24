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
} from 'eazychart-dev/storybook/utils';
import ScatterChart from './ScatterChart';

const scatterChartArgTypes = {
  ...baseChartArgTypes,
  'point.radius': {
    control: { type: 'number' },
    table: { category: 'point props', defaultValue: { summary: '5px' } },
    description: 'Sets the point radius',
  },
  'point.color': {
    control: { type: 'color' },
    table: { category: 'point props', defaultValue: { summary: '#FF3366' } },
    description: 'Sets the point color',
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
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
  dimensions: { width: 800, height: 600 },
  point: {
    color: colors[1],
    radius: 5,
  },
});

Default.args = defaultArguments;
