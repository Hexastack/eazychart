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
import ColumnChart from './ColumnChart';

const columnChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
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

type ColumnChartProps = InstanceType<typeof ColumnChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: ColumnChartProps) => ({
  title: 'Default',
  components: { ColumnChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <ColumnChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  isRTL: false,
  colors,
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
  data: rawData,
});

Default.args = defaultArguments;
