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
import { baseChartProps, svgWrapper } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ScaleLinear } from 'eazychart-core/src';

describe('Points', () => {
  it('renders svg points with the right coordinates / path', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <Chart {...baseChartProps} rawData={rawData} dimensions={dimensions}>
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
            <svg>
              <Points
                xDomainKey={'amount'}
                yDomainKey={'value'}
                r={6}
                fill={'red'}
                stroke={'red'}
              />
            </svg>
          </CartesianScale>
        </Chart>
      );
    });

    await waitFor(async () => {
      expect(await svgWrapper('ez-points', wrapper)).toMatchSnapshot();
    });
  });
});
