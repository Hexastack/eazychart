import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ColumnChart, ColumnChartProps } from '@/recipes/column/ColumnChart';
import {
  LineColumnChart,
  LineColumnChartProps,
} from '@/recipes/column/LineColumnChart';
import { baseChartArgTypes, ChartWrapper } from '@/lib/storybook-utils';
import { colors, rawData } from 'eazychart-dev/storybook/data';
import {
  StackedColumnChart,
  StackedColumnChartProps,
} from './StackedColumnChart';

const meta: Meta = {
  id: '4',
  title: 'React/Column Chart',
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

const StackedColumnTemplate: Story<StackedColumnChartProps> = (args) => {
  return (
    <ChartWrapper>
      <StackedColumnChart {...args} />
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
  data: rawData,
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

export const StackedColumn = StackedColumnTemplate.bind({});

const StackedColumnArguments = {
  ...defaultArguments,
  yAxis: {
    domainKeys: ['value', 'value1', 'value2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};

StackedColumn.args = StackedColumnArguments;
