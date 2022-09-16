import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Line } from '@/components/shapes/Line';
import { Chart } from '@/components/Chart';
import { pointsData } from 'eazychart-dev/jest/data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';

describe('Line', () => {
  it('renders an svg path with the right coordinates / path', async () => {
    let wrapper: RenderResult;
    await act(async () => {
      // 1st render
      wrapper = render(
        <Chart
          {...{
            ...baseChartProps,
            scopedSlots: {
              LegendComponent: () => <>{null}</>,
              Tooltip: () => <>{null}</>,
            },
          }}
        >
          <Line shapeData={pointsData} />
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
