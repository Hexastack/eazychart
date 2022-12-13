import React from 'react';
import { Args, ArgTypes, Meta, Story } from '@storybook/react';
import { LineCurve } from 'eazychart-core/src/types';
import {
  colors,
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { LineChart, LineChartProps } from '@/recipes/line/LineChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  LineErrorMarginChart,
  LineErrorMarginChartProps,
} from '@/recipes/line/LineErrorMarginChart';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...baseChartArgTypes,
  ...getArgTypesByProp('line'),
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('area', {
    omit: ['stroke', 'curve', 'beta', 'strokeWidth', 'opacity'],
  }),
};

const meta: Meta = {
  id: '6',
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

Default.args = defaultArguments;

export const LineWithErrorMargin = LineErrorMarginTemplate.bind({});

LineWithErrorMargin.args = {
  ...defaultArguments,
  area: {
    fill: `${colors[1]}b0`,
  },
};
