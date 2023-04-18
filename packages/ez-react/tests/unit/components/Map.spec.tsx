import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import {
  dimensions,
  mapFeatureData,
  rawData,
} from 'eazychart-core/src/sample-data';
// import 'tests/mocks/ResizeObserver';
import { Map } from '@/components/Map';
import { useChart } from '@/lib/use-chart';

jest.mock('@/lib/use-chart');

describe('Map', () => {
  beforeEach(() => {
    (useChart as jest.Mock).mockImplementation(() => ({
      data: rawData,
      dimensions,
      animationOptions: {
        easing: 'easeLinear',
        duration: 0,
        delay: 0,
      },
    }));
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders svg areas using GeoJSON features', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <Map
          geoJson={mapFeatureData}
          map={{
            geoDomainKey: 'label',
            valueDomainKey: 'value',
            projectionType: 'geoMercator',
            fill: 'blue',
            stroke: 'red',
          }}
        />
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
