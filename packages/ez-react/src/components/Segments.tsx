import React, { FC, SVGAttributes, useMemo } from 'react';
import { LineConfig, MarkerConfig, PointDatum } from 'eazychart-core/src/types';
import { Point } from '@/components/shapes/Point';
import { Points } from '@/components/Points';
import { LinePath } from '@/components/shapes/LinePath';
import { useColorScale } from '@/components/scales/ColorScale';
import { useChart } from '@/lib/use-chart';

export interface SegmentsProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKey: string;
  line?: LineConfig;
  marker?: MarkerConfig;
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
}) => {
  const {
    animationOptions: { duration },
  } = useChart();
  const { colorScale } = useColorScale();

  const color = useMemo(
    () => (colorScale.isDefined() ? colorScale.scale(yDomainKey) : line.stroke),
    [colorScale, yDomainKey, line]
  );

  return (
    <Points
      xDomainKey={xDomainKey}
      yDomainKey={yDomainKey}
      stroke={color}
      scopedSlots={{
        default: ({ shapeData }) => {
          const pointData: PointDatum[] = shapeData.map((pointDatum) => ({
            ...pointDatum,
            color,
          }));
          return (
            <g className="ez-segments">
              <LinePath
                shapeData={pointData}
                curve={line.curve}
                beta={line.beta}
                stroke={color}
                strokeWidth={line.strokeWidth}
              />
              {!marker.hidden &&
                pointData.map((pointDatum, idx) => {
                  const dur = duration / pointData.length;
                  const delay = dur * (idx + 1);
                  return (
                    <Point
                      key={pointDatum.id}
                      shapeDatum={pointDatum}
                      r={marker.radius}
                      fill={marker.color}
                      stroke={color}
                      strokeWidth={line.strokeWidth}
                      opacity={0}
                    >
                      <animate
                        attributeName="opacity"
                        attributeType="CSS"
                        from={0}
                        to={1}
                        begin={`${delay}ms`}
                        dur={`${dur}ms`}
                        fill={'freeze'}
                      />
                      <animate
                        attributeName="r"
                        from={0}
                        to={marker.radius}
                        begin={`${delay}ms`}
                        dur={`${dur}ms`}
                      />
                    </Point>
                  );
                })}
            </g>
          );
        },
      }}
    />
  );
};
