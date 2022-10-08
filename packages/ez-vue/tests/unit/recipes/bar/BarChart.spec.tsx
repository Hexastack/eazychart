import Vue from 'vue';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { Position } from 'eazychart-core/src/types';
import { render } from '@testing-library/vue';
import BarChart from '@/recipes/bar/BarChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('BarChart', () => {
  it('renders a bar chart', async () => {
    const wrapper = render(BarChart, {
      propsData: {
        data: rawData,
        colors,
        grid: { directions: [] },
        dimensions,
        xAxis: {
          domainKey: 'value',
          position: Position.BOTTOM,
        },
        yAxis: {
          domainKey: 'label',
          position: Position.LEFT,
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
