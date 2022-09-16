import React from 'react';
import { colors, dimensions, rawData } from 'eazychart-dev/jest/data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LineColumnChart } from '@/recipes/column/LineColumnChart';
import 'tests/mocks/ResizeObserver';

describe('LineColumnChart', () => {
  it('renders a line & column chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <LineColumnChart
          rawData={rawData}
          colors={colors}
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
