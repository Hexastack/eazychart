export * from './animation/types';
export * from './axis/types';
export * from './scales/types';
export * from './utils/types';

export type Point = { x: number; y: number };

export type Dimensions = {
  width: number;
  height: number;
};

export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum Anchor {
  START = 'start',
  MIDDLE = 'middle',
  END = 'end',
}

export enum Position {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export type RawDatum = { [key: string]: unknown };

export type RawData = RawDatum[];

export type NormalizedDatum = RawDatum & {
  id: string;
  label: string;
  isActive: boolean;
};

export type NormalizedData = NormalizedDatum[];

export type NormalizedDataDict = { [id: string]: NormalizedDatum };

export interface ShapeAttributes {
  id: string;
  color?: string;
}

export interface GridConfig {
  directions?: Direction[];
  color?: string;
}

export interface AxisTickConfig {
  tickLength?: number;
  tickCount?: number;
  tickSize?: number;
  tickFormat?: Function;
}

export interface AxisTitleConfig {
  title?: string;
  titleAlign?: Anchor;
}

export interface AxisConfigBase<P = Position>
  extends AxisTickConfig,
    AxisTitleConfig {
  position?: P;
  nice?: number;
}

export interface AxisConfig<P = Position>
  extends AxisConfigBase<P> {
  domainKey: string;
}

export interface AxisConfigMulti<P = Position>
  extends AxisConfigBase<P> {
  domainKeys: string[];
}

export interface PointConfig {
  radius: number;
  color: string;
}

export interface MarkerConfig extends PointConfig {
  hidden: boolean;
}

export interface BubbleConfig {
  domainKey: string;
  minRadius: number;
  maxRadius: number;
  fill: string;
}
