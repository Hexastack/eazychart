import React, { FC, SVGAttributes, useMemo } from 'react';
import { AreaConfig, AreaData, MarkerConfig } from 'eazychart-core/src/types';
import { Point } from '@/components/shapes/Point';
import { Points } from '@/components/Points';
import { useColorScale } from '@/components/scales/ColorScale';
import { AreaPath } from './shapes/Area';
import { LinePath } from './shapes/LinePath';

export interface AreaProps extends SVGAttributes<SVGGElement> {
  xDomainKey: string;
  yDomainKey: string;
  area?: AreaConfig;
  marker?: MarkerConfig;
}

export const Area: FC<AreaProps> = ({
  xDomainKey,
  yDomainKey,
  area = {
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
  const { colorScale } = useColorScale();

  const color = useMemo(
    () => (colorScale.isDefined() ? colorScale.scale(yDomainKey) : area.fill),
    [area.fill, colorScale, yDomainKey]
  );
  return (
    <Points
      xDomainKey={xDomainKey}
      yDomainKey={yDomainKey}
      scopedSlots={{
        default: ({ shapeData, dimensions: chartDimensions }) => {
          const lineAreaData: AreaData = shapeData.map((d) => {
            return {
              x: d.x,
              y0: chartDimensions.height,
              y1: d.y,
            };
          });
          return (
            <g className="ez-area">
              <AreaPath
                shapeData={lineAreaData}
                curve={area.curve}
                beta={area.beta}
                fill={color}
                opacity={area.opacity}
              />
              <LinePath
                shapeData={shapeData}
                curve={area.curve}
                beta={area.beta}
                stroke={area.stroke}
                strokeWidth={area.strokeWidth}
              />
              {!marker.hidden &&
                shapeData.map((shapeDatum) => {
                  return (
                    <Point
                      key={shapeDatum.id}
                      shapeDatum={shapeDatum}
                      r={marker.radius}
                      fill={marker.color}
                      stroke={area.stroke}
                      strokeWidth={area.strokeWidth}
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
