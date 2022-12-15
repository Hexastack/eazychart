/* eslint-disable object-curly-newline */
import { Meta, Story } from '@storybook/vue';
import {
  colors,
  rawData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  PIE_ARGTYPES,
} from 'eazychart-dev/storybook/utils';
import { DISABLED_DEFAULT_ARG } from 'eazychart-dev/storybook/storybook-configs';
import RadialChart from './RadialChart';

const pieChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...PIE_ARGTYPES,
  arc: DISABLED_DEFAULT_ARG,
};

const meta: Meta = {
  title: 'Vue/Pie Chart/Radial',
  component: RadialChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: pieChartArgTypes,
};
export default meta;

type RadialChartProps = InstanceType<typeof RadialChart>['$props'];

const RadialTemplate: Story = buildTemplate((args: RadialChartProps) => ({
  title: 'Default',
  components: { RadialChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <RadialChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
const defaultArguments = flattenArgs({
  colors,
  valueDomainKey: 'value',
  labelDomainKey: 'name',
  dimensions: { width: 800, height: 600 },
  animationOptions,
  padding,
  data: rawData,
});

export const Radial = RadialTemplate.bind({});

Radial.args = defaultArguments;
