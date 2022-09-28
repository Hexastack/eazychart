import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import ScatterChart from '@/recipes/scatter/ScatterChart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('ScatterChart', () => {
  it('renders a scatter chart', async (/** done */) => {
    const wrapper = render(ScatterChart, {
      propsData: {
        data: rawData,
        point: {
          radius: 6,
          color: 'red',
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
