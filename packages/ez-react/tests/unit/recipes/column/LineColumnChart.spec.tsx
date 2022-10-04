import React from 'react';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LineColumnChart } from '@/recipes/column/LineColumnChart';
import 'tests/mocks/ResizeObserver';
import { Position } from 'eazychart-core/src/types';

describe('LineColumnChart', () => {
  it('renders a line & column chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <LineColumnChart
          data={rawData}
          range={colors}
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
          yLineAxis={{
            domainKey: 'amount',
            position: Position.RIGHT,
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
