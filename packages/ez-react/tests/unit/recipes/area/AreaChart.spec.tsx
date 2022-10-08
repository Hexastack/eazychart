import React from 'react';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { AreaChart } from '@/recipes/area/AreaChart';
import 'tests/mocks/ResizeObserver';

describe('AreaChart', () => {
  it('renders an area chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <AreaChart
          data={pointsRawData}
          area={{
            stroke: 'red',
            strokeWidth: 2,
            fill: 'orange',
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
