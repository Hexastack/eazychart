import React from 'react';
import { act, render } from '@testing-library/react';
import { ScaleLinear } from 'eazychart-core/src';
import { Position } from 'eazychart-core/src/types';
import {
  colors,
  dimensions,
  rawData,
  scaleDefinitions,
  verticalLinearScaleDef,
  horizontalLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { Axis } from '@/components/scales/Axis';
import { Chart } from '@/components/Chart';
import { baseChartProps, svgWrapper } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';

describe('Axis', () => {
  it('renders axis with four ticks', async () => {
    const axisChart = (
      <Chart
        {...{
          ...baseChartProps,
          rawData: rawData.map((d) => ({ ...d, isActive: true })),
          colors,
          scaleDefinitions,
          dimensions: {
            width: dimensions.width,
            height: dimensions.height,
          },
          scopedSlots: {
            LegendComponent: () => <>{null}</>,
            Tooltip: () => <>{null}</>,
          },
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
          <svg>
            <Axis position={Position.BOTTOM} tickCount={4} />
          </svg>
        </CartesianScale>
      </Chart>
    );
    const wrapper = render(axisChart);

    await act(async () => {
      wrapper.rerender(axisChart);
    });

    expect(await svgWrapper('ez-axis', wrapper)).toMatchSnapshot();
  });
});
