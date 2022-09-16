import React from 'react';
import { colors, dimensions, rawData } from 'eazychart-dev/jest/data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { RadialChart } from '@/recipes/pie/RadialChart';
import 'tests/mocks/ResizeObserver';

describe('RadialChart', () => {
  it('renders a Radial chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <RadialChart
          rawData={rawData}
          colors={colors}
          animationOptions={{
            easing: 'easeBack',
            duration: 0,
            delay: 0,
          }}
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
