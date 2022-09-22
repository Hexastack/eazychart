import React from 'react';
import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult } from '@testing-library/react';
import { ScatterChart } from '@/recipes/scatter/ScatterChart';
import 'tests/mocks/ResizeObserver';

describe('ScatterChart', () => {
  it('renders a scatter chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <ScatterChart
          rawData={rawData}
          color={'red'}
          grid={{ directions: [] }}
          dimensions={dimensions}
          point={{
            radius: 6,
            color: 'red',
          }}
          animationOptions={{
            easing: 'easeBack',
            duration: 0,
            delay: 0,
          }}
          xAxis={{
            domainKey: 'value',
          }}
          yAxis={{
            domainKey: 'amount',
          }}
        />
      );
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });

    // 2nd render
    // await waitFor(() => {
    //   expect(wrapper.container.innerHTML).toMatchSnapshot();
    // });
  });
});
