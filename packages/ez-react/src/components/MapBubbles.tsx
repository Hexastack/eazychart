import React, { FC, useMemo } from 'react';
import { scaleMapBubbleData } from 'eazychart-core/src';
import { PointDatum } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { Bubble } from '@/components/shapes/Bubble';
import { useSqrtScale } from './scales/SqrtScale';
import { useMap } from '@/lib/use-map';
import { useColorScale } from './scales/ColorScale';

export interface MapBubblesProps {
  geoDomainKey: string;
  rDomainKey: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  scopedSlots?: {
    default: ({ shapeData }: { shapeData: PointDatum[] }) => React.ReactChild;
  };
}

export const MapBubbles: FC<MapBubblesProps> = ({
  geoDomainKey,
  rDomainKey,
  stroke,
  strokeWidth,
  opacity,
  scopedSlots,
  ...rest
}) => {
  const { data } = useChart();
  const { sqrtScale: rScale } = useSqrtScale();
  const { projection, mapData } = useMap();
  const { colorScale } = useColorScale();

  const shapeData = useMemo(() => {
    return scaleMapBubbleData(
      data,
      mapData,
      geoDomainKey,
      rDomainKey,
      projection,
      rScale,
      colorScale
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, projection, geoDomainKey, rDomainKey, rScale]);

  if (scopedSlots && scopedSlots.default) {
    return (
      <g className="ez-map-bubbles" {...rest}>
        {scopedSlots.default({ shapeData })}
      </g>
    );
  }

  return (
    <g className="ez-map-bubbles" {...rest}>
      {shapeData.map((shapeDatum) => {
        return (
          <Bubble
            shapeDatum={shapeDatum}
            key={shapeDatum.id}
            stroke={stroke}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};
