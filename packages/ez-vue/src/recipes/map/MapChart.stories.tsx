import { Meta, Story } from '@storybook/vue';
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
import {
  GeoFeatureCollection,
  GeoProjectionType,
} from 'eazychart-core/src/types';
import MapChart from '@/recipes/map/MapChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';

const mapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('geoJson'),
};

const meta: Meta = {
  title: 'Vue/Map Chart',
  component: MapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: mapChartArgs,
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
  data: (mapData as GeoFeatureCollection).features.map((feature, idx) => ({
    admin: feature.properties?.admin,
    value: idx,
  })),
});

Default.args = defaultArguments;
