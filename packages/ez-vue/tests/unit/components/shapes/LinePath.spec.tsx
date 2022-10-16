import Vue from 'vue';
import { render } from '@testing-library/vue';
import { dimensions, pointsData, tooltip } from 'eazychart-core/src/sample-data';
import LinePath from '@/components/shapes/LinePath';
import svgWrapper from '../../../common';

describe('LinePath', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    const wrapper = render(LinePath, {
      propsData: {
        shapeData: pointsData,
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

    expect(await svgWrapper('ez-line', wrapper)).toMatchSnapshot();
  });
});
