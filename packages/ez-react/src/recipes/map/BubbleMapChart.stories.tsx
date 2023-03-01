import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  mapData,
  padding,
  animationOptions,
} from 'eazychart-dev/storybook/data';
import {
  GeoFeatureCollection,
  GeoProjectionType,
} from 'eazychart-core/src/utils/types';
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
  ...getArgTypesByProp('bubbles'),
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
    fill: 'black',
  },
  dimensions: { width: 800, height: 600 },
  padding,
  animationOptions,
  colors: ['white', 'pink', 'red'],
  geoJson: mapData,
  bubbles: {
    minRange: 0,
    maxRange: 30,
    opacity: 0.5,
    fill: 'orange',
    stroke: 'black',
  },
  data: (mapData as GeoFeatureCollection).features.map((feature, idx) => {
    return {
      admin: feature.properties?.admin,
      value: idx,
    };
  }),
});

BubbleMap.args = defaultArguments;
