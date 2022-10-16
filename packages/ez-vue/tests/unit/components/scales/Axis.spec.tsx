import Vue from 'vue';
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
import svgWrapper from '../../../common';

describe('Axis', () => {
  it('renders axis with four ticks', async () => {
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
    await Vue.nextTick();

    expect(await svgWrapper('ez-axis', wrapper)).toMatchSnapshot();
  });
});
