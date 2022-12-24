import React from 'react';
import { act, RenderResult, waitFor } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import { geoFeatureA } from 'eazychart-core/src/sample-data';
import { baseChartProps, renderSVG } from 'tests/common';
import 'tests/mocks/ResizeObserver';
import { MapPath } from '@/components/shapes/MapPath';
import { GeoFeatureDatum } from 'eazychart-core/src/types';
import {
  calculateGeoProjectionCenter,
  defaultChartDimensions,
} from 'eazychart-core/src';

describe('MapPath', () => {
  it('renders an svg path given a GeoJSON feature', async () => {
    let wrapper: RenderResult;
    const projectionCenter = calculateGeoProjectionCenter(
      { type: 'FeatureCollection', features: [geoFeatureA] },
      'geoMercator',
      defaultChartDimensions
    );
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
              { id: '1', color: 'red', ...geoFeatureA } as GeoFeatureDatum
            }
            projectionCenter={projectionCenter}
          />
        </Chart>
      );
    });

    await waitFor(() => {
      expect(wrapper.container.innerHTML).toMatchSnapshot();
    });
  });
});
