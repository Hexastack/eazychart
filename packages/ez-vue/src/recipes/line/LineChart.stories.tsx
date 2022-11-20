import { Meta, Story } from '@storybook/vue';
import LineChart from '@/recipes/line/LineChart';
import LineErrorMarginChart from '@/recipes/line/LineErrorMarginChart';
import MultiLineChart from '@/recipes/line/MultiLineChart';

import {
  baseChartArgTypes,
  ChartWrapper,
  unFlattenArgs,
  flattenArgs,
  markerArgTypesOptions,
} from '@/lib/storybook-utils';
import {
  animationOptions,
  colors,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';

const lineChartArgTypes = {
  'line.strokeWidth': {
    defaultValue: 2,
    description: 'Sets the line stroke width',
    control: { type: 'number' },
    table: { category: 'Line props', defaultValue: { summary: '2px' } },
  },
  'line.stroke': {
    control: { type: 'color' },
    table: { category: 'Line props', defaultValue: { summary: '#ef476f' } },
    description: 'Sets the line color',
    if: { arg: 'yAxis', truthy: false },
  },
  'line.curve': {
    control: {
      type: 'select',
      options: [
        'curveLinear',
        'curveBasis',
        'curveBumpX',
        'curveBumpY',
        'curveBundle',
        'curveCardinal',
        'curveNatural',
        'curveStep',
        'curveStepAfter',
        'curveStepBefore',
      ],
    },
    table: { category: 'Line props', defaultValue: { summary: 'curveLinear' } },
    description: 'Sets the type of line curve ',
  },
  'line.beta': {
    // eslint-disable-next-line object-curly-newline
    control: { type: 'range', min: 0, max: 1, step: 0.1 },
    table: { category: 'Line props', defaultValue: { summary: '0' } },
    description: 'Determines the straigthness of the spline',
  },
  ...markerArgTypesOptions,
  ...baseChartArgTypes,
  yAxis: {
    control: { type: 'object' },
    table: {
      category: 'Multi chart Y Axis Options',
      defaultValue: { summary: 'yValues' },
    },
    description: 'Sets the Y axis domain keys and title for multi chart',
    if: { arg: 'yAxis', truthy: true },
  },

  // area: { control: { type: 'color' } },
};

const meta: Meta = {
  title: 'Vue/Line Chart',
  component: LineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args) => ({
  title: 'Default',
  components: { LineChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <LineChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const LineErrorMarginTemplate: Story = (args) => ({
  title: 'LineErrorMargin',
  components: { LineErrorMarginChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <LineErrorMarginChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const MultiLineTemplate: Story = (args) => ({
  title: 'MultiLine',
  components: { MultiLineChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <MultiLineChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear',
    beta: 0,
  },
  isRTL: false,
  dimensions: { width: 800, height: 600 },
  marker: {
    hidden: false,
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
  data: evolutionData,
});

Default.args = defaultArguments;

export const LineErrorMargin = LineErrorMarginTemplate.bind({});

LineErrorMargin.args = {
  ...defaultArguments,
  area: {
    fill: `${colors[1]}b0`,
  },
};

export const MultiLine = MultiLineTemplate.bind({});

MultiLine.args = {
  ...defaultArguments,
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};
