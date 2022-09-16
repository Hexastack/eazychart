import React, { FC, SVGAttributes, useMemo } from 'react';
import { useChart } from '@/lib/use-chart';
import { Arc } from './shapes/Arc';
import { Dimensions, Point, PieConfig } from 'eazychart-core/src/types';
import { ScaleLinear, scaleArcData } from 'eazychart-core/src';

export interface ArcsProps
  extends PieConfig,
    Omit<SVGAttributes<SVGPathElement>, 'stroke' | 'strokeWidth'> {
  arcScale: ScaleLinear;
  getCenter?: (dimensions: Dimensions) => Point;
  getRadius?: (dimensions: Dimensions) => number;
  startAngle?: number;
  endAngle?: number;
  spacing?: number;
}

export const Arcs: FC<ArcsProps> = ({
  startAngle = 0,
  endAngle = 2 * Math.PI,
  arcScale,
  getCenter = ({ width, height }) => ({ x: width / 2, y: height / 2 }),
  getRadius = ({ width, height }) => Math.min(width, height) / 2,
  cornerRadius = 0,
  stroke,
  strokeWidth,
  sortValues,
  spacing = 0,
  ...rest
}) => {
  const { activeData, dimensions } = useChart();
  const { width, height } = dimensions;
  const center = getCenter({ width, height });
  const radius = getRadius({ width, height });

  const shapeData = useMemo(() => {
    return scaleArcData(activeData, arcScale, startAngle, sortValues);
  }, [activeData, arcScale, sortValues, startAngle]);

  return (
    <g
      transform={`translate(${center.x},${center.y})`}
      {...rest}
      className="ez-arcs"
    >
      {shapeData.map((shapeDatum, index) => {
        const arcWidth = radius / shapeData.length;
        const outerRadius = radius - index * arcWidth;
        const newArcWidth = arcWidth * (1 - spacing);
        const innerRadius = outerRadius - newArcWidth;
        return (
          <Arc
            key={shapeDatum.id}
            shapeDatum={shapeDatum}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
};
