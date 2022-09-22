import React from 'react';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { IrregularPieChart } from '@/recipes/pie/IrregularPieChart';
import 'tests/mocks/ResizeObserver';

describe('IrregularPieChart', () => {
  it('renders a irregular pie chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      // 1st render
      wrapper = render(
        <IrregularPieChart
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
