import React from 'react';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import 'tests/mocks/ResizeObserver';
import { MultiAreaChart } from '@/recipes/area/MultiAreaChart';

describe('MultiAreaChart', () => {
  it('renders a multiarea chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <MultiAreaChart
          data={pointsRawData}
          area={{
            stroke: 'red',
            strokeWidth: 2,
            opacity: 0.5,
          }}
          marker={{
            hidden: false,
            color: 'blue',
            radius: 2,
          }}
          grid={{ directions: [] }}
          dimensions={dimensions}
          yAxis={{
            domainKeys: ['yValue', 'zValue'],
          }}
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
