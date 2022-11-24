import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ScatterChart,
  ScatterChartProps,
} from '@/recipes/scatter/ScatterChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import { flattenArgs, baseChartArgTypes } from 'eazychart-dev/storybook/utils';
import { colors, correlationData } from 'eazychart-dev/storybook/data';

const scatterChartArgTypes = {
  ...baseChartArgTypes,
  'point.radius': {
    control: { type: 'number' },
    table: { category: 'point props', defaultValue: { summary: '5px' } },
    description: 'Sets the point radius',
  },
  'point.color': {
    control: { type: 'color' },
    table: { category: 'point props', defaultValue: { summary: '#FF3366' } },
    description: 'Sets the point color',
  },
  yAxis: {
    table: {
      disable: true,
    },
  },
};

const meta: Meta = {
  id: '7',
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
  point: {
    color: colors[1],
    radius: 5,
  },
});

Default.args = defaultArguments;
