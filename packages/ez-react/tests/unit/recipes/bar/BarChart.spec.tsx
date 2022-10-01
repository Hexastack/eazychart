import React from 'react';
import { Position } from 'eazychart-core/src/types';
import { colors, rawData, dimensions } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { BarChart } from '@/recipes/bar/BarChart';
import 'tests/mocks/ResizeObserver';

describe('BarChart', () => {
  it('renders a bar chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <BarChart
          data={rawData}
          colors={colors}
          grid={{ directions: [] }}
          dimensions={dimensions}
          xAxis={{
            domainKey: 'value',
            position: Position.BOTTOM,
          }}
          yAxis={{
            domainKey: 'label',
            position: Position.LEFT,
          }}
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
