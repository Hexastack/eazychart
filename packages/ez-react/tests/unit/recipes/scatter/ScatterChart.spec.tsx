import React from 'react';
import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { ScatterChart } from '@/recipes/scatter/ScatterChart';
import 'tests/mocks/ResizeObserver';

describe('ScatterChart', () => {
  it('renders a scatter chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <ScatterChart
          data={rawData}
          color={'red'}
          grid={{ directions: [] }}
          dimensions={dimensions}
          point={{
            radius: 6,
            color: 'red',
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
