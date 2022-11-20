import { Meta, Story } from '@storybook/vue';
import {
  baseChartArgTypes,
  ChartWrapper,
  unFlattenArgs,
  flattenArgs,
  flattenColors,
  setColorArgs,
} from '@/lib/storybook-utils';
import {
  animationOptions,
  colors,
  padding,
  rawData,
} from 'eazychart-dev/storybook/data';
import ColumnChart from './ColumnChart';
import LineColumnChart from './LineColumnChart';

const columnChartArgTypes = {
  colors: {
    table: {
      disable: true,
    },
  },
  marker: {
    table: {
      disable: true,
    },
  },
  'marker.color': {
    control: { type: 'color' },
    table: { category: 'Marker options', defaultValue: { summary: '#FFF' } },
    description: 'Sets the marker color',
    if: { arg: 'yLineAxis', truthy: true },
  },
  'marker.hidden': {
    control: { type: 'boolean' },
    table: { category: 'Marker options', defaultValue: { summary: true } },
    description: 'Toggles the marker',
    if: { arg: 'yLineAxis', truthy: true },
  },
  'marker.radius': {
    control: { type: 'number' },
    table: { category: 'Marker options', defaultValue: { summary: '5px' } },
    description: 'Sets the marker radius',
    if: { arg: 'yLineAxis', truthy: true },
  },
  'yAxis.nice': {
    control: { type: 'number' },
    table: { category: 'Axis Options', defaultValue: { summary: '2' } },
    description: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
  'line.strokeWidth': {
    control: { type: 'number' },
    table: { category: 'Line Options', defaultValue: { summary: '2' } },
    description: 'Sets the line stroke width',
  },
  'line.stroke': {
    control: { type: 'color' },
    table: { category: 'Line Options', defaultValue: { summary: '#81248d' } },
    description: 'Sets the line stroke color',
  },
  ...setColorArgs(colors),
  ...baseChartArgTypes,
};

const meta: Meta = {
  title: 'Vue/Column Chart',
  component: ColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: columnChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (args) => ({
  title: 'Default',
  components: { ColumnChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <ColumnChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const LineColumnTemplate: Story = (args) => ({
  title: 'LineColumn',
  components: { LineColumnChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <LineColumnChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  ...flattenArgs({
    isRTL: false,
    animationOptions,
    padding,
    dimensions: { width: 800, height: 600 },
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
    data: rawData,
  }),
  ...flattenColors(colors),
};

Default.args = defaultArguments;

export const LineColumn = LineColumnTemplate.bind({});

const lineColumnArguments = {
  ...defaultArguments,
  yLineAxis: {
    domainKey: 'v',
    title: 'Value',
    nice: 2,
  },
  ...flattenArgs({
    line: {
      strokeWidth: 2,
      stroke: '#81248d',
    },
    marker: {
      hidden: false,
      radius: 5,
      color: '#c400c4',
    },
  }),
};

LineColumn.args = lineColumnArguments;
