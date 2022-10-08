import { Meta, Story } from '@storybook/vue';
import { animationOptions, colors, rawData } from 'eazychart-dev/storybook/data';
import { ChartWrapper } from '@/lib/storybook-utils';
import PieChart from './PieChart';
import SemiCircleChart from './SemiCircleChart';
import RadialChart from './RadialChart';
import IrregularPieChart from './IrregularPieChart';

const meta: Meta = {
  title: 'Vue/Pie Chart',
  component: PieChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
};
export default meta;

const DefaultTemplate: Story = (_args, { argTypes }) => ({
  title: 'Default',
  components: { PieChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <PieChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const SemiCircleTemplate: Story = (_args, { argTypes }) => ({
  title: 'Default',
  components: { SemiCircleChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <SemiCircleChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const RadialTemplate: Story = (_args, { argTypes }) => ({
  title: 'Default',
  components: { RadialChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <RadialChart v-bind="$props" />
    </ChartWrapper>
  `,
});

const IrregularTemplate: Story = (_args, { argTypes }) => ({
  title: 'Default',
  components: { IrregularPieChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <IrregularPieChart v-bind="$props" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  colors,
  valueDomainKey: 'value',
  labelDomainKey: 'name',
  padding: {
    left: 150,
    bottom: 100,
    right: 150,
    top: 100,
  },
  animationOptions,
  arc: {
    donutRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    stroke: '#FFF',
    strokeWidth: 0,
    sortValues: null,
  },
  data: rawData,
};

Default.args = defaultArguments;

export const SemiCircle = SemiCircleTemplate.bind({});

SemiCircle.args = defaultArguments;

export const Radial = RadialTemplate.bind({});
Radial.args = {
  ...defaultArguments,
  arc: { ...defaultArguments.arc, spacing: 0.5 },
};

export const Irregular = IrregularTemplate.bind({});
Irregular.args = defaultArguments;
