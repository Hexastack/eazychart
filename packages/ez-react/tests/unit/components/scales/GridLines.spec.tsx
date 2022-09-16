import React from 'react';
import { act, render } from '@testing-library/react';
import { Chart, ChartProps } from '@/components/Chart';
import { Direction } from 'eazychart-core/src/types';
import {
  colors,
  dimensions,
  rawData,
  scaleDefinitions,
  horizontalLinearScale,
  verticalLinearScale,
} from 'eazychart-dev/jest/data';
import { baseChartProps } from 'tests/common';
import { GridLines } from '@/components/scales/grid/GridLines';
import 'tests/mocks/ResizeObserver';

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
        <GridLines
          direction={Direction.HORIZONTAL}
          aScale={horizontalLinearScale}
          tickCount={4}
        />
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
        <GridLines
          direction={Direction.VERTICAL}
          aScale={verticalLinearScale}
          tickCount={4}
        />
      </Chart>
    );
    const wrapper = render(gridChart);

    await act(async () => {
      wrapper.rerender(gridChart);
    });

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
