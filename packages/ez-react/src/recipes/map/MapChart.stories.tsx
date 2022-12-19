import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  mapData,
  padding,
  animationOptions,
} from 'eazychart-dev/storybook/data';
import { MapChartProps, MapChart } from '@/recipes/map/MapChart';
import { ProjectionType } from 'eazychart-core/src/utils/types';
import {
  BASE_CHART_ARG_TYPES,
  flattenArgs,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import { ChartWrapper, buildTemplate } from '../../lib/storybook-utils';

const MapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('mapData'),
};
const meta: Meta = {
  id: '11',
  title: 'React/Map chart',
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
    geoDomainKey: 'adm1_code',
    valueDomainKey: 'population',
    projectionType: 'geoMercator' as ProjectionType,
    stroke: '#ffffff',
    fill: '#324678',
  },
  dimensions: { width: 800, height: 600 },
  padding,
  animationOptions,

  colors: ['red', 'yellow', 'blue'],
  mapData: mapData,
  data: [
    {
      population: 1,
      adm1_code: 'USA-3514',
    },
    {
      population: 5,
      adm1_code: 'USA-3515',
    },
    {
      population: 40,
      adm1_code: 'USA-3516',
    },
    {
      population: 55,
      adm1_code: 'USA-3526',
    },
    {
      population: 100,
      adm1_code: 'USA-3527',
    },
  ],
});

Default.args = defaultArguments;
