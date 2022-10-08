import React from 'react';
import {
  dimensions,
  pointsWithMarginData,
} from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LineErrorMarginChart } from '@/recipes/line/LineErrorMarginChart';
import 'tests/mocks/ResizeObserver';

describe('LineErrorMarginChart', () => {
  it('renders a line error margin chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <LineErrorMarginChart
          data={pointsWithMarginData}
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
          animationOptions={{
            easing: 'easeBack',
            duration: 0,
            delay: 0,
          }}
        />
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
