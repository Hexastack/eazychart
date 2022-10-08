import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  dimensions,
  tooltip,
  rawData,
  colorScale,
} from 'eazychart-core/src/sample-data';
import Pie from '@/components/Pie';

describe('Pie', () => {
  it('renders svg pie with the right coordinates / dimensions', async () => {
    const wrapper = render(Pie, {
      propsData: {
        valueDomainKey: 'amount',
        labelDomainKey: 'label',
        donutRadius: 0,
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
          colorScale,
        },
        tooltip,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
