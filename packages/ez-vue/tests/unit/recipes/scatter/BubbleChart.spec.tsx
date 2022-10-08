import Vue from 'vue';
import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import { render } from '@testing-library/vue';
import BubbleChart from '@/recipes/scatter/BubbleChart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('BubbleChart', () => {
  it('renders a bubble chart', async () => {
    const wrapper = render(BubbleChart, {
      propsData: {
        data: rawData,
        bubble: {
          domainKey: 'amount',
          minRadius: 1,
          maxRadius: 10,
          fill: 'blue',
        },
        grid: { directions: [] },
        dimensions,
        xAxis: {
          domainKey: 'value',
        },
        yAxis: {
          domainKey: 'amount',
        },
        animationOptions: {
          easing: 'easeLinear',
          duration: 0,
          delay: 0,
        },
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
