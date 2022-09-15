import React, { FC, SVGAttributes } from 'react';
import { Direction, GridConfig } from '@ez/core/src/types';
import { GridLines } from './GridLines';
import { ScaleBand, ScaleLinear } from '@ez/core/src';

export interface GridProps
  extends Omit<SVGAttributes<SVGRectElement>, 'directions'>,
    GridConfig {
  xScale: ScaleBand | ScaleLinear;
  yScale: ScaleBand | ScaleLinear;
}

export const Grid: FC<GridProps> = ({
  directions = [Direction.HORIZONTAL, Direction.VERTICAL],
  color = '#a8a8a8',
  xScale,
  yScale,
  ...rest
}) => {
  return Array.isArray(directions) && directions.length > 0 ? (
    <g className="ez-grid" {...rest}>
      {directions.includes(Direction.HORIZONTAL) && (
        <GridLines
          color={color}
          direction={Direction.HORIZONTAL}
          aScale={yScale}
        />
      )}
      {directions.includes(Direction.VERTICAL) && (
        <GridLines
          color={color}
          direction={Direction.VERTICAL}
          aScale={xScale}
        />
      )}
    </g>
  ) : null;
};
