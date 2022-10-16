import React from 'react';
import { ScaleBand, ScaleLinear } from 'eazychart-core/src';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import {
  dimensions,
  rawData,
  colors,
  horizontalBandScaleDef,
  verticalLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { Bars } from '@/components/Bars';
import { Chart } from '@/components/Chart';
import { baseChartProps, svgWrapper } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { ColorScale } from '@/components/scales/ColorScale';

describe('Bars', () => {
  it('renders svg rects with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <Chart {...baseChartProps} rawData={rawData} dimensions={dimensions}>
          <CartesianScale
            xScaleConfig={{
              ScaleClass: ScaleBand,
              definition: horizontalBandScaleDef,
            }}
            yScaleConfig={{
              ScaleClass: ScaleLinear,
              definition: verticalLinearScaleDef,
            }}
            isWrapped={false}
          >
            <ColorScale domainKey={'label'} range={colors} isWrapped={false}>
              <svg>
                <Bars xDomainKey={'label'} yDomainKey={'value'} />
              </svg>
            </ColorScale>
          </CartesianScale>
        </Chart>
      );
    });

    await waitFor(async () => {
      expect(await svgWrapper('ez-bars', wrapper)).toMatchSnapshot();
    });
  });
});
