import React from 'react';
import {
  colors,
  dimensions,
  mapFeatureData,
  rawData,
} from 'eazychart-core/src/sample-data';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { MapChart } from '@/recipes/map/MapChart';
import 'tests/mocks/ResizeObserver';

describe('MapChart', () => {
  it('renders a map chart', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <MapChart
          data={rawData}
          geoJson={mapFeatureData}
          map={{
            geoDomainKey: 'label',
            valueDomainKey: 'value',
            projectionType: 'geoMercator',
            fill: 'blue',
            stroke: 'red',
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
