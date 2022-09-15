import { colors, dimensions, rawData } from '@ez/dev/jest/data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import RadialChart from '@/recipes/pie/RadialChart';

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('RadialChart', () => {
  it('renders a Radial chart', async () => {
    const wrapper = render(RadialChart, {
      propsData: {
        rawData,
        colors,
        dimensions,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(RadialChart, {
      props: {
        rawData,
        colors,
        dimensions,
      },
    });

    await wrapper2.updateProps({
      animationOptions: {
        easing: 'easeBack',
        duration: 0,
        delay: 0,
      },
    });

    expect(wrapper2.container.innerHTML).toMatchSnapshot();
  });
});
