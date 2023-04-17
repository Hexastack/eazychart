import Vue from 'vue';
import { render } from '@testing-library/vue';
import { geoFeatureA, tooltip } from 'eazychart-core/src/sample-data';
import MapPath from '@/components/shapes/MapPath';
import {
  calculateGeoProjectionViewport,
  computeMapProjection,
  defaultChartDimensions,
} from 'eazychart-core/src';
import { GeoFeatureDatum } from 'eazychart-core/src/types';

describe('MapPath', () => {
  it('renders an svg path given a GeoJSON feature', async () => {
    const projectionViewport = calculateGeoProjectionViewport(
      { type: 'FeatureCollection', features: [geoFeatureA] },
      'geoMercator',
      defaultChartDimensions,
    );
    const projection = computeMapProjection('geoMercator', projectionViewport);

    const wrapper = render(MapPath, {
      propsData: {
        shapeDatum: {
          id: '1',
          color: 'red',
          feature: geoFeatureA,
        } as GeoFeatureDatum,
      },
      provide: {
        __reactiveInject__: {
          chart: {
            animationOptions: {
              easing: 'easeLinear',
              duration: 0,
              delay: 0,
            },
          },
          mapContext: { projection },
        },
        tooltip,
      },
    });

    await Vue.nextTick();

    expect(wrapper.container.innerHTML).toMatchSnapshot();
  });
});
