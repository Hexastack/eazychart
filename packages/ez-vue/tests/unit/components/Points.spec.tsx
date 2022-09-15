import Vue from 'vue';
import { render } from '@testing-library/vue';
import {
  chartData,
  dimensions,
  verticalLinearScale,
  scales,
  horizontalLinearScale,
  tooltip,
} from '@ez/dev/jest/data';
import Points from '@/components/Points';

describe('Points', () => {
  it('renders svg points with the right coordinates / path', async () => {
    const wrapper = render(Points, {
      propsData: {
        xScale: horizontalLinearScale,
        yScale: verticalLinearScale,
        r: 6,
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
