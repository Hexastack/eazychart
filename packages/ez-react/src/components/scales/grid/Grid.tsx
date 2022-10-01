import React, { FC, SVGAttributes } from 'react';
import { Direction, GridConfig } from 'eazychart-core/src/types';
import { GridLines } from '@/components/scales/grid/GridLines';

export interface GridProps
  extends Omit<SVGAttributes<SVGRectElement>, 'directions'>,
    GridConfig {}

export const Grid: FC<GridProps> = ({
  directions = [Direction.HORIZONTAL, Direction.VERTICAL],
  color = '#a8a8a8',
  ...rest
}) => {
  return Array.isArray(directions) && directions.length > 0 ? (
    <g className="ez-grid" {...rest}>
      {directions.includes(Direction.HORIZONTAL) && (
        <GridLines color={color} direction={Direction.HORIZONTAL} />
      )}
      {directions.includes(Direction.VERTICAL) && (
        <GridLines color={color} direction={Direction.VERTICAL} />
      )}
    </g>
  ) : null;
};
