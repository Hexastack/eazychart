import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  tooltip,
  rawData,
  radialLinearScale,
  colorScale,
} from 'eazychart-core/src/sample-data';
import Arcs from '@/components/Arcs';

describe('Arcs', () => {
  it('renders svg radial with the right coordinates / dimensions', async () => {
    const wrapper = render(Arcs, {
      propsData: {
        valueDomainKey: 'amount',
        labelDomainKey: 'label',
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
          linearScale: radialLinearScale,
          colorScale,
        },
        tooltip,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
