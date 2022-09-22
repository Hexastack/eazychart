import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import IrregularPieChart from '@/recipes/pie/IrregularPieChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('IrregularPieChart', () => {
  it('renders a irregular pie chart', async () => {
    const wrapper = render(IrregularPieChart, {
      propsData: {
        rawData,
        colors,
        dimensions,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(IrregularPieChart, {
      props: {
        rawData,
        colors,
        dimensions,
      },
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
