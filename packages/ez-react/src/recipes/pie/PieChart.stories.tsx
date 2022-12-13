import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PieChart, PieChartProps } from '@/recipes/pie/PieChart';
import {
  SemiCircleChart,
  SemiCircleChartProps,
} from '@/recipes/pie/SemiCircleChart';
import { RadialChart, RadialChartProps } from '@/recipes/pie/RadialChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  flattenTabArgs,
  setTabArgs,
  getArgTypesByProp,
  baseChartArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  rawData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  IrregularPieChart,
  IrregularPieChartProps,
} from '@/recipes/pie/IrregularPieChart';

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
  id: '8',
  title: 'React/Pie Chart',
  component: PieChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: pieChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<PieChartProps> = buildTemplate(
  (args: PieChartProps) => {
    return (
      <ChartWrapper>
        <PieChart {...args} />
      </ChartWrapper>
    );
  }
);

const SemiCircleTemplate: Story<SemiCircleChartProps> = buildTemplate(
  (args: SemiCircleChartProps) => {
    return (
      <ChartWrapper>
        <SemiCircleChart {...args} />
      </ChartWrapper>
    );
  }
);

const RadialTemplate: Story<RadialChartProps> = buildTemplate(
  (args: RadialChartProps) => {
    return (
      <ChartWrapper>
        <RadialChart {...args} />
      </ChartWrapper>
    );
  }
);

const IrregularTemplate: Story<IrregularPieChartProps> = buildTemplate(
  (args: IrregularPieChartProps) => {
    return (
      <ChartWrapper>
        <IrregularPieChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
const defaultArguments = {
  ...flattenArgs({
    valueDomainKey: 'value',
    data: rawData,
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
  }),
  ...flattenTabArgs(colors, 'colors'),
  arc: undefined,
};

export const Irregular = IrregularTemplate.bind({});

Irregular.args = defaultArguments;
