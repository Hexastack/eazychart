import Vue from 'vue';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import AreaChart from '@/recipes/area/AreaChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('AreaChart', () => {
  it('renders an area chart', async () => {
    const wrapper = render(AreaChart, {
      propsData: {
        data: pointsRawData,
        area: {
          stroke: 'red',
          strokeWidth: 2,
          fill: 'orange',
        },
        marker: {
          hidden: false,
          color: 'red',
          radius: 2,
        },
        grid: { directions: [] },
        dimensions,
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
