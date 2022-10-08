import React from 'react';
import { Position } from 'eazychart-core/src/types';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { LineColumnChart } from '@/recipes/column/LineColumnChart';
import 'tests/mocks/ResizeObserver';

describe('LineColumnChart', () => {
  it('renders a line & column chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <LineColumnChart
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
          yLineAxis={{
            domainKey: 'amount',
            position: Position.RIGHT,
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
