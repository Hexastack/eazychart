import React from 'react';
import { colors, dimensions, rawData } from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { SemiCircleChart } from '@/recipes/pie/SemiCircleChart';
import 'eazychart-react/tests/mocks/ResizeObserver';

describe('SemiCircleChart', () => {
  it('renders a semi-circle chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <SemiCircleChart
          data={rawData}
          valueDomainKey={'value'}
          labelDomainKey={'label'}
          colors={colors}
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
