import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BarChart, BarChartProps } from '@/recipes/bar/BarChart';
import {
  baseChartArgTypes,
  ChartWrapper,
  flattenArgs,
  unFlattenArgs,
  flattenColors,
  setColorArgs,
} from '@/lib/storybook-utils';
import { colors, dimensions, rawData } from 'eazychart-dev/storybook/data';
import { ResponsiveChartContainer } from '@/components/ResponsiveChartContainer';

const barChartArgTypes = {
  colors: {
    table: {
      disable: true,
    },
  },
  'xAxis.nice': {
    control: { type: 'number' },
    table: { category: 'Axis Options', defaultValue: { summary: '2' } },
    description: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
  ...baseChartArgTypes,
  ...setColorArgs(colors),
};
const meta: Meta = {
  id: '3',
  title: 'React/Bar Chart',
  component: BarChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: barChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<BarChartProps> = (args) => {
  const extendedArgs = unFlattenArgs(args);
  return (
    <ChartWrapper>
      <BarChart {...extendedArgs} />
    </ChartWrapper>
  );
};

const TemplateWithParentDimensions: Story<BarChartProps> = (args) => {
  const extendedArgs = unFlattenArgs(args);

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
        <BarChart {...extendedArgs} />
      </ResponsiveChartContainer>
    </ChartWrapper>
  );
};

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
    animationOptions: {
      easing: 'easeBack',
      duration: 400,
      delay: 0,
    },
    isRTL: false,
    padding: {
      left: 100,
      bottom: 100,
      right: 100,
      top: 100,
    },
    dimensions: { width: 800, height: 600 },
    yAxis: {
      domainKey: 'name',
      title: 'Letter',
    },
    data: rawData,
  }),
  ...flattenColors(colors),
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  ...initialArguments,
  dimensions,
};

export const Resizable = TemplateWithParentDimensions.bind({});
Resizable.args = initialArguments;
