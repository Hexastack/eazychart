import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import PieChart from '@/recipes/pie/PieChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('PieChart', () => {
  it('renders a pie chart', async () => {
    const wrapper = render(PieChart, {
      propsData: {
        data: rawData,
        colors,
        valueDomainKey: 'value',
        labelDomainKey: 'label',
        dimensions,
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
