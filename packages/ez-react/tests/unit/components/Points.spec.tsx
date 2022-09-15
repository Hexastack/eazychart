import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Points } from '@/components/Points';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  verticalLinearScale,
  rawData,
  scaleDefinitions,
  colors,
  horizontalLinearScale,
} from '@ez/dev/jest/data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('Points', () => {
  it('renders svg points with the right coordinates / path', async () => {
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
          <Points
            xScale={horizontalLinearScale}
            yScale={verticalLinearScale}
            r={6}
          />
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
