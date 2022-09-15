import { colors, dimensions, rawData } from '@ez/dev/jest/data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import BarChart from '@/recipes/bar/BarChart';

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('BarChart', () => {
  it('renders a bar chart', async () => {
    const wrapper = render(BarChart, {
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
