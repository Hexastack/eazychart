import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import SemiCircleChart from '@/recipes/pie/SemiCircleChart';
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('SemiCircleChart', () => {
  it('renders a semi-circle chart', async () => {
    const wrapper = render(SemiCircleChart, {
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
