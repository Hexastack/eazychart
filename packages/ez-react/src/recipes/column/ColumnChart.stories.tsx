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
  flattenColors,
  setColorArgs,
} from '@/lib/storybook-utils';
import { colors, rawData } from 'eazychart-dev/storybook/data';

const columnChartArgTypes = {
  colors: {
    table: {
      disable: true,
    },
  },
  marker: {
    table: {
      disable: true,
    },
  },
  'marker.color': {
    control: { type: 'color' },
    table: { category: 'Marker options', defaultValue: { summary: '#FFF' } },
    description: 'Sets the marker color',
    if: { arg: 'yLineAxis', truthy: true },
  },
  'marker.hidden': {
    control: { type: 'boolean' },
    table: { category: 'Marker options', defaultValue: { summary: true } },
    description: 'Toggles the marker',
    if: { arg: 'yLineAxis', truthy: true },
  },
  'marker.radius': {
    control: { type: 'number' },
    table: { category: 'Marker options', defaultValue: { summary: '5px' } },
    description: 'Sets the marker radius',
    if: { arg: 'yLineAxis', truthy: true },
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
  'yAxis.nice': {
    control: { type: 'number' },
    table: { category: 'Axis Options', defaultValue: { summary: '2' } },
    description: "Rounds the domain to 'nice' values ex: [-0.78,0.9] to [-1,1]",
  },
  'line.strokeWidth': {
    control: { type: 'number' },
    table: { category: 'Line Options', defaultValue: { summary: '2' } },
    description: 'Sets the line stroke width',
  },
  'line.stroke': {
    control: { type: 'color' },
    table: { category: 'Line Options', defaultValue: { summary: '#81248d' } },
    description: 'Sets the line stroke color',
  },
  ...setColorArgs(colors),
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

const defaultArguments = {
  ...flattenArgs({
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
  }),
  ...flattenColors(colors),
};

Default.args = defaultArguments;

export const LineColumn = LineColumnTemplate.bind({});

const lineColumnArguments = {
  ...defaultArguments,
  yLineAxis: {
    domainKey: 'v',
    title: 'Value',
    nice: 2,
  },
  ...flattenArgs({
    line: {
      strokeWidth: 2,
      stroke: '#81248d',
    },
    marker: {
      hidden: false,
      radius: 5,
      color: '#c400c4',
    },
  }),
};

LineColumn.args = lineColumnArguments;
