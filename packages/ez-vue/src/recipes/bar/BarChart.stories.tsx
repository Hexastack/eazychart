import { Meta, Story } from '@storybook/vue';
import {
  ChartWrapper,
  ResizableChartWrapper,
  buildTemplate,
} from '@/lib/storybook-utils';
import {
  flattenArgs,
  getArgTypesByProp,
  BASE_CHART_ARG_TYPES,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  rawData,
  animationOptions,
  padding,
  dimensions,
} from 'eazychart-dev/storybook/data';
import ResponsiveChartContainer from '@/components/ResponsiveChartContainer';
import BarChart from './BarChart';

const barChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
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

type BarChartProps = InstanceType<typeof BarChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: BarChartProps) => ({
  components: { BarChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <BarChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

const TemplateWithParentDimensions: Story = buildTemplate(
  (args: BarChartProps) => ({
    title: 'Withparent',
    components: { BarChart, ResizableChartWrapper, ResponsiveChartContainer },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ResizableChartWrapper>
      <ResponsiveChartContainer>
        <BarChart v-bind="allPropsFromArgs" />
      </ResponsiveChartContainer>
    </ResizableChartWrapper>
  `,
  }),
);

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
export const Resizable = TemplateWithParentDimensions.bind({});

const initialArguments = flattenArgs({
  colors,
  grid: { directions: [] },
  xAxis: {
    domainKey: 'value',
    title: 'Count',
    nice: 2,
  },
  animationOptions,
  isRTL: false,
  padding,
  yAxis: {
    domainKey: 'name',
    title: 'Letter',
    nice: 2,
  },
  data: rawData,
});

Default.args = {
  ...initialArguments,
  ...flattenArgs({ dimensions }),
};

Resizable.args = initialArguments;
