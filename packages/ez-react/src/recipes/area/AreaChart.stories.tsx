import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AreaChart, AreaChartProps } from '@/recipes/area/AreaChart';
import { ChartWrapper, buildTemplate } from '../../lib/storybook-utils';
import {
  flattenArgs,
  BASE_CHART_ARG_TYPES,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';

const areaChartArgTypes = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('area'),
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

const Template: Story<AreaChartProps> = buildTemplate(
  (args: AreaChartProps) => {
    return (
      <ChartWrapper>
        <AreaChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const defaultArguments = flattenArgs({
  area: {
    stroke: colors[0],
    strokeWidth: 2,
    fill: colors[0],
    opacity: 0.5,
  },
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
    domainKey: 'yValue',
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
    nice: 0,
  },
  data: evolutionData,
});

Default.args = defaultArguments;
