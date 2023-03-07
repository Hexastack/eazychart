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
import {
  BubbleZoneMapChart,
  BubbleZoneMapChartProps,
} from './BubbleZoneMapChart';

const mapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('geoJson'),
  ...getArgTypesByProp('bubbles'),
};
const meta: Meta = {
  id: '11',
  title: 'React/Map Chart/BubbleZoneMap',
  component: BubbleZoneMapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: mapChartArgs,
};

export default meta;

const BubbleTemplate: Story<BubbleZoneMapChartProps> = buildTemplate(
  (args: BubbleZoneMapChartProps) => {
    return (
      <ChartWrapper>
        <BubbleZoneMapChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const BubbleZoneMap = BubbleTemplate.bind({});
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
  bubbleColors: ['#FFF80A', '#FEB139', '#D61C4E'],
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

BubbleZoneMap.args = defaultArguments;
