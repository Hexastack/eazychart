import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ChartWrapper, buildTemplate } from '../../lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { MultiAreaChart, MultiAreaChartProps } from './MultiAreaChart';

const areaChartArgTypes = {
  ...baseChartArgTypes,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKey'] }),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('area', { omit: ['stroke', 'fill'] }),
};

const meta: Meta = {
  id: '3',
  title: 'React/Area Chart/MultiArea',
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
export const MultiArea = Template.bind({});

const defaultArguments = flattenArgs({
  area: {
    curve: 'curveLinear',
    beta: 0,
    strokeWidth: 2,
    opacity: 0.5,
  },
  colors: ['#339999', '#993399', '#333399'],
  marker: {
    hidden: true,
    radius: 5,
    color: '#FFF',
  },
  animationOptions,
  isRTL: false,
  padding,
  dimensions: { width: 800, height: 600 },
  grid: { directions: [] },
  xAxis: {
    domainKey: 'xValue',
    title: 'Hours',
    tickFormat: (d: number) => `${d}h`,
    nice: 0,
  },
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
    nice: 0,
  },
  data: evolutionData,
});

MultiArea.args = defaultArguments;
