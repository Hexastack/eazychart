import React, { SVGAttributes, useMemo } from 'react';
import {
  calculateGeoProjectionCenter,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import { GeoFeatureCollection, MapConfig } from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';
import { useColorScale } from './scales/ColorScale';
import { useChart } from '@/lib/use-chart';

export interface MapChartProps extends SVGAttributes<SVGPathElement> {
  isWrapped?: boolean;
  map: MapConfig;
  geoJson: GeoFeatureCollection;
}

export const Map: React.FC<MapChartProps> = ({
  geoJson,
  map,
  ...rest
}: MapChartProps) => {
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
          <MapPath
            key={idx}
            shapeDatum={shapeDatum}
            projectionType={projectionType}
            projectionCenter={projectionCenter}
            stroke={stroke}
          />
        );
      })}
    </g>
  );
};
