import { Meta, Story } from '@storybook/vue';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  animationOptions,
  colors,
  padding,
  rawData,
} from 'eazychart-dev/storybook/data';
import LineColumnChart from './LineColumnChart';

const columnChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yLineAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('line'),
};
const meta: Meta = {
  title: 'Vue/Column Chart/LineColumn',
  component: LineColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: columnChartArgTypes,
};
export default meta;

type LineColumnChartProps = InstanceType<typeof LineColumnChart>['$props'];

const LineColumnTemplate: Story = buildTemplate(
  (args: LineColumnChartProps) => ({
    title: 'LineColumn',
    components: { LineColumnChart, ChartWrapper },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ChartWrapper>
      <LineColumnChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
  }),
);

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const LineColumn = LineColumnTemplate.bind({});

const defaultArguments = flattenArgs({
  colors,
  isRTL: false,
  animationOptions,
  padding,
  dimensions: { width: 800, height: 600 },
  grid: { directions: [] },
  xAxis: {
    domainKey: 'name',
    title: 'Letter',
    nice: 0,
  },
  yAxis: {
    domainKey: 'value',
    title: 'Count',
    nice: 2,
  },
  line: {
    strokeWidth: 2,
    stroke: '#81248d',
    beta: 0,
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
  data: rawData,
});

LineColumn.args = defaultArguments;
