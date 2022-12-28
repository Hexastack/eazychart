import React from 'react';
import { act, render, RenderResult, waitFor } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import {
  dimensions,
  mapFeatureData,
  rawData,
} from 'eazychart-core/src/sample-data';
import { baseChartProps } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { Map } from '@/components/Map';

describe('Map', () => {
  it('renders svg areas using GeoJSON features', async () => {
    let wrapper: RenderResult;
    act(() => {
      wrapper = render(
        <Chart
          {...baseChartProps}
          rawData={rawData}
          dimensions={dimensions}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
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
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
