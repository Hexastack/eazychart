import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BarChart, BarChartProps } from '@/recipes/bar/BarChart';
import { baseChartArgTypes, ChartWrapper } from './lib/utils';
import { colors, dimensions, rawData } from '@ez/dev/storybook/data';

const meta: Meta = {
  title: 'Bar Chart',
  component: BarChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<BarChartProps> = (args) => {
  return (
    <ChartWrapper>
      <BarChart {...args} />
    </ChartWrapper>
  );
};

const TemplateWithParentDimensions: Story<BarChartProps> = (args) => {
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
      <BarChart {...args} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
const initialArguments = {
  colors,
  grid: { directions: [] },
  xAxis: {
    domainKey: 'value',
    title: 'Count',
    nice: 2,
  },
  yAxis: {
    domainKey: 'name',
    title: 'Letter',
  },
  rawData,
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  ...initialArguments,
  dimensions,
};

export const Resizable = TemplateWithParentDimensions.bind({});
Resizable.args = initialArguments;
