import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import ScatterChart from '@/recipes/scatter/ScatterChart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('ScatterChart', () => {
  it('renders a scatter chart', async () => {
    const propsData = {
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
    };

    const wrapper = render(ScatterChart, {
      propsData,
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(ScatterChart, {
      propsData,
    });

    await wrapper2.updateProps({
      animationOptions: {
        easing: 'easeLinear',
        duration: 0,
        delay: 0,
      },
    });

    expect(wrapper2.container.innerHTML).toMatchSnapshot();
  });
});
