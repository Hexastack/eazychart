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
  flattenTabArgs,
  setTabArgs,
  getArgTypesByProp,
  baseChartArgTypes,
} from 'eazychart-dev/storybook/utils';
import PieChart from './PieChart';
import SemiCircleChart from './SemiCircleChart';
import RadialChart from './RadialChart';
import IrregularPieChart from './IrregularPieChart';

const pieChartArgTypes = {
  valueDomainKey: {
    control: { type: 'text' },
    table: {
      defaultValue: { summary: 'Sets the domain key value' },
      category: 'PieOptions',
    },
  },
  ...setTabArgs(colors, 'colors', 'color'),
  ...getArgTypesByProp('arc'),
  ...baseChartArgTypes,
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
type RadialChartProps = InstanceType<typeof RadialChart>['$props'];
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

const defaultArguments = {
  ...flattenArgs({
    valueDomainKey: 'value',
    data: rawData,
    padding: {
      left: 150,
      bottom: 100,
      right: 150,
      top: 100,
    },
    dimensions: { width: 800, height: 600 },
    arc: {
      donutRadius: 0,
      cornerRadius: 0,
      padAngle: 0,
      padRadius: 0,
      strokeWidth: 0,
    },
    animationOptions,
  }),
  ...flattenTabArgs(colors, 'colors'),
};

Default.args = defaultArguments;

export const SemiCircle = SemiCircleTemplate.bind({});

SemiCircle.args = defaultArguments;

export const Radial = RadialTemplate.bind({});

Radial.args = {
  ...flattenArgs({
    valueDomainKey: 'value',
    data: rawData,
    padding,
    dimensions: { width: 800, height: 600 },
    animationOptions,
  }),
  ...flattenTabArgs(colors, 'colors'),
  arc: undefined,
};
export const Irregular = IrregularTemplate.bind({});

Irregular.args = defaultArguments;
