import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ColumnChart, ColumnChartProps } from '@/recipes/column/ColumnChart';
import {
  LineColumnChart,
  LineColumnChartProps,
} from '@/recipes/column/LineColumnChart';
import {
  baseChartArgTypes,
  ChartWrapper,
  flattenArgs,
  unFlattenArgs,
} from '@/lib/storybook-utils';
import { colors, rawData } from 'eazychart-dev/storybook/data';

const columnChartArgTypes = {
  'yAxis.nice': {
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
};
const meta: Meta = {
  id: '4',
  title: 'React/Column Chart',
  component: ColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: columnChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<ColumnChartProps> = (args) => {
  const expandedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <ColumnChart {...expandedArgs} />
    </ChartWrapper>
  );
};

const LineColumnTemplate: Story<LineColumnChartProps> = (args) => {
  const expandedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <LineColumnChart {...expandedArgs} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  colors,
  isRTL: false,

  animationOptions: {
    easing: 'easeBack',
    duration: 400,
    delay: 0,
  },
  padding: {
    left: 100,
    bottom: 100,
    right: 100,
    top: 100,
  },
  dimensions: { width: 800, height: 600 },
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
});

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
