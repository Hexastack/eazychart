import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  chartData,
  dimensions,
  scales,
  tooltip,
  verticalLinearScale,
} from '@ez/dev/jest/data';
import IrregularArcs from '@/components/IrregularArcs';

describe('IrregularArcs', () => {
  it('renders svg irregular arcs with the right coordinates / dimensions', async () => {
    const wrapper = render(IrregularArcs, {
      propsData: {
        aScale: verticalLinearScale,
        rScale: verticalLinearScale,
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

    const wrapper2 = render(IrregularArcs, {
      propsData: {
        aScale: verticalLinearScale,
        rScale: verticalLinearScale,
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
