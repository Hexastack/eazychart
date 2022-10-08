import React from 'react';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LineChart } from '@/recipes/line/LineChart';
import 'tests/mocks/ResizeObserver';

describe('LineChart', () => {
  it('renders a line chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <LineChart
          data={pointsRawData}
          line={{
            stroke: 'red',
            strokeWidth: 2,
          }}
          marker={{
            hidden: false,
            color: 'blue',
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
