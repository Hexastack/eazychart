import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  LineColumnChart,
  LineColumnChartProps,
} from '@/recipes/column/LineColumnChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import {
  colors,
  rawData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { LINE_COLUMN_CONTROLS } from 'eazychart-dev/storybook/storybook-configs';

const columnChartArgTypes = {
  ...baseChartArgTypes,
  ...LINE_COLUMN_CONTROLS,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('marker'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
  // ...setTabArgs(colors, 'colors', 'color'),
};
const meta: Meta = {
  id: '11',
  title: 'React/Line Column Chart',
  component: LineColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: columnChartArgTypes,
};

export default meta;

const LineColumnTemplate: Story<LineColumnChartProps> = buildTemplate(
  (args: LineColumnChartProps) => {
    return (
      <ChartWrapper>
        <LineColumnChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing

const defaultArguments = {
  ...flattenArgs({
    isRTL: false,
    animationOptions,
    padding,
    dimensions: { width: 800, height: 600 },
    grid: { directions: [] },
    xAxis: {
      domainKey: 'name',
      title: 'Letter',
      nice: 0,
    },
    yAxis: {
      domainKey: 'value',
      title: 'Count',
      nice: 2,
    },
    line: {
      strokeWidth: 2,
      stroke: '#81248d',
    },
    marker: {
      hidden: false,
      radius: 5,
      color: '#c400c4',
    },
    data: rawData,
  }),
  colors,
  // ...flattenTabArgs(colors, 'colors'),
};

export const LineColumn = LineColumnTemplate.bind({});

const lineColumnArguments = {
  ...defaultArguments,
  yLineAxis: {
    domainKey: 'v',
    title: 'Value',
    nice: 2,
  },
};

LineColumn.args = lineColumnArguments;
