/* eslint-disable object-curly-newline */
import { Meta, Story } from '@storybook/vue';
import {
  colors,
  rawData,
  animationOptions,
} from 'eazychart-dev/storybook/data';
import {
  ChartWrapper,
  flattenColors,
  unFlattenArgs,
  flattenArgs,
  paddingArgTypesOptions,
  animationArgTypesOptions,
  dimensionArgTypesOptions,
  setColorArgs,
} from '@/lib/storybook-utils';
import PieChart from './PieChart';
import SemiCircleChart from './SemiCircleChart';
import RadialChart from './RadialChart';
import IrregularPieChart from './IrregularPieChart';

const pieChartArgTypes = {
  colors: {
    table: {
      disable: true,
    },
  },
  scopedSlots: {
    table: {
      disable: true,
    },
  },
  arc: {
    table: {
      disable: true,
    },
  },
  valueDomainKey: {
    table: {
      disable: true,
    },
  },
  labelDomainKey: {
    table: {
      disable: true,
    },
  },
  domainKey: {
    control: { type: 'object' },
  },
  ...setColorArgs(colors),
  'arc.donutRadius': {
    control: { type: 'range', min: 0, max: 1, step: 0.05 },
    table: { category: 'Arc properties', defaultValue: { summary: '0' } },
    description: 'Sets the arc donut radius',
  },
  'arc.cornerRadius': {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    table: { category: 'Arc properties', defaultValue: { summary: '0' } },
  },
  'arc.padAngle': {
    control: { type: 'number' },
    table: { category: 'Arc properties', defaultValue: { summary: '0' } },
    description: 'Sets the arc pad angle angle',
  },
  'arc.padRadius': {
    control: { type: 'number' },
    table: { category: 'Arc properties', defaultValue: { summary: '0' } },
    description: 'Sets the arc pad angle radius',
  },
  'arc.stroke': {
    control: { type: 'color' },
    table: { category: 'Arc properties' },
    description: 'Sets the arc pad color',
  },
  'arc.strokeWidth': {
    control: { type: 'number' },
    table: { category: 'Arc properties', defaultValue: { summary: '0' } },
    description: 'Sets the arc stroke width',
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
  ...paddingArgTypesOptions,
  ...animationArgTypesOptions,
  ...dimensionArgTypesOptions,
  data: {
    control: { type: 'object' },
    table: { defaultValue: { summary: 'Object' }, category: 'Data' },
  },
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

const DefaultTemplate: Story = (args) => ({
  title: 'Default',
  components: { PieChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <PieChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const SemiCircleTemplate: Story = (args) => ({
  title: 'Default',
  components: { SemiCircleChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <SemiCircleChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const RadialTemplate: Story = (args) => ({
  title: 'Default',
  components: { RadialChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <RadialChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

const IrregularTemplate: Story = (args) => ({
  title: 'Default',
  components: { IrregularPieChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => unFlattenArgs(args),
    },
  },
  template: `
    <ChartWrapper>
      <IrregularPieChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
});

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  ...flattenArgs({
    domainKey: 'value',
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
  ...flattenColors(colors),
};

Default.args = defaultArguments;

export const SemiCircle = SemiCircleTemplate.bind({});

SemiCircle.args = defaultArguments;

export const Radial = RadialTemplate.bind({});

Radial.args = {
  ...defaultArguments,
  arc: undefined,
};

export const Irregular = IrregularTemplate.bind({});

Irregular.args = defaultArguments;
