import React, { SVGAttributes, useMemo } from 'react';
import {
  ScaleSqrt,
  calculateGeoProjectionCenter,
  scaleGeoFeatureData,
} from 'eazychart-core/src';
import { GeoFeatureCollection, MapConfig } from 'eazychart-core/src/types';
import { MapPath } from './shapes/MapPath';
import { useColorScale } from './scales/ColorScale';
import { useChart } from '@/lib/use-chart';
import { BubbleConfig } from 'eazychart-core/src/utils/types';
import { useSqrtScale } from './scales/SqrtScale';

export interface MapChartProps extends SVGAttributes<SVGPathElement> {
  isWrapped?: boolean;
  map: MapConfig;
  bubbles?: BubbleConfig;
  geoJson: GeoFeatureCollection;
  scopedSlots?: {
    default: ({
      shapeDatum,
      scales,
    }: {
      shapeDatum: any;
      scales: { rScale: ScaleSqrt };
    }) => React.ReactChild;
  };
}

export const Map: React.FC<MapChartProps> = ({
  geoJson,
  map,
  bubbles,
  scopedSlots,
  ...rest
}: MapChartProps) => {
  const { projectionType, geoDomainKey, valueDomainKey, fill, stroke } = map;
  const { colorScale } = useColorScale();
  const { data, dimensions } = useChart();
  const { sqrtScale: rScale } = useSqrtScale();

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
      fill,
      projectionType,
      projectionCenter,
      bubbles?.domainKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, geoJson?.features, geoDomainKey, colorScale.scale]);

  return (
    <g {...rest} className="ez-map">
      {shapeData.map((shapeDatum, idx) => {
        return (
          <g>
            <MapPath
              key={idx}
              shapeDatum={shapeDatum}
              projectionType={projectionType}
              projectionCenter={projectionCenter}
              stroke={stroke}
            />
            {scopedSlots && scopedSlots.default ? (
              <g className="ez-map-bubble">
                {scopedSlots.default({ shapeDatum, scales: { rScale } })}
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
};
