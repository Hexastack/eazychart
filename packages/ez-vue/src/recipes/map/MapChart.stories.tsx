import { Meta, Story } from '@storybook/vue';
import MapChart from '@/recipes/map/MapChart';
import { ProjectionTypes } from 'eazychart-core/src/utils/types';
import { baseChartArgTypes, ChartWrapper } from '@/lib/storybook-utils';
import { mapData } from 'eazychart-dev/storybook/data';

const meta: Meta = {
  title: 'Vue/Map Chart',
  component: MapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: baseChartArgTypes,
};
export default meta;

const DefaultTemplate: Story = (_args, { argTypes }) => ({
  title: 'Default',
  components: { MapChart, ChartWrapper },
  props: Object.keys(argTypes),
  template: `
    <ChartWrapper>
      <MapChart v-bind="$props" />
    </ChartWrapper>
  `,
});

// console.log('>>>>>>>>>>>>>>>>>>><', mapData.features);
// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});
const defaultArguments = {
  mapData: mapData.features,
  map: {
    projectionType: 'geoMercator' as ProjectionTypes,
    stroke: '#ffffff',
    fill: '#324678',
    scale: 100,
  },
  dimensions: { width: 800, height: 600 },
};

Default.args = defaultArguments;
