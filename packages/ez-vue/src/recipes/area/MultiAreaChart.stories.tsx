import { Meta, Story } from '@storybook/vue';
import MultiAreaChart from '@/recipes/area/MultiAreaChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  areaColors,
  colors,
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypes,
  flattenTabArgs,
  setTabArgs,
  cartesianChartArgTypes,
} from 'eazychart-dev/storybook/utils';
import { MULTI_Y_AXIS_CONTROLS } from 'eazychart-dev/storybook/storybook-configs';

const areaChartArgTypes = {
  ...setTabArgs(areaColors, 'colors', 'color'),
  ...MULTI_Y_AXIS_CONTROLS,
  ...markerArgTypes,
  ...baseChartArgTypes,
  ...cartesianChartArgTypes,
};

const meta: Meta = {
  title: 'Vue/Multi Area Chart',
  component: MultiAreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: areaChartArgTypes,
};
export default meta;

type MultiAreaChartProps = InstanceType<typeof MultiAreaChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: MultiAreaChartProps) => ({
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
export const MultiArea = DefaultTemplate.bind({});

const defaultArguments = {
  ...flattenArgs({
    marker: {
      hidden: true,
      radius: 5,
      color: '#FFF',
    },
    animationOptions,
    isRTL: false,
    padding,
    dimensions: { width: 800, height: 600 },
    grid: { directions: [] },
    xAxis: {
      domainKey: 'xValue',
      title: 'Hours',
      tickFormat: (d: number) => `${d}h`,
      nice: 0,
    },
    data: evolutionData,
  }),
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
  ...flattenTabArgs(areaColors, 'colors'),
};

MultiArea.args = defaultArguments;
