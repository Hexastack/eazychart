import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import Vue from 'vue';
import { render } from '@testing-library/vue';
import RadialChart from '@/recipes/pie/RadialChart';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('RadialChart', () => {
  it('renders a Radial chart', async () => {
    const propsData = {
      onResize: () => undefined,
      data: rawData,
      colors,
      dimensions,
    };

    const wrapper = render(RadialChart, {
      propsData,
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    const wrapper2 = render(RadialChart, {
      props: propsData,
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
