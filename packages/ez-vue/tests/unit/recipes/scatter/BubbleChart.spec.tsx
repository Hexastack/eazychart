import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import BubbleChart from '@/recipes/scatter/BubbleChart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('BubbleChart', () => {
  it('renders a bubble chart', async (/** done */) => {
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
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    // still need to reschudle to get the updated chart
    // setTimeout(() => {
    //   expect(wrapper.container.innerHTML).toMatchSnapshot();
    //   done();
    // }, 0)
  });
});
