import React from 'react';
import { Meta, Story } from '@storybook/react';
import { mapData } from 'eazychart-dev/storybook/data';
import { baseChartArgTypes } from '@/lib/storybook-utils';
import { MapChartProps, MapChart } from '@/recipes/map/MapChart';

const meta: Meta = {
  id: '8',
  title: 'React/Map chart',
  component: MapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};

export default meta;

const DefaultTemplate: Story<MapChartProps> = (args) => {
  return <MapChart data={[]} mapData={args.mapData.features} />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

Default.args = {
  mapData,
};
