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
import { useSqrtScale } from './scales/SqrtScale';
import { Point } from './shapes/Point';

export interface BubbleMapChartProps extends SVGAttributes<SVGPathElement> {
  isWrapped?: boolean;
  map: MapConfig;
  bubbles: BubbleConfig;
  geoJson: GeoFeatureCollection;
  scopedSlots?: {
    default: ({ shapeDatum }: { shapeDatum: any }) => React.ReactChild;
  };
}

export const BubbleMap: React.FC<BubbleMapChartProps> = ({
  geoJson,
  bubbles,
  map,
  scopedSlots,

  ...rest
}: BubbleMapChartProps) => {
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
      rScale
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
            scopedSlots={{
              default: ({ shapeDatum }) => {
                return (
                  <g className="ez-area">
                    <Point
                      key={shapeDatum.id}
                      shapeDatum={shapeDatum.bubbleData}
                      r={(shapeDatum as any).bubbleData.radius}
                      fill={shapeDatum.color}
                      stroke={bubbles.stroke}
                      strokeWidth={1}
                    />
                  </g>
                );
              },
            }}
          />
        );
      })}
    </g>
  );
};
