import Vue from 'vue';
import {
  colors,
  dimensions,
  mapFeatureData,
  rawData,
} from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import MapChart from '@/recipes/map/MapChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('MapChart', () => {
  it('renders a map chart', async () => {
    const wrapper = render(MapChart, {
      propsData: {
        data: rawData,
        geoJson: mapFeatureData,
        map: {
          geoDomainKey: 'label',
          valueDomainKey: 'value',
          projectionType: 'geoMercator',
          fill: 'blue',
          stroke: 'red',
        },
        dimensions,
        colors,
        animationOptions: {
          easing: 'easeBack',
          duration: 0,
          delay: 0,
        },
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
