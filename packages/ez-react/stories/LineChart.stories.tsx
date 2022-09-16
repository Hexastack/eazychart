import React from 'react';
import { Meta, Story } from '@storybook/react';
import { colors, evolutionData } from 'eazychart-dev/storybook/data';
import { LineChart, LineChartProps } from '@/recipes/line/LineChart';
import { baseChartArgTypes, ChartWrapper } from './lib/utils';
import {
  LineErrorMarginChart,
  LineErrorMarginChartProps,
} from '@/recipes/line/LineErrorMarginChart';

const meta: Meta = {
  title: 'Line Chart',
  component: LineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<LineChartProps> = (args) => {
  return (
    <ChartWrapper>
      <LineChart {...args} />
    </ChartWrapper>
  );
};

const LineErrorMarginTemplate: Story<LineErrorMarginChartProps> = (args) => {
  return (
    <ChartWrapper>
      <LineErrorMarginChart {...args} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  swapAxis: false,
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear',
    beta: 0,
  },
  marker: {
    hidden: false,
    radius: 5,
    color: '#FFF',
  },
  grid: { directions: [] },
  xAxis: {
    domainKey: 'xValue',
    title: 'Hours',
    tickFormat: (d: number) => `${d}h`,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
  rawData: evolutionData,
};

Default.args = defaultArguments;

export const LineWithErrorMargin = LineErrorMarginTemplate.bind({});

LineWithErrorMargin.args = {
  ...defaultArguments,
  area: {
    fill: `${colors[1]}b0`,
  },
};
