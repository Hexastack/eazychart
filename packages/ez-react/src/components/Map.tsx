import React, { SVGAttributes, useMemo } from 'react';
import {
  calculateGeoProjectionViewport,
  computeMapProjection,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import { GeoJsonData, MapConfig } from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';
import { useColorScale } from './scales/ColorScale';
import { useChart } from '@/lib/use-chart';
import { MapContext } from '@/lib/use-map';

export interface MapProps extends SVGAttributes<SVGPathElement> {
  isWrapped?: boolean;
  map: MapConfig;
  geoJson: GeoJsonData;
  children?: React.ReactNode;
}

export const Map: React.FC<MapProps> = ({
  geoJson,
  map: { projectionType, geoDomainKey, valueDomainKey, fill, stroke },
  children,
  ...rest
}) => {
  // Validate GeoJSON data structure
  if (geoJson && !('features' in geoJson)) {
    throw new Error(
      'GeoJSON must contain features so that each feature is mapped to a data item.'
    );
  }

  const { colorScale } = useColorScale();
  const { data, dimensions } = useChart();

  const projectionViewport = useMemo(
    () => calculateGeoProjectionViewport(geoJson, projectionType, dimensions),
    [geoJson, projectionType, dimensions]
  );

  const { projection, geoPathGenerator } = useMemo(
    () => computeMapProjection(projectionType, projectionViewport),
    [projectionType, projectionViewport]
  );

  const mapData = useMemo(() => {
    return scaleGeoFeatureData(
      data,
      geoJson?.features || [],
      geoDomainKey,
      valueDomainKey,
      geoPathGenerator,
      colorScale,
      fill
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, geoJson?.features, geoDomainKey, colorScale.scale]);

  return (
    <MapContext.Provider value={{ projection, geoPathGenerator, mapData }}>
      <g className="ez-map" {...rest}>
        {mapData.map((shapeDatum, idx) => {
          return <MapPath key={idx} shapeDatum={shapeDatum} stroke={stroke} />;
        })}
      </g>
      {children}
    </MapContext.Provider>
  );
};
