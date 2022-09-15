import { render } from '@testing-library/vue';
import { Position } from '@ez/core/src/types';
import {
  dimensions,
  scales,
  horizontalLinearScale,
  padding,
} from '@ez/dev/jest/data';
import Axis from '@/components/scales/Axis';

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import 'tests/mocks/ResizeObserver';

describe('Axis', () => {
  it('renders axis with four ticks', () => {
    const wrapper = render(Axis, {
      propsData: {
        position: Position.BOTTOM,
        aScale: horizontalLinearScale,
        tickCount: 4,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            scales,
            dimensions,
            padding,
          },
        },
      },
    });
    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
