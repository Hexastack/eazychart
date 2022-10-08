import Vue from 'vue';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { Position } from 'eazychart-core/src/types';
import { render } from '@testing-library/vue';
import ColumnChart from '@/recipes/column/ColumnChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('ColumnChart', () => {
  it('renders a column chart', async () => {
    const wrapper = render(ColumnChart, {
      propsData: {
        data: rawData,
        colors,
        grid: { directions: [] },
        dimensions,
        xAxis: {
          domainKey: 'label',
          position: Position.BOTTOM,
        },
        yAxis: {
          domainKey: 'value',
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
