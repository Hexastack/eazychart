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
  getArgTypesByProp,
  PIE_ARGTYPES,
} from 'eazychart-dev/storybook/utils';
import PieChart from './PieChart';
import SemiCircleChart from './SemiCircleChart';
import IrregularPieChart from './IrregularPieChart';

const pieChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...PIE_ARGTYPES,
  ...getArgTypesByProp('arc'),
};

const meta: Meta = {
  title: 'Vue/Pie Chart',
  component: PieChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: pieChartArgTypes,
};
export default meta;

type PieChartProps = InstanceType<typeof PieChart>['$props'];
type SemiCircleChartProps = InstanceType<typeof SemiCircleChart>['$props'];
type IrregularPieChartProps = InstanceType<typeof IrregularPieChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: PieChartProps) => ({
  title: 'Default',
  components: { PieChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <PieChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

const SemiCircleTemplate: Story = buildTemplate(
  (args: SemiCircleChartProps) => ({
    title: 'Default',
    components: { SemiCircleChart, ChartWrapper },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ChartWrapper>
      <SemiCircleChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
  }),
);

const IrregularTemplate: Story = buildTemplate(
  (args: IrregularPieChartProps) => ({
    title: 'Default',
    components: { IrregularPieChart, ChartWrapper },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ChartWrapper>
      <IrregularPieChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
  }),
);

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  colors,
  valueDomainKey: 'value',
  labelDomainKey: 'name',
  dimensions: { width: 800, height: 600 },
  animationOptions,
  padding,
  arc: {
    donutRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    strokeWidth: 0,
  },
  data: rawData,
});

Default.args = defaultArguments;

export const SemiCircle = SemiCircleTemplate.bind({});

SemiCircle.args = defaultArguments;

export const Irregular = IrregularTemplate.bind({});

Irregular.args = defaultArguments;
