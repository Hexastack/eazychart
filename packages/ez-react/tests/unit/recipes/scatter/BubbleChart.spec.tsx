import React from 'react';
import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { BubbleChart } from '@/recipes/scatter/BubbleChart';
import 'tests/mocks/ResizeObserver';

describe('BubbleChart', () => {
  it('renders a bubble chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <BubbleChart
          data={rawData}
          grid={{ directions: [] }}
          dimensions={dimensions}
          bubble={{
            domainKey: 'amount',
            minRadius: 1,
            maxRadius: 10,
            fill: 'blue',
          }}
          xAxis={{
            domainKey: 'value',
          }}
          yAxis={{
            domainKey: 'amount',
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
