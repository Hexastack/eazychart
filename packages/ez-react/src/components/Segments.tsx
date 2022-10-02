import React, { FC, SVGAttributes, useMemo } from 'react';
import { ScaleOrdinal, scalePointData } from 'eazychart-core/src';
import {
  Dimensions,
  LineConfig,
  MarkerConfig,
  PointDatum,
} from 'eazychart-core/src/types';
import { Point } from '@/components/shapes/Point';
import { useChart } from '@/lib/use-chart';
import {
  ScaleLinearOrBand,
  useCartesianScales,
} from '@/components/scales/CartesianScale';
import { Points } from '@/components/Points';
import { LinePath } from '@/components/shapes/LinePath';
import { useColorScale } from '@/components/scales/ColorScale';

export interface SegmentsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKey: string;
  line?: LineConfig;
  marker?: MarkerConfig;
  scopedSlots?: {
    default: ({
      shapeData,
      scales,
      dimensions,
    }: {
      shapeData: PointDatum[];
      scales: {
        xScale: ScaleLinearOrBand;
        yScale: ScaleLinearOrBand;
        colorScale: ScaleOrdinal;
      };
      dimensions: Dimensions;
    }) => React.ReactChild;
  };
}

export const Segments: FC<SegmentsProps> = ({
  xDomainKey,
  yDomainKey,
  line = {
    stroke: '#339999',
    strokeWidth: 2,
    curve: 'curveLinear',
  },
  marker = {
    hidden: true,
    radius: 5,
    color: '#FFF',
  },
  scopedSlots,
}) => {
  const { activeData, dimensions } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const { colorScale } = useColorScale();

  const shapeData = useMemo(() => {
    if (!xScale || !yScale) {
      return [];
    }
    return scalePointData(activeData, xDomainKey, yDomainKey, xScale, yScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeData, xDomainKey, yDomainKey, xScale.scale, yScale.scale]);

  if (scopedSlots && scopedSlots.default) {
    return (
      <g className="ez-points">
        {scopedSlots.default({
          shapeData,
          scales: { xScale, yScale, colorScale },
          dimensions,
        })}
      </g>
    );
  }

  return (
    <Points
      xDomainKey={xDomainKey}
      yDomainKey={yDomainKey}
      scopedSlots={{
        default: ({ shapeData }) => {
          const color = colorScale.scale(yDomainKey);
          return (
            <g className="ez-segment">
              <LinePath
                shapeData={shapeData}
                curve={line.curve}
                beta={line.beta}
                stroke={color}
                strokeWidth={line.strokeWidth}
              />
              {!marker.hidden &&
                shapeData.map((shapeDatum) => {
                  return (
                    <Point
                      key={shapeDatum.id}
                      shapeDatum={shapeDatum}
                      r={marker.radius}
                      fill={marker.color}
                      stroke={color}
                      strokeWidth={line.strokeWidth}
                    />
                  );
                })}
            </g>
          );
        },
      }}
    />
  );
};
