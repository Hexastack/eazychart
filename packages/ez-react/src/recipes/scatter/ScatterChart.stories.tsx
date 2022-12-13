import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ScatterChart,
  ScatterChartProps,
} from '@/recipes/scatter/ScatterChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  getArgTypesByProp,
  cartesianChartArgTypes,
  yAxisArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  correlationData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';

const scatterChartArgTypes = {
  ...getArgTypesByProp('point'),
  ...cartesianChartArgTypes,
  ...yAxisArgTypes,
  ...baseChartArgTypes,
};

const meta: Meta = {
  id: '10',
  title: 'React/Scatter Chart',
  component: ScatterChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: scatterChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<ScatterChartProps> = buildTemplate(
  (args: ScatterChartProps) => {
    return (
      <ChartWrapper>
        <ScatterChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

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
  point: {
    color: colors[1],
    radius: 5,
  },
});

Default.args = defaultArguments;
