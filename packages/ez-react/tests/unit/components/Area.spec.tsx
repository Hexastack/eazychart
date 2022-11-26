import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  rawData,
  horizontalLinearScaleDef,
  verticalLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { Area } from '@/components/Area';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ScaleLinear } from 'eazychart-core/src';

describe('Area', () => {
  it('renders svg area with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
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
            isWrapped={false}
          >
            <Area xDomainKey={'amount'} yDomainKey={'value'} />
          </CartesianScale>
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
