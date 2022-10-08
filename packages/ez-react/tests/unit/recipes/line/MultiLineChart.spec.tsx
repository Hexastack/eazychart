import React from 'react';
import { dimensions, pointsRawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import 'tests/mocks/ResizeObserver';
import { MultiLineChart } from '@/recipes/line/MultiLineChart';

describe('MultiLineChart', () => {
  it('renders a multiline chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <MultiLineChart
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
