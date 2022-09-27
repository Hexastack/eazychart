import { dimensions, pointsWithMarginData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import LineErrorMarginChart from '@/recipes/line/LineErrorMarginChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('LineErrorMarginChart', () => {
  it('renders a line error margin chart', async () => {
    const wrapper = render(LineErrorMarginChart, {
      propsData: {
        rawData: pointsWithMarginData,
        line: {
          stroke: 'red',
          strokeWidth: 2,
        },
        marker: {
          hidden: false,
          color: 'red',
          radius: 2,
        },
        grid: { directions: [] },
        dimensions,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
