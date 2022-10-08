import Vue from 'vue';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import MultiLineChart from '@/recipes/line/MultiLineChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('MultiLineChart', () => {
  it('renders a multiline chart', async () => {
    const wrapper = render(MultiLineChart, {
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
        yAxis: {
          domainKeys: ['yValue', 'zValue'],
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
