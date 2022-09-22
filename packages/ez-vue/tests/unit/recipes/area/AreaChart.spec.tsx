import { dimensions, pointsData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import { RawData } from 'eazychart-core/src/types';
import AreaChart from '@/recipes/area/AreaChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('AreaChart', () => {
  it('renders an area chart', async () => {
    const wrapper = render(AreaChart, {
      propsData: {
        rawData: pointsData as unknown as RawData,
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
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
