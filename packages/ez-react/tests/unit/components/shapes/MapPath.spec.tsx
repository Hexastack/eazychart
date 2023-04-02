import React from 'react';
import { act, RenderResult, waitFor } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import { geoFeatureA } from 'eazychart-core/src/sample-data';
import { baseChartProps, renderSVG } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { MapPath } from '@/components/shapes/MapPath';
import { GeoFeatureDatum } from 'eazychart-core/src/types';
import {
  calculateGeoProjectionViewport,
  computeMapProjection,
  defaultChartDimensions,
} from 'eazychart-core/src';

jest.mock('@/lib/use-map', () => {
  const projectionViewport = calculateGeoProjectionViewport(
    { type: 'FeatureCollection', features: [geoFeatureA] },
    'geoMercator',
    defaultChartDimensions
  );

  return jest.fn(() => computeMapProjection('geoMercator', projectionViewport));
});

describe('MapPath', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders an svg path given a GeoJSON feature', async () => {
    let wrapper: RenderResult;
    await act(async () => {
      wrapper = renderSVG(
        <Chart
          {...baseChartProps}
          scopedSlots={{
            LegendComponent: () => <>{null}</>,
            TooltipComponent: () => <>{null}</>,
          }}
        >
          <MapPath
            shapeDatum={
              { id: '1', color: 'red', feature: geoFeatureA } as GeoFeatureDatum
            }
          />
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
