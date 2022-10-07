import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import PieChart from '@/recipes/pie/PieChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('PieChart', () => {
  it('renders a pie chart', async () => {
    const propsData = {
      data: rawData,
      colors,
      dimensions,
    };

    const wrapper = render(PieChart, {
      propsData,
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(PieChart, {
      props: propsData,
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
