import { colors, dimensions, rawData } from '@ez/dev/jest/data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import ColumnChart from '@/recipes/column/ColumnChart';

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('ColumnChart', () => {
  it('renders a column chart', async () => {
    const wrapper = render(ColumnChart, {
      propsData: {
        rawData,
        colors,
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
