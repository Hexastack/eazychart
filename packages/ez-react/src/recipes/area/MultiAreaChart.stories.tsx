import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ChartWrapper, buildTemplate } from '../../lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypesOptions,
} from 'eazychart-dev/storybook/utils';
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
  ...markerArgTypesOptions,
  ...baseChartArgTypes,
};

const meta: Meta = {
  id: '9',
  title: 'React/Multi Area Chart',
  component: MultiAreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: areaChartArgTypes,
};

export default meta;

const Template: Story<MultiAreaChartProps> = buildTemplate(
  (args: MultiAreaChartProps) => {
    return (
      <ChartWrapper>
        <MultiAreaChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing

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

export const MultiArea = Template.bind({});

// make an area const in data and spread it here and in default args
MultiArea.args = {
  ...defaultArguments,
  area: {
    stroke: colors[0],
    strokeWidth: 2,
    fill: `${colors[0]}b0`,
    opacity: 0.5,
  },
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};
