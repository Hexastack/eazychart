import { colors, dimensions, rawData } from '@ez/dev/jest/data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import LineColumnChart from '@/recipes/column/LineColumnChart';

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('LineColumnChart', () => {
  it('renders a line & column chart', async () => {
    const wrapper = render(LineColumnChart, {
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
