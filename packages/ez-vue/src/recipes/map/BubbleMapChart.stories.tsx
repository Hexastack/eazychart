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
import BubbleMapChart from '@/recipes/map/BubbleMapChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';

const BubbleMapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('geoJson'),
  ...getArgTypesByProp('bubbles'),
};

const meta: Meta = {
  title: 'Vue/Map Chart/BubbleMap',
  component: BubbleMapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: BubbleMapChartArgs,
};

export default meta;

type BubbleMapChartProps = InstanceType<typeof BubbleMapChart>['$props'];

const DefaultTemplate: Story = buildTemplate((args: BubbleMapChartProps) => ({
  title: 'BubbleMap',
  components: { BubbleMapChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <BubbleMapChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

// By passing and using the Args format for exported stories,
// you can control the props of a component for reusing it in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const BubbleMap = DefaultTemplate.bind({});

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
  geoJson: mapData,
  bubbles: {
    minRange: 0,
    maxRange: 30,
    opacity: 0.5,
    fill: 'orange',
    stroke: 'black',
  },
  data: (mapData as GeoFeatureCollection).features.map((feature, idx) => ({
    admin: feature.properties?.admin,
    value: idx,
  })),
});

BubbleMap.args = defaultArguments;
