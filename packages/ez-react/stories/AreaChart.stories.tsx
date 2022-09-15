import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AreaChart, AreaChartProps } from '@/recipes/area/AreaChart';
import { baseChartArgTypes, ChartWrapper } from './lib/utils';
import { colors, evolutionData } from '@ez/dev/storybook/data';

const meta: Meta = {
  title: 'Area Chart',
  component: AreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};

export default meta;

const Template: Story<AreaChartProps> = (args) => {
  return (
    <ChartWrapper>
      <AreaChart {...args} />
    </ChartWrapper>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  swapAxis: false,
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
  rawData: evolutionData,
};
