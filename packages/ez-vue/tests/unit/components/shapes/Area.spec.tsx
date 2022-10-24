import Vue from 'vue';
import { render } from '@testing-library/vue';
import { dimensions, areaData, tooltip } from 'eazychart-core/src/sample-data';
import Area from '@/components/shapes/Area';

describe('Area', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    const wrapper = render(Area, {
      propsData: {
        shapeData: areaData,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            animationOptions: {
              easing: 'easeLinear',
              duration: 0,
              delay: 0,
            },
          },
        },
        tooltip,
        dimensions,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
