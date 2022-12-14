import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ColumnChart, ColumnChartProps } from '@/recipes/column/ColumnChart';

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

const columnChartArgTypes = {
  ...baseChartArgTypes,
  ...getArgTypesByProp('grid'),
  ...getArgTypesByProp('xAxis', { omit: ['domainKeys'] }),
  ...getArgTypesByProp('yAxis', { omit: ['domainKeys'] }),
};

const meta: Meta = {
  id: '5',
  title: 'React/Column Chart',
  component: ColumnChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: columnChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<ColumnChartProps> = buildTemplate(
  (args: ColumnChartProps) => {
    return (
      <ChartWrapper>
        <ColumnChart {...args} />
      </ChartWrapper>
    );
  }
);
// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  isRTL: false,
  colors,
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
  data: rawData,
});

Default.args = defaultArguments;
