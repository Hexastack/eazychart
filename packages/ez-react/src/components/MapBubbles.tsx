import React, { FC, useMemo } from 'react';
import {
  calculateGeoProjectionCenter,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import { GeoFeatureCollection, MapConfig } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { useColorScale } from './scales/ColorScale';
import { MapBubble } from './shapes/MapBubble';
import { BubbleConfig } from 'eazychart-core/src/utils/types';

export interface MapBubblesProps {
  isWrapped?: boolean;
  fill?: string;
  map: MapConfig;
  geoJson: GeoFeatureCollection;
  bubbles: BubbleConfig;
}

export const MapBubbles: FC<MapBubblesProps> = ({
  map,
  geoJson,
  bubbles,
  ...rest
}) => {
  const { projectionType, geoDomainKey, valueDomainKey, fill } = map;
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
          <MapBubble
            key={idx}
            shapeDatum={shapeDatum}
            projectionType={projectionType}
            projectionCenter={projectionCenter}
            fill={fill}
            bubbles={bubbles}
          />
        );
      })}
    </g>
  );
};
