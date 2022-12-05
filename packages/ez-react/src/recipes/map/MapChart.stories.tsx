import React from 'react';
import { Meta, Story } from '@storybook/react';
import { mapData } from 'eazychart-dev/storybook/data';
import { MapChartProps, MapChart } from '@/recipes/map/MapChart';

const MapChartArgs = {
  mapData: {
    table: { category: 'Map Chart Data' },
  },
  animationOptions: {
    table: {
      disable: true,
    },
  },
  isRTL: {
    table: {
      disable: true,
    },
  },
  scopedSlots: {
    table: {
      disable: true,
    },
  },
  grid: {
    table: {
      disable: true,
    },
  },
  projectionType: {
    control: {
      type: 'select',
      options: [
        'geoMercator',
        'geoTransverseMercator',
        'geoOrthographic',
        'geoEqualEarth',
        'geoEquirectangular',
        'geoNaturalEarth1',
        'geoAzimuthalEqualArea',
        'geoGnomonic',
        'geoStereographic',
        'geoConicConformal',
        'geoConicEqualArea',
        'geoConicEquidistant',
      ],
    },
    table: {
      category: 'Projection options',
      defaultValue: { summary: 'geoMeractor' },
    },
    description: 'Sets the projection type',
  },
  stroke: {
    control: { type: 'color' },
    table: { category: 'MapChartColor', defaultValue: { summary: 'black' } },
    description: 'Sets the map path color',
  },
  fill: {
    control: { type: 'color' },
    table: { category: 'MapChartColor', defaultValue: { summary: 'green' } },
    description: 'Sets the map color',
  },
  scale: {
    control: { type: 'number' },
    table: { category: 'MapChart scale', defaultValue: { summary: '100' } },
    description: 'Sets the Chart scale',
  },
};
const meta: Meta = {
  id: '8',
  title: 'React/Map chart',
  component: MapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: MapChartArgs,
};

export default meta;

const DefaultTemplate: Story<MapChartProps> = (args) => {
  return <MapChart {...args} />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

Default.args = {
  data: [],
  mapData: mapData.features,
  projectionType: 'geoMercator',
  stroke: '#ffffff',
  fill: '#324678',
  dimensions: { width: 800, height: 600 },
  scale: 100,
};
