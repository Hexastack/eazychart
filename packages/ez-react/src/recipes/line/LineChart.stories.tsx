import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LineCurve } from 'eazychart-core/src/types';
import { colors, evolutionData } from 'eazychart-dev/storybook/data';
import { LineChart, LineChartProps } from '@/recipes/line/LineChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypesOptions,
} from 'eazychart-dev/storybook/utils';
import {
  LineErrorMarginChart,
  LineErrorMarginChartProps,
} from '@/recipes/line/LineErrorMarginChart';
import {
  MultiLineChart,
  MultiLineChartProps,
} from '@/recipes/line/MultiLineChart';

const lineChartArgTypes = {
  'line.strokeWidth': {
    defaultValue: 2,
    description: 'Sets the line stroke width',
    control: { type: 'number' },
    table: { category: 'Line props', defaultValue: { summary: '2px' } },
  },
  'line.stroke': {
    control: { type: 'color' },
    table: { category: 'Line props', defaultValue: { summary: '#ef476f' } },
    description: 'Sets the line color',
    if: { arg: 'yAxis', truthy: false },
  },
  'line.curve': {
    control: {
      type: 'select',
      options: [
        'curveLinear',
        'curveBasis',
        'curveBumpX',
        'curveBumpY',
        'curveBundle',
        'curveCardinal',
        'curveNatural',
        'curveStep',
        'curveStepAfter',
        'curveStepBefore',
      ],
    },
    table: { category: 'Line props', defaultValue: { summary: 'curveLinear' } },
    description: 'Sets the type of line curve ',
  },
  'line.beta': {
    control: { type: 'range', min: 0, max: 1, step: 0.1 },
    table: { category: 'Line props', defaultValue: { summary: '0' } },
    description: 'Determines the straigthness of the spline',
  },
  ...markerArgTypesOptions,
  ...baseChartArgTypes,
  yAxis: {
    control: { type: 'object' },
    table: {
      category: 'Multi chart Y Axis Options',
      defaultValue: { summary: 'yValues' },
    },
    description: 'Sets the Y axis domain keys and title for multi chart',
    if: { arg: 'yAxis', truthy: true },
  },
};

const meta: Meta = {
  id: '5',
  title: 'React/Line Chart',
  component: LineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<LineChartProps> = buildTemplate(
  (args: LineChartProps) => {
    return (
      <ChartWrapper>
        <LineChart {...args} />
      </ChartWrapper>
    );
  }
);

const MultiLineTemplate: Story<MultiLineChartProps> = buildTemplate(
  (args: MultiLineChartProps) => {
    return (
      <ChartWrapper>
        <MultiLineChart {...args} />
      </ChartWrapper>
    );
  }
);

const LineErrorMarginTemplate: Story<LineErrorMarginChartProps> = buildTemplate(
  (args: LineErrorMarginChartProps) => {
    return (
      <ChartWrapper>
        <LineErrorMarginChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear' as LineCurve,
    beta: 0,
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
  data: evolutionData,
});

Default.args = defaultArguments;

export const MultiLine = MultiLineTemplate.bind({});

MultiLine.args = {
  ...defaultArguments,
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
};

export const LineWithErrorMargin = LineErrorMarginTemplate.bind({});

LineWithErrorMargin.args = {
  ...defaultArguments,
  area: {
    fill: `${colors[1]}b0`,
  },
};
