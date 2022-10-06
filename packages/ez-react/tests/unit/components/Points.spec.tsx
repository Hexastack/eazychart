import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Points } from '@/components/Points';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  rawData,
  horizontalLinearScaleDef,
  verticalLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ScaleLinear } from 'eazychart-core/src';

describe('Points', () => {
  it('renders svg points with the right coordinates / path', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...baseChartProps}
          rawData={rawData}
          dimensions={dimensions}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <CartesianScale
            xScaleConfig={{
              ScaleClass: ScaleLinear,
              definition: horizontalLinearScaleDef,
            }}
            yScaleConfig={{
              ScaleClass: ScaleLinear,
              definition: verticalLinearScaleDef,
            }}
          >
            <Points
              xDomainKey={'amount'}
              yDomainKey={'value'}
              r={6}
              fill={'red'}
              stroke={'red'}
            />
          </CartesianScale>
        </Chart>
      );
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });

    // 2nd render
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
