import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PieChart, PieChartProps } from '@/recipes/pie/PieChart';
import {
  SemiCircleChart,
  SemiCircleChartProps,
} from '@/recipes/pie/SemiCircleChart';
import { RadialChart, RadialChartProps } from '@/recipes/pie/RadialChart';
import {
  ChartWrapper,
  unFlattenArgs,
  flattenArgs,
  animationArgTypesOptions,
  paddingArgTypesOptions,
  dimensionArgTypesOptions,
} from '@/lib/storybook-utils';
import { colors, rawData } from 'eazychart-dev/storybook/data';
import {
  IrregularPieChart,
  IrregularPieChartProps,
} from '@/recipes/pie/IrregularPieChart';

const pieChartArgTypes = {
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
};
const meta: Meta = {
  id: '6',
  title: 'React/Pie Chart',
  component: PieChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: pieChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<PieChartProps> = (args) => {
  const expandedArgs = unFlattenArgs(args);
  return (
    <ChartWrapper>
      <PieChart {...expandedArgs} />
    </ChartWrapper>
  );
};

const SemiCircleTemplate: Story<SemiCircleChartProps> = (args) => {
  const expandedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <SemiCircleChart {...expandedArgs} />
    </ChartWrapper>
  );
};

const RadialTemplate: Story<RadialChartProps> = (args) => {
  const expandedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <RadialChart {...expandedArgs} />
    </ChartWrapper>
  );
};

const IrregularTemplate: Story<IrregularPieChartProps> = (args) => {
  const expandedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <IrregularPieChart {...expandedArgs} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
const defaultArguments = flattenArgs({
  colors,
  domainKey: 'value',
  data: rawData,
  dimensions: { width: 800, height: 600 },
  animationOptions: {
    easing: 'easeBack',
    duration: 400,
    delay: 0,
  },
  padding: {
    left: 150,
    bottom: 100,
    right: 150,
    top: 100,
  },
  arc: {
    donutRadius: 0,
    cornerRadius: 0,
    padAngle: 0,
    padRadius: 0,
    strokeWidth: 0,
  },
});

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
