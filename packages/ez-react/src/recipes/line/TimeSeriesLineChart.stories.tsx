import React from 'react';
import { Args, ArgTypes, Meta, Story } from '@storybook/react';
import { LineCurve } from 'eazychart-core/src/types';
import {
  colors,
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  TimeSeriesLineChart,
  TimeSeriesLineChartProps,
} from '@/recipes/line/TimeSeriesLineChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('line'),
};

const meta: Meta = {
  id: '6',
  title: 'React/Line Chart',
  component: TimeSeriesLineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};

export default meta;

const TimeSeriesLineTemplate: Story<TimeSeriesLineChartProps> = buildTemplate(
  (args: TimeSeriesLineChartProps) => {
    return (
      <ChartWrapper>
        <TimeSeriesLineChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const TimeSeriesLine = TimeSeriesLineTemplate.bind({});

const defaultArguments = flattenArgs({
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear' as LineCurve,
    beta: 1,
  },
  animationOptions,
  isRTL: false,
  padding,
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
    nice: 0,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
    nice: 0,
  },
  data: evolutionData,
});

TimeSeriesLine.args = defaultArguments;
