import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ScatterChart,
  ScatterChartProps,
} from '@/recipes/scatter/ScatterChart';
import { BubbleChart, BubbleChartProps } from '@/recipes/scatter/BubbleChart';
import { baseChartArgTypes, ChartWrapper } from '@/lib/storybook-utils';
import { colors, correlationData } from 'eazychart-dev/storybook/data';

const meta: Meta = {
  id: '7',
  title: 'React/Scatter Chart',
  component: ScatterChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<ScatterChartProps> = (args) => {
  return (
    <ChartWrapper>
      <ScatterChart {...args} />
    </ChartWrapper>
  );
};

const BubbleTemplate: Story<BubbleChartProps> = (args) => {
  return (
    <ChartWrapper>
      <BubbleChart {...args} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  grid: { directions: [] },
  xAxis: {
    domainKey: 'xValue',
    title: 'Width',
    tickFormat: (d: number) => `${d}m`,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Height',
    tickFormat: (d: number) => `${d}c`,
  },
  isRTL: false,
  data: correlationData,
};

Default.args = {
  ...defaultArguments,
  point: {
    color: colors[1],
    radius: 5,
  },
};

export const Bubble = BubbleTemplate.bind({});

Bubble.args = {
  ...defaultArguments,
  bubble: {
    domainKey: 'rValue',
    minRadius: 1,
    maxRadius: 25,
    fill: 'rgba(209, 46, 84, 0.5)',
  },
};
