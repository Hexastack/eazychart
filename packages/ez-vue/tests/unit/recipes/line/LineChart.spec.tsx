import Vue from 'vue';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import LineChart from '@/recipes/line/LineChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('LineChart', () => {
  it('renders a line chart', async () => {
    const wrapper = render(LineChart, {
      propsData: {
        data: pointsRawData,
        line: {
          stroke: 'red',
          strokeWidth: 2,
        },
        marker: {
          hidden: false,
          color: 'blue',
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
