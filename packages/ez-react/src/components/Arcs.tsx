import React, { FC, SVGAttributes, useMemo } from 'react';
import { useChart } from '@/lib/use-chart';
import { Arc } from './shapes/Arc';
import { Dimensions, Point, PieConfig } from 'eazychart-core/src/types';
import { scaleArcData } from 'eazychart-core/src';
import { useLinearScale } from './scales/LinearScale';
import { useColorScale } from './scales/ColorScale';

export interface ArcsProps
  extends PieConfig,
    Omit<SVGAttributes<SVGPathElement>, 'stroke' | 'strokeWidth'> {
  valueDomainKey: string;
  labelDomainKey: string;
  getCenter?: (dimensions: Dimensions) => Point;
  getRadius?: (dimensions: Dimensions) => number;
  startAngle?: number;
  endAngle?: number;
  spacing?: number;
}

export const Arcs: FC<ArcsProps> = ({
  valueDomainKey,
  labelDomainKey,
  getCenter = ({ width, height }) => ({ x: width / 2, y: height / 2 }),
  getRadius = ({ width, height }) => Math.min(width, height) / 2,
  startAngle = 0,
  endAngle = 2 * Math.PI,
  cornerRadius = 0,
  stroke,
  strokeWidth,
  sortValues,
  spacing = 0,
  ...rest
}) => {
  const { data, dimensions } = useChart();
  const { linearScale: angleScale } = useLinearScale();
  const { colorScale } = useColorScale();
  const { width, height } = dimensions;
  const center = getCenter({ width, height });
  const radius = getRadius({ width, height });

  const shapeData = useMemo(() => {
    return scaleArcData(
      data,
      valueDomainKey,
      labelDomainKey,
      angleScale,
      colorScale,
      startAngle,
      sortValues
    );
  }, [
    data,
    valueDomainKey,
    labelDomainKey,
    angleScale,
    colorScale,
    startAngle,
    sortValues,
  ]);

  return (
    <g
      transform={`translate(${center.x},${center.y})`}
      {...rest}
      className="ez-arcs"
      data-testid="ez-arcs"
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
