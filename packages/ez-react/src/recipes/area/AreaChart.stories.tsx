import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AreaChart, AreaChartProps } from '@/recipes/area/AreaChart';
import {
  ChartWrapper,
  flattenArgs,
  unFlattenArgs,
  baseChartArgTypes,
  markerArgTypesOptions,
} from '../../lib/storybook-utils';
import { colors, evolutionData } from 'eazychart-dev/storybook/data';
import { MultiAreaChart, MultiAreaChartProps } from './MultiAreaChart';

const areaChartArgTypes = {
  'area.stroke': {
    control: { type: 'color' },
    table: { category: 'Area props', defaultValue: { summary: 'color' } },
    description: 'Sets the stroke color',
    if: { arg: 'yAxis', truthy: false },
  },
  'area.strokeWidth': {
    control: { type: 'number' },
    table: { category: 'Area props', defaultValue: { summary: '2px' } },
    description: 'Sets the stroke width',
    if: { arg: 'yAxis', truthy: false },
  },
  'area.fill': {
    control: { type: 'color' },
    table: { category: 'Area props', defaultValue: { summary: '#26547c' } },
    description: 'Sets the area color',
    if: { arg: 'yAxis', truthy: false },
  },
  yAxis: {
    control: { type: 'object' },
    table: {
      category: 'Multi chart Y Axis Options',
      defaultValue: { summary: 'yValues' },
    },
    description: 'Sets the Y axis domain keys and title for multi chart',
    //trick to make this argument disappear in the single (default) chart
    if: { arg: 'yAxis', truthy: true },
  },
  ...markerArgTypesOptions,
  ...baseChartArgTypes,
};

const meta: Meta = {
  id: '2',
  title: 'React/Area Chart',
  component: AreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: areaChartArgTypes,
};

export default meta;

const Template: Story<AreaChartProps> = (args) => {
  const extendedArgs = unFlattenArgs(args);
  return (
    <ChartWrapper>
      <AreaChart {...extendedArgs} />
    </ChartWrapper>
  );
};

const MultiAreaTemplate: Story<MultiAreaChartProps> = (args) => {
  const extendedArgs = unFlattenArgs(args);

  return (
    <ChartWrapper>
      <MultiAreaChart {...extendedArgs} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const defaultArguments = flattenArgs({
  area: {
    stroke: colors[0],
    strokeWidth: 2,
    fill: `${colors[0]}b0`,
  },
  marker: {
    hidden: true,
    radius: 5,
    color: '#FFF',
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
  data: evolutionData,
});

Default.args = defaultArguments;

export const MultiArea = MultiAreaTemplate.bind({});

MultiArea.args = {
  ...defaultArguments,
  area: { ...defaultArguments.area, opacity: 0.5 },
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};
