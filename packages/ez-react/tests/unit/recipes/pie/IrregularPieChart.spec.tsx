import React from 'react';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { IrregularPieChart } from '@/recipes/pie/IrregularPieChart';
import 'tests/mocks/ResizeObserver';

describe('IrregularPieChart', () => {
  it('renders a irregular pie chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <IrregularPieChart
          data={rawData}
          colors={colors}
          valueDomainKey={'value'}
          labelDomainKey={'label'}
          dimensions={dimensions}
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
