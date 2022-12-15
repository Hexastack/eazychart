import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RadialChart, RadialChartProps } from '@/recipes/pie/RadialChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  PIE_ARGTYPES,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  rawData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { DISABLED_DEFAULT_ARG } from 'eazychart-dev/storybook/storybook-configs';

const pieChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...PIE_ARGTYPES,
  arc: DISABLED_DEFAULT_ARG,
};

const meta: Meta = {
  id: '8',
  title: 'React/Pie Chart/Radial',
  component: RadialChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: pieChartArgTypes,
};

export default meta;

const RadialTemplate: Story<RadialChartProps> = buildTemplate(
  (args: RadialChartProps) => {
    return (
      <ChartWrapper>
        <RadialChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing

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
