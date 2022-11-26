import Vue from 'vue';
import { render } from '@testing-library/vue';
import { dimensions, areaData, tooltip } from 'eazychart-core/src/sample-data';
import AreaPath from '@/components/shapes/AreaPath';

describe('AreaPath', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    const wrapper = render(AreaPath, {
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
