import Vue from 'vue';
import { render } from '@testing-library/vue';
import { dimensions, pointsData, tooltip } from 'eazychart-core/src/sample-data';
import Line from '@/components/shapes/Line';

describe('Line', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    const wrapper = render(Line, {
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
