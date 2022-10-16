import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Bubbles } from '@/components/Bubbles';
import { Chart } from '@/components/Chart';
import { ScaleLinear } from 'eazychart-core/src';
import {
  dimensions,
  rawData,
  horizontalLinearScaleDef,
  verticalLinearScaleDef,
  radialLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { baseChartProps, svgWrapper } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';
import { LinearScale } from '@/components/scales/LinearScale';

describe('Bubbles', () => {
  it('renders svg bubbles with the right coordinates / path', async () => {
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
            <LinearScale {...radialLinearScaleDef} isWrapped={false}>
              <svg>
                <Bubbles
                  xDomainKey={'amount'}
                  yDomainKey={'value'}
                  rDomainKey={'amount'}
                  fill={'blue'}
                />
              </svg>
            </LinearScale>
          </CartesianScale>
        </Chart>
      );
    });

    await waitFor(async () => {
      expect(await svgWrapper('ez-bubbles', wrapper)).toMatchSnapshot();
    });
  });
});
