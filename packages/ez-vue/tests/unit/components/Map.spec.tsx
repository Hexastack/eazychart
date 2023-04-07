import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  tooltip,
  rawData,
  mapFeatureData,
} from 'eazychart-core/src/sample-data';
import Map from '@/components/Map';

describe('Map', () => {
  it('renders svg areas using GeoJSON features', async () => {
    const wrapper = render(Map, {
      propsData: {
        geoJson: mapFeatureData,
        map: {
          geoDomainKey: 'label',
          valueDomainKey: 'value',
          projectionType: 'geoMercator',
          fill: 'blue',
          stroke: 'red',
        },
      },
      provide: {
        __reactiveInject__: {
          chart: {
            data: rawData,
            dimensions,
            animationOptions: {
              easing: 'easeLinear',
              duration: 0,
              delay: 0,
            },
          },
        },
        tooltip,
      },
    });

    await Vue.nextTick();
    await Vue.nextTick();
    await Vue.nextTick();
    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
