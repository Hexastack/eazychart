import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PieChart, PieChartProps } from '@/recipes/pie/PieChart';
import {
  SemiCircleChart,
  SemiCircleChartProps,
} from '@/recipes/pie/SemiCircleChart';
import { RadialChart, RadialChartProps } from '@/recipes/pie/RadialChart';
import { ChartWrapper } from '@/lib/storybook-utils';
import { colors, rawData } from 'eazychart-dev/storybook/data';
import {
  IrregularPieChart,
  IrregularPieChartProps,
} from '@/recipes/pie/IrregularPieChart';

const meta: Meta = {
  id: '6',
  title: 'React/Pie Chart',
  component: PieChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
};

export default meta;

const DefaultTemplate: Story<PieChartProps> = (args) => {
  return (
    <ChartWrapper>
      <PieChart {...args} />
    </ChartWrapper>
  );
};

const SemiCircleTemplate: Story<SemiCircleChartProps> = (args) => {
  return (
    <ChartWrapper>
      <SemiCircleChart {...args} />
    </ChartWrapper>
  );
};

const RadialTemplate: Story<RadialChartProps> = (args) => {
  return (
    <ChartWrapper>
      <RadialChart {...args} />
    </ChartWrapper>
  );
};

const IrregularTemplate: Story<IrregularPieChartProps> = (args) => {
  return (
    <ChartWrapper>
      <IrregularPieChart {...args} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  colors,
  domainKey: 'value',
  data: rawData,
  padding: {
    left: 150,
    bottom: 100,
    right: 150,
    top: 100,
  },
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
