import { Anchor, Point } from '../types';

export interface AxisTimeInterval {
  range(start: Date, stop: Date, step?: number): Date[];
}

// next line does not translate well on typescript < 4.0.9 but it is more helpful
// export type tickArgs = [count?: number, specifier?: string];
export type tickArgs = [number?, string?];

export type tickFormater =
  | ((domainValue: any[], index: number) => string)
  | ((domainValue: Date) => string)
  | ((t: unknown) => unknown);

export type AxisTickLine = { x2?: number; y2?: number };

export type AxisTickText = {
  x?: number;
  y?: number;
  dy: number;
  text: string;
};

export type AxisTick = {
  transform: Point;
  line: AxisTickLine;
  text: AxisTickText;
};

export type AxisPath = {
  range0: number;
  range1: number;
  tick: number;
};

export type AxisTicks = {
  anchor: Anchor;
  path: AxisPath;
  ticks: AxisTick[];
};

export type AxisData = AxisTicks & Point;
