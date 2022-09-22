import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  chartData,
  dimensions,
  scales,
  tooltip,
  horizontalBandScale,
  verticalLinearScale,
} from 'eazychart-core/src/sample-data';
import Bars from '@/components/Bars';

describe('Bars', () => {
  it('renders svg rects with the right coordinates / dimensions', async () => {
    const wrapper = render(Bars, {
      propsData: {
        xScale: horizontalBandScale,
        yScale: verticalLinearScale,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            activeData: chartData,
            scales,
            dimensions,
          },
        },
        tooltip,
      },
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
