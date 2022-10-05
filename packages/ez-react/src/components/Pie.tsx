import React, { FC, SVGAttributes, useMemo } from 'react';
import { scalePieArcData } from 'eazychart-core/src';
import { Dimensions, Point, PieConfig } from 'eazychart-core/src/types';
import { useChart } from '@/lib/use-chart';
import { Arc } from '@/components/shapes/Arc';
import { useColorScale } from './scales/ColorScale';

export interface PieProps
  extends PieConfig,
    Omit<SVGAttributes<SVGPathElement>, 'stroke' | 'strokeWidth'> {
  domainKey: string;
  getCenter?: (dimensions: Dimensions) => Point;
  getRadius?: (dimensions: Dimensions) => number;
  startAngle?: number;
  endAngle?: number;
}

export const Pie: FC<PieProps> = ({
  domainKey,
  startAngle = 0,
  endAngle = 2 * Math.PI,
  getCenter = ({ width, height }) => ({ x: width / 2, y: height / 2 }),
  getRadius = ({ width, height }) => Math.min(width, height) / 2,
  donutRadius = 0,
  cornerRadius = 0,
  padAngle = 0,
  padRadius = 0,
  stroke,
  strokeWidth,
  sortValues,
  ...rest
}) => {
  const { data, dimensions } = useChart();
  const { colorScale } = useColorScale();
  const { width, height } = dimensions;
  const center = getCenter({ width, height });
  const radius = getRadius({ width, height });
  const outerRadius = radius;
  const innerRadius = radius * donutRadius;

  const shapeData = useMemo(() => {
    return scalePieArcData(
      data,
      domainKey,
      colorScale,
      startAngle,
      endAngle,
      sortValues
    );
  }, [data, domainKey, colorScale, sortValues, startAngle, endAngle]);

  return (
    <g
      transform={`translate(${center.x},${center.y})`}
      {...rest}
      className="ez-pie"
    >
      {shapeData.map((shapeDatum) => {
        return (
          <Arc
            key={shapeDatum.id}
            shapeDatum={shapeDatum}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            padAngle={padAngle}
            padRadius={padRadius}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
};
