import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { Position } from 'eazychart-core/src/types';
import { ColumnChart } from '@/recipes/column/ColumnChart';
import 'tests/mocks/ResizeObserver';

describe('ColumnChart', () => {
  it('renders a column chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <ColumnChart
          data={rawData}
          colors={colors}
          grid={{ directions: [] }}
          dimensions={dimensions}
          xAxis={{
            domainKey: 'label',
            position: Position.BOTTOM,
          }}
          yAxis={{
            domainKey: 'value',
            position: Position.LEFT,
          }}
          animationOptions={{
            easing: 'easeBack',
            duration: 0,
            delay: 0,
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
