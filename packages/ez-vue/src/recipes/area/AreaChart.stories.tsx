import { Meta, Story } from '@storybook/vue';
import AreaChart from '@/recipes/area/AreaChart';
import MultiAreaChart from '@/recipes/area/MultiAreaChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  animationOptions,
  colors,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypesOptions,
} from 'eazychart-dev/storybook/utils';

const areaChartArgTypes = {
  'area.stroke': {
    control: { type: 'color' },
    table: { category: 'Area props', defaultValue: { summary: 'color' } },
    description: 'Sets the stroke color',
    if: { arg: 'yAxis', truthy: false },
  },
  'area.strokeWidth': {
    control: { type: 'number' },
    table: { category: 'Area props', defaultValue: { summary: '2px' } },
    description: 'Sets the stroke width',
    if: { arg: 'yAxis', truthy: false },
  },
  'area.fill': {
    control: { type: 'color' },
    table: { category: 'Area props', defaultValue: { summary: '#26547c' } },
    description: 'Sets the area color',
    if: { arg: 'yAxis', truthy: false },
  },
  yAxis: {
    control: { type: 'object' },
    table: {
      category: 'Multi chart Y Axis Options',
      defaultValue: { summary: 'yValues' },
    },
    description: 'Sets the Y axis domain keys and title for multi chart',
    // Used to make this argument disappear in the single (default) chart
    if: { arg: 'yAxis', truthy: true },
  },
  ...markerArgTypesOptions,
  ...baseChartArgTypes,
};

const meta: Meta = {
  title: 'Vue/Area Chart',
  component: AreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: areaChartArgTypes,
};
export default meta;

type AreaChartProps = InstanceType<typeof AreaChart>['$props'];
type MultiAreaChartProps = InstanceType<typeof MultiAreaChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: AreaChartProps) => ({
  title: 'Default',
  components: { AreaChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <AreaChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

const MultiAreaTemplate: Story = buildTemplate((args: MultiAreaChartProps) => ({
  title: 'MultiArea',
  components: { MultiAreaChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <MultiAreaChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
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
  animationOptions,
  dimensions: { width: 800, height: 600 },
  padding,
  isRTL: false,
  data: evolutionData,
});

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
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};
