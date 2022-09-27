import Vue from 'vue';
import { render } from '@testing-library/vue';
import { dimensions, pointsData, tooltip } from 'eazychart-core/src/sample-data';
import LinePath from '@/components/shapes/LinePath';

describe('LinePath', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    const wrapper = render(LinePath, {
      propsData: {
        shapeData: pointsData,
      },
      provide: {
        __reactiveInject__: {
          chart: {},
        },
        tooltip,
        dimensions,
      },
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
