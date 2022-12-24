import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  mapData,
  padding,
  animationOptions,
} from 'eazychart-dev/storybook/data';
import { MapChartProps, MapChart } from '@/recipes/map/MapChart';
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

const MapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('geoJson'),
};
const meta: Meta = {
  id: '11',
  title: 'React/Map Chart',
  component: MapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: MapChartArgs,
};

export default meta;

const DefaultTemplate: Story<MapChartProps> = buildTemplate(
  (args: MapChartProps) => {
    return (
      <ChartWrapper>
        <MapChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

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
  data: (mapData as GeoFeatureCollection).features.map((feature, idx) => {
    return {
      admin: feature.properties?.admin,
      value: idx,
    };
  }),
});

Default.args = defaultArguments;
