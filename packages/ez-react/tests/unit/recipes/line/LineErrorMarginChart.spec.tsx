import React from 'react';
import { dimensions, pointsWithMarginData } from 'eazychart-dev/jest/data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LineErrorMarginChart } from '@/recipes/line/LineErrorMarginChart';
import 'tests/mocks/ResizeObserver';

describe('LineErrorMarginChart', () => {
  it('renders a line error margin chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <LineErrorMarginChart
          rawData={pointsWithMarginData}
          line={{
            stroke: 'red',
            strokeWidth: 2,
          }}
          marker={{
            hidden: false,
            color: 'red',
            radius: 2,
          }}
          grid={{ directions: [] }}
          dimensions={dimensions}
        />
      );
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });

    // 2nd render
    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
