import React from 'react';
import { Args, ArgTypes, Meta, Story } from '@storybook/react';
import { LineCurve } from 'eazychart-core/src/types';
import {
  areaColors,
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypes,
  getArgTypesByProp,
  cartesianChartArgTypes,
  setTabArgs,
} from 'eazychart-dev/storybook/utils';
import {
  MultiLineChart,
  MultiLineChartProps,
} from '@/recipes/line/MultiLineChart';
import { MULTI_Y_AXIS_CONTROLS } from 'eazychart-dev/storybook/storybook-configs';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...getArgTypesByProp('line'),
  ...setTabArgs(areaColors, 'colors', 'color'),
  ...cartesianChartArgTypes,
  ...markerArgTypes,
  ...baseChartArgTypes,
  ...MULTI_Y_AXIS_CONTROLS,
};

const meta: Meta = {
  id: '7',
  title: 'React/MultiLine Chart',
  component: MultiLineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};

export default meta;

const MultiLineTemplate: Story<MultiLineChartProps> = buildTemplate(
  (args: MultiLineChartProps) => {
    return (
      <ChartWrapper>
        <MultiLineChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing

const defaultArguments = {
  ...flattenArgs({
    colors: ['#339999', '#993399', '#333399'],
    line: {
      strokeWidth: 2,
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
    data: evolutionData,
  }),
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
    nice: 0,
  },
};

export const MultiLine = MultiLineTemplate.bind({});

MultiLine.args = defaultArguments;
