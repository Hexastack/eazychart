import { Point } from '../types';

export const transformTranslate = ({ x, y }: Point) => {
  return `translate(${x}, ${y})`;
};
