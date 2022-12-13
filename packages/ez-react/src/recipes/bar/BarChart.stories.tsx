import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BarChart, BarChartProps } from '@/recipes/bar/BarChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  flattenTabArgs,
  setTabArgs,
  baseChartArgTypes,
  cartesianChartArgTypes,
  yAxisArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  rawData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { ResponsiveChartContainer } from '@/components/ResponsiveChartContainer';

const barChartArgTypes = {
  ...yAxisArgTypes,
  ...cartesianChartArgTypes,
  ...baseChartArgTypes,
  ...setTabArgs(colors, 'colors', 'color'),
};
const meta: Meta = {
  id: '4',
  title: 'React/Bar Chart',
  component: BarChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: barChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<BarChartProps> = buildTemplate(
  (args: BarChartProps) => {
    return (
      <ChartWrapper>
        <BarChart {...args} />
      </ChartWrapper>
    );
  }
);

const TemplateWithParentDimensions: Story<BarChartProps> = buildTemplate(
  (args: BarChartProps) => {
    return (
      <ChartWrapper
        style={{
          width: '100%',
          height: '100vh',
          border: '2px solid #ccc',
          resize: 'auto',
          overflow: 'scroll',
        }}
      >
        <ResponsiveChartContainer>
          <BarChart {...args} />
        </ResponsiveChartContainer>
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
const initialArguments = {
  ...flattenArgs({
    grid: { directions: [] },
    xAxis: {
      domainKey: 'value',
      title: 'Count',
      nice: 2,
    },
    animationOptions,
    isRTL: false,
    padding,
    dimensions: { width: 800, height: 600 },
    yAxis: {
      domainKey: 'name',
      title: 'Letter',
      nice: 2,
    },
    data: rawData,
  }),
  ...flattenTabArgs(colors, 'colors'),
};

export const Default = DefaultTemplate.bind({});
Default.args = initialArguments;

export const Resizable = TemplateWithParentDimensions.bind({});
Resizable.args = initialArguments;
