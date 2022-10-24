import Vue from 'vue';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import MultiAreaChart from '@/recipes/area/MultiAreaChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('MultiAreaChart', () => {
  it('renders a multiarea chart', async () => {
    const wrapper = render(MultiAreaChart, {
      propsData: {
        data: pointsRawData,
        area: {
          stroke: 'red',
          strokeWidth: 2,
          opacity: 0.5,
        },
        marker: {
          hidden: false,
          color: 'blue',
          radius: 2,
        },
        grid: { directions: [] },
        dimensions,
        yAxis: {
          domainKeys: ['yValue', 'zValue'],
        },
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
