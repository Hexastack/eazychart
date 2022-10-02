import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import BubbleChart from '@/recipes/scatter/BubbleChart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('BubbleChart', () => {
  it('renders a bubble chart', async () => {
    const propsData = {
      onResize: () => undefined,
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
    };
    const wrapper = render(BubbleChart, {
      propsData,
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(BubbleChart, {
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
