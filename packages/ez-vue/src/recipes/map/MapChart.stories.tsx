import { Meta, Story } from '@storybook/vue';
import MapChart from '@/recipes/map/MapChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  animationOptions,
  mapData,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  BASE_CHART_ARG_TYPES,
  flattenArgs,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';

const MapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('mapData'),
  ...getArgTypesByProp('map'),
};

const meta: Meta = {
  id: '9',
  title: 'Vue/Map Chart',
  component: MapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: MapChartArgs,
};

export default meta;

type MapChartProps = InstanceType<typeof MapChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: MapChartProps) => ({
  title: 'Default',
  components: { MapChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <MapChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  map: {
    geoDomainKey: 'adm1_code',
    valueDomainKey: 'population',
    projectionType: 'geoMercator',
    stroke: '#ffffff',
    fill: '#324678',
  },
  dimensions: { width: 800, height: 600 },
  padding,
  animationOptions,
  colors: ['red', 'yellow', 'blue'],
  mapData,
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
