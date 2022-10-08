import Vue from 'vue';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { Position } from 'eazychart-core/src/types';
import { render } from '@testing-library/vue';
import LineColumnChart from '@/recipes/column/LineColumnChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('LineColumnChart', () => {
  it('renders a line & column chart', async () => {
    const wrapper = render(LineColumnChart, {
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
        yLineAxis: {
          domainKey: 'amount',
          position: Position.RIGHT,
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
