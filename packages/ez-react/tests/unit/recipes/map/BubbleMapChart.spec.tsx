import React from 'react';
import {
  colors,
  dimensions,
  mapFeatureData,
  rawData,
} from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { BubbleMapChart } from '@/recipes/map/BubbleMapChart';
import 'tests/mocks/ResizeObserver';

describe('BubbleMapChart', () => {
  it('renders a bubble map chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <BubbleMapChart
          data={rawData}
          geoJson={mapFeatureData}
          map={{
            geoDomainKey: 'label',
            valueDomainKey: 'value',
            projectionType: 'geoMercator',
            fill: 'blue',
            stroke: 'red',
          }}
          bubbles={{
            domainKey: 'value',
            minRange: 0,
            maxRange: 30,
            opacity: 0.5,
            fill: 'orange',
            stroke: 'black',
          }}
          dimensions={dimensions}
          colors={colors}
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
