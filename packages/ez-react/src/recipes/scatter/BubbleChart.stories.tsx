import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BubbleChart, BubbleChartProps } from '@/recipes/scatter/BubbleChart';
import {
  ChartWrapper,
  unFlattenArgs,
  flattenArgs,
  baseChartArgTypes,
} from '@/lib/storybook-utils';
import { correlationData } from 'eazychart-dev/storybook/data';
const bubbleChartArgTypes = {
  'bubble.minRadius': {
    control: { type: 'number' },
    table: { category: 'Bubble props', defaultValue: { summary: '1px' } },
    description: 'Sets the minimum bubble radius',
  },
  'bubble.domainKey': {
    table: { category: 'Bubble props', defaultValue: { summary: 'rValue' } },
    description: 'Sets the domain key',
  },
  'bubble.maxRadius': {
    control: { type: 'number' },
    table: { category: 'Bubble props', defaultValue: { summary: '25px' } },
    description: 'Sets the max bubble radius',
  },
  'bubble.fill': {
    control: { type: 'color' },
    table: { category: 'Bubble props', defaultValue: { summary: 'Color' } },
    description: 'Sets the bubble color',
  },

  yAxis: {
    table: {
      disable: true,
    },
  },
  ...baseChartArgTypes,
};

const meta: Meta = {
  id: '8',
  title: 'React/Bubble Chart',
  component: BubbleChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: bubbleChartArgTypes,
};

export default meta;

const bubbleTemplate: Story<BubbleChartProps> = (args) => {
  const extendedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <BubbleChart {...extendedArgs} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = bubbleTemplate.bind({});

const defaultArguments = flattenArgs({
  grid: { directions: [] },
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
  data: correlationData,
  bubble: {
    domainKey: 'rValue',
    minRadius: 1,
    maxRadius: 25,
    fill: 'rgba(209, 46, 84, 0.5)',
  },
});

Default.args = {
  ...defaultArguments,
};
