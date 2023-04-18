import { Meta, Story } from '@storybook/vue';
import {
  animationOptions,
  mapData,
  mapGeoJson,
  padding,
} from 'eazychart-dev/storybook/data';
import {
  BASE_CHART_ARG_TYPES,
  flattenArgs,
  getArgTypesByProp,
} from 'eazychart-dev/storybook/utils';
import { GeoProjectionType } from 'eazychart-core/src/types';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import BubbleMapChart from './BubbleMapChart';

const mapChartArgs = {
  ...BASE_CHART_ARG_TYPES,
  ...getArgTypesByProp('map'),
  ...getArgTypesByProp('geoJson'),
  ...getArgTypesByProp('bubble'),
};

const meta: Meta = {
  title: 'Vue/Map Chart/BubbleMap',
  component: BubbleMapChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: mapChartArgs,
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

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
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
  bubble: {
    domainKey: 'rValue',
    minRadius: 5,
    maxRadius: 20,
    opacity: 0.5,
    stroke: 'black',
    strokeWidth: 1,
    colors: ['green', 'yellowgreen', 'yellow'],
  },
  geoJson: mapGeoJson,
  data: mapData,
});

BubbleMap.args = defaultArguments;
