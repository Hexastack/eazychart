import { dimensions, pointsData } from '@ez/dev/jest/data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import { RawData } from '@ez/core/src/types';
import LineChart from '@/recipes/line/LineChart';

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('LineChart', () => {
  it('renders a line chart', async () => {
    const wrapper = render(LineChart, {
      propsData: {
        rawData: pointsData as unknown as RawData,
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
