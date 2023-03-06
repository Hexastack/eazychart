import Vue from 'vue';
import {
  colors,
  dimensions,
  mapFeatureData,
  rawData,
} from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import BubbleMapChart from '@/recipes/map/BubbleMapChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('BubbleMapChart', () => {
  it('renders a bubble map chart', async () => {
    const wrapper = render(BubbleMapChart, {
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
        bubbles: {
          minRange: 0,
          maxRange: 30,
          opacity: 0.5,
          fill: 'orange',
          stroke: 'black',
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
