import { render } from '@testing-library/vue';
import { Direction } from 'eazychart-core/src/types';
import {
  dimensions,
  horizontalLinearScale,
  verticalLinearScale,
} from 'eazychart-core/src/sample-data';
import GridLines from '@/components/scales/grid/GridLines';

describe('GridLines', () => {
  it('renders horizontal grid lines with four ticks', async () => {
    const wrapper = render(GridLines, {
      propsData: {
        direction: Direction.HORIZONTAL,
        tickCount: 4,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            dimensions,
          },
          cartesianScale: {
            xScale: horizontalLinearScale,
            yScale: verticalLinearScale,
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
        tickCount: 4,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            dimensions,
          },
          cartesianScale: {
            xScale: horizontalLinearScale,
            yScale: verticalLinearScale,
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
