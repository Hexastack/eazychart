import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import IrregularPieChart from '@/recipes/pie/IrregularPieChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('IrregularPieChart', () => {
  it('renders a irregular pie chart', async () => {
    const propsData = {
      onResize: () => undefined,
      data: rawData,
      colors,
      dimensions,
    };

    const wrapper = render(IrregularPieChart, {
      propsData,
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(IrregularPieChart, {
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
