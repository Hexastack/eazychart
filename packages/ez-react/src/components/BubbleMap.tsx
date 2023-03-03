import React, { SVGAttributes, useMemo } from 'react';
import {
  calculateGeoProjectionCenter,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import { GeoFeatureCollection, MapConfig } from 'eazychart-core/src/types';
import { BubbleConfig } from 'eazychart-core/src/utils/types';

import { BubbleMapPath } from './shapes/BubbleMapPath';
import { useColorScale } from './scales/ColorScale';
import { useChart } from '@/lib/use-chart';

export interface BubbleMapChartProps extends SVGAttributes<SVGPathElement> {
  isWrapped?: boolean;
  map: MapConfig;
  bubbles: BubbleConfig;
  geoJson: GeoFeatureCollection;
}

export const BubbleMap: React.FC<BubbleMapChartProps> = ({
  geoJson,
  bubbles,
  map,

  ...rest
}: BubbleMapChartProps) => {
  const { projectionType, geoDomainKey, valueDomainKey, fill, stroke } = map;
  const { colorScale } = useColorScale();
  const { data, dimensions } = useChart();

  const projectionCenter = useMemo(
    () => calculateGeoProjectionCenter(geoJson, projectionType, dimensions),
    [geoJson, projectionType, dimensions]
  );

  const shapeData = useMemo(() => {
    return scaleGeoFeatureData(
      data,
      geoJson?.features || [],
      geoDomainKey,
      valueDomainKey,
      colorScale,
      fill
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, geoJson?.features, geoDomainKey, colorScale.scale]);

  return (
    <g {...rest} className="ez-map">
      {shapeData.map((shapeDatum, idx) => {
        return (
          <BubbleMapPath
            key={idx}
            shapeDatum={shapeDatum}
            projectionType={projectionType}
            projectionCenter={projectionCenter}
            stroke={stroke}
            fill={fill}
            bubbles={bubbles}
          />
        );
      })}
    </g>
  );
};
