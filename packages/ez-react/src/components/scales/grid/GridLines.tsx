import React, { FC, SVGAttributes, useMemo } from 'react';
import { Direction, AxisTick, AxisData } from 'eazychart-core/src/types';
import {
  getGrid,
  getAxisTickByCoordinate,
  transformTranslate,
  defaultAxis,
} from 'eazychart-core/src';
import { useAnimation } from '@/lib/use-animation';
import { useChart } from '@/lib/use-chart';
import { useCartesianScales } from '../CartesianScale';

export interface GridLinesProps extends SVGAttributes<SVGRectElement> {
  direction?: Direction;
  tickLength?: number;
  tickCount?: number;
  tickFormat?: Function;
  color?: string;
}

export const GridLines: FC<GridLinesProps> = ({
  direction = Direction.HORIZONTAL,
  tickLength = 1,
  tickCount = 10,
  tickFormat,
  color = '#a8a8a8',
}) => {
  const { dimensions, animationOptions } = useChart();
  const { xScale, yScale } = useCartesianScales();
  const isHorizontal = direction === Direction.HORIZONTAL;
  const lineScale = isHorizontal ? xScale : yScale;

  const targetGrid = useMemo(() => {
    return getGrid(direction, lineScale.scale, dimensions, {
      tickCount,
      // @todo should we leave it as it is, or pass on a prop ?
      tickSize: isHorizontal ? dimensions.width : dimensions.height,
      tickFormat,
    });
  }, [direction, isHorizontal, dimensions, lineScale, tickCount, tickFormat]);

  const currentGrid = useAnimation<AxisData>(
    targetGrid,
    defaultAxis,
    animationOptions
  );

  if (!currentGrid.ticks.length) {
    return null;
  }

  return (
    <g className="ez-grid-lines">
      {currentGrid.ticks.map((tick: AxisTick, index: number) => {
        return (
          <line
            key={index}
            transform={transformTranslate(tick.transform)}
            x2={getAxisTickByCoordinate(-(tick.line.x2 || 0), tickLength)}
            y2={getAxisTickByCoordinate(tick.line.y2 || 0, tickLength)}
            stroke={color}
            className="ez-grid-line"
          />
        );
      })}
    </g>
  );
};
