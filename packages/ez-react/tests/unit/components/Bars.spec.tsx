import React from 'react';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import {
  dimensions,
  scaleDefinitions,
  rawData,
  colors,
  horizontalBandScaleDef,
  verticalLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { Bars } from '@/components/Bars';
import { Chart } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';

describe('Bars', () => {
  it('renders svg rects with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...{
            ...baseChartProps,
            rawData: rawData.map((d) => ({ ...d, isActive: true })),
            colors,
            scaleDefinitions,
            dimensions,
            scopedSlots: {
              LegendComponent: () => <>{null}</>,
              Tooltip: () => <>{null}</>,
            },
          }}
        >
          <CartesianScale
            xScaleConfig={{
              ScaleClass: ScaleBand,
              definition: horizontalBandScaleDef,
            }}
            yScaleConfig={{
              ScaleClass: ScaleLinear,
              definition: verticalLinearScaleDef,
            }}
          >
            <Bars xDomainKey={'label'} yDomainKey={'value'} />
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
