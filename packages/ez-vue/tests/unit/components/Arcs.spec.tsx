import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  chartData,
  dimensions,
  scales,
  tooltip,
  radialLinearScale,
} from '@ez/dev/jest/data';
import Arcs from '@/components/Arcs';

describe('Arcs', () => {
  it('renders svg radial with the right coordinates / dimensions', async () => {
    const wrapper = render(Arcs, {
      propsData: {
        arcScale: radialLinearScale,
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

    const wrapper2 = render(Arcs, {
      propsData: {
        arcScale: radialLinearScale,
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
