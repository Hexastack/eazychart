import { Position } from '../types';

export const isVerticalPosition = (position: Position) => {
  return position === Position.LEFT || position === Position.RIGHT;
};
