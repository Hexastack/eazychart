import { render } from '@testing-library/vue';
import { Direction } from 'eazychart-core/src/types';
import {
  dimensions,
  scales,
  horizontalLinearScale,
  verticalLinearScale,
} from 'eazychart-core/src/sample-data';
import GridLines from '@/components/scales/grid/GridLines';

describe('GridLines', () => {
  it('renders horizontal grid lines with four ticks', async () => {
    const wrapper = render(GridLines, {
      propsData: {
        direction: Direction.HORIZONTAL,
        aScale: horizontalLinearScale,
        tickCount: 4,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            scales,
            dimensions,
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders vertical grid lines with four ticks', async () => {
    const wrapper = render(GridLines, {
      propsData: {
        direction: Direction.VERTICAL,
        aScale: verticalLinearScale,
        tickCount: 4,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            scales,
            dimensions,
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
