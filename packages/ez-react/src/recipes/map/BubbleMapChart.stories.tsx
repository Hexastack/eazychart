import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  mapData,
  padding,
  animationOptions,
  mapGeoJson,
} from 'eazychart-dev/storybook/data';
import { GeoProjectionType } from 'eazychart-core/src/utils/types';
import {
  BASE_CHART_ARG_TYPES,
  flattenArgs,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import { ChartWrapper, buildTemplate } from '../../lib/storybook-utils';
import { BubbleMapChart, BubbleMapChartProps } from './BubbleMapChart';

const mapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('geoJson'),
  ...getArgTypesByProp('bubble'),
};
const meta: Meta = {
  id: '11',
  title: 'React/Map Chart/BubbleMap',
  component: BubbleMapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: mapChartArgs,
};

export default meta;

const BubbleTemplate: Story<BubbleMapChartProps> = buildTemplate(
  (args: BubbleMapChartProps) => {
    return (
      <ChartWrapper>
        <BubbleMapChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const BubbleMap = BubbleTemplate.bind({});
const defaultArguments = flattenArgs({
  map: {
    geoDomainKey: 'admin',
    valueDomainKey: 'value',
    projectionType: 'geoMercator' as GeoProjectionType,
    stroke: 'black',
    fill: 'white',
  },
  dimensions: { width: 800, height: 600 },
  padding,
  animationOptions,
  colors: ['white', 'pink', 'red'],
  bubble: {
    domainKey: 'rValue',
    minRadius: 5,
    maxRadius: 20,
    opacity: 0.5,
    stroke: 'black',
    strokeWidth: 1,
    colors: ['green', 'yellowgreen', 'yellow'],
  },
  geoJson: mapGeoJson,
  data: mapData,
});

BubbleMap.args = defaultArguments;
