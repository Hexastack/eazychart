import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ColumnChart, ColumnChartProps } from '@/recipes/column/ColumnChart';
import {
  LineColumnChart,
  LineColumnChartProps,
} from '@/recipes/column/LineColumnChart';
import { baseChartArgTypes, ChartWrapper } from './lib/utils';
import { colors, rawData } from 'eazychart-dev/storybook/data';

const meta: Meta = {
  title: 'Column Chart',
  component: ColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<ColumnChartProps> = (args) => {
  return (
    <ChartWrapper>
      <ColumnChart {...args} />
    </ChartWrapper>
  );
};

const LineColumnTemplate: Story<LineColumnChartProps> = (args) => {
  return (
    <ChartWrapper>
      <LineColumnChart {...args} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = {
  colors,
  grid: { directions: [] },
  xAxis: {
    domainKey: 'name',
    title: 'Letter',
  },
  yAxis: {
    domainKey: 'value',
    title: 'Count',
    nice: 2,
  },
  rawData,
};

Default.args = defaultArguments;

export const LineColumn = LineColumnTemplate.bind({});

const lineColumnArguments = {
  ...defaultArguments,
  line: {
    strokeWidth: 2,
    stroke: '#81248d',
  },
  marker: {
    hidden: false,
    radius: 5,
    color: '#c400c4',
  },
  yLineAxis: {
    domainKey: 'v',
    title: 'Value',
    nice: 2,
  },
};

LineColumn.args = lineColumnArguments;
