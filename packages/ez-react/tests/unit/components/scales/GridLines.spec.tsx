import React from 'react';
import { act, render } from '@testing-library/react';
import { ScaleLinear } from 'eazychart-core/src';
import { Direction } from 'eazychart-core/src/types';
import {
  colors,
  dimensions,
  rawData,
  scaleDefinitions,
  verticalLinearScaleDef,
  horizontalLinearScaleDef,
} from 'eazychart-core/src/sample-data';
import { Chart, ChartProps } from '@/components/Chart';
import { baseChartProps } from 'tests/common';
import { GridLines } from '@/components/scales/grid/GridLines';
import 'tests/mocks/ResizeObserver';
import { CartesianScale } from '@/components/scales/CartesianScale';

const commonProps: ChartProps = {
  ...{
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
      TooltipComponent: () => <>{null}</>,
    },
  },
};

describe('GridLines', () => {
  it('renders horizontal grid lines with four ticks', async () => {
    const gridChart = (
      <Chart {...commonProps}>
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
          <GridLines direction={Direction.HORIZONTAL} tickCount={4} />
        </CartesianScale>
      </Chart>
    );
    const wrapper = render(gridChart);

    await act(async () => {
      wrapper.rerender(gridChart);
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });

  it('renders vertical grid lines with four ticks', async () => {
    const gridChart = (
      <Chart {...commonProps}>
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
          <GridLines direction={Direction.VERTICAL} tickCount={4} />
        </CartesianScale>
      </Chart>
    );
    const wrapper = render(gridChart);

    await act(async () => {
      wrapper.rerender(gridChart);
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
