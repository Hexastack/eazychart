import React from 'react';
import { dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import 'tests/mocks/ResizeObserver';
import { StackedColumnChart } from '@/recipes/column/StackedColumnChart';

describe('StackedColumnChart', () => {
  it('renders a stacked column chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <StackedColumnChart
          data={rawData}
          dimensions={dimensions}
          xAxis={{
            domainKey: 'label',
          }}
          yAxis={{
            domainKeys: ['value0', 'value'],
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
