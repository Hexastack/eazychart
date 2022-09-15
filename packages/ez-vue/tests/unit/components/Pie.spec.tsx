import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  chartData,
  dimensions,
  scales,
  tooltip,
  horizontalLinearScale,
} from '@ez/dev/jest/data';
import Pie from '@/components/Pie';

describe('Pie', () => {
  it('renders svg pie with the right coordinates / dimensions', async () => {
    const wrapper = render(Pie, {
      propsData: {
        aScale: horizontalLinearScale,
        donutRadius: 0,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            activeData: chartData.map((d) => ({ ...d, isActive: true })),
            scales,
            dimensions,
          },
        },
        tooltip,
      },
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(Pie, {
      propsData: {
        aScale: horizontalLinearScale,
        donutRadius: 0,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            activeData: chartData.map((d) => ({ ...d, isActive: true })),
            scales,
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

    expect(wrapper2.container.innerHTML).toMatchSnapshot();
  });
});
