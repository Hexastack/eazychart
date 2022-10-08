import { render } from '@testing-library/vue';
import { Position } from 'eazychart-core/src/types';
import {
  dimensions,
  horizontalLinearScale,
  padding,
  verticalLinearScale,
} from 'eazychart-core/src/sample-data';
import Axis from '@/components/scales/Axis';

// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('Axis', () => {
  it('renders axis with four ticks', () => {
    const wrapper = render(Axis, {
      propsData: {
        position: Position.BOTTOM,
        tickCount: 4,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            dimensions,
            padding,
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
