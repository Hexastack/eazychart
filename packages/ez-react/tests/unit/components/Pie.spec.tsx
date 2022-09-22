import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Pie } from '@/components/Pie';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  scaleDefinitions,
  horizontalLinearScale,
  chartData,
} from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('Pie', () => {
  it('renders svg pie with the right coordinates / dimensions', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <Chart
          {...{
            ...baseChartProps,
            rawData: chartData.map((d) => ({ ...d, isActive: true })),
            scaleDefinitions,
            dimensions,
            scopedSlots: {
              LegendComponent: () => <>{null}</>,
              Tooltip: () => <>{null}</>,
            },
          }}
        >
          <Pie aScale={horizontalLinearScale} donutRadius={0} />
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
