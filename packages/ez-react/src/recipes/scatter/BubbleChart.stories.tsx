import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BubbleChart, BubbleChartProps } from '@/recipes/scatter/BubbleChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  getArgTypesByProp,
  cartesianChartArgTypes,
  yAxisArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  correlationData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';

const bubbleChartArgTypes = {
  ...yAxisArgTypes,
  ...cartesianChartArgTypes,
  ...getArgTypesByProp('bubble'),
  ...baseChartArgTypes,
};

const meta: Meta = {
  id: '9',
  title: 'React/Bubble Chart',
  component: BubbleChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: bubbleChartArgTypes,
};

export default meta;

const bubbleTemplate: Story<BubbleChartProps> = buildTemplate(
  (args: BubbleChartProps) => {
    return (
      <ChartWrapper>
        <BubbleChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = bubbleTemplate.bind({});

const defaultArguments = flattenArgs({
  grid: { directions: [] },
  animationOptions,
  isRTL: false,
  padding,
  dimensions: { width: 800, height: 600 },
  xAxis: {
    domainKey: 'xValue',
    title: 'Width',
    tickFormat: (d: number) => `${d}m`,
    nice: 0,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Height',
    tickFormat: (d: number) => `${d}c`,
    nice: 0,
  },
  data: correlationData,
  bubble: {
    domainKey: 'rValue',
    minRadius: 1,
    maxRadius: 25,
    fill: 'rgba(209, 46, 84, 0.5)',
  },
});
Default.args = defaultArguments;
