import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  scaleDefinitions,
  radialLinearScale,
  chartData,
} from 'eazychart-dev/jest/data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { Arcs } from '@/components/Arcs';

describe('Arcs', () => {
  it('renders svg radial with the right coordinates / dimensions', async () => {
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
          <Arcs arcScale={radialLinearScale} />
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
