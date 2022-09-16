import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Bars } from '@/components/Bars';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  verticalLinearScale,
  horizontalBandScale,
  scaleDefinitions,
  rawData,
  colors,
} from 'eazychart-dev/jest/data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';

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
          <Bars xScale={horizontalBandScale} yScale={verticalLinearScale} />
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
