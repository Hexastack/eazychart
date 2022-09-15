import { PieArcDatum } from 'd3-shape';
import { AnimationOptions } from '../animation/types';
import {
  Dimensions,
  NormalizedData,
  NormalizedDataDict,
  NormalizedDatum,
  Point,
  ShapeAttributes,
} from '../types';

export type ChartPadding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type TickOptions = {
  /**
   * An optional count argument requests more or fewer ticks.
   * The number of ticks returned, however, is not necessarily equal to the requested count.
   * Ticks are restricted to nicely-rounded values (multiples of 1, 2, 5 and powers of 10),
   * and the scale’s domain can not always be subdivided in exactly count such intervals.
   *
   * The returned tick values are uniformly spaced, have human-readable values
   * Defaults to 10 if not supplied.
   */
  tickCount?: number;
  tickSize?: number;
  tickFormat?: Function;
};

export type PointDatum = Point & {
  id: string;
  color: string;
  xValue: number | string;
  yValue: number | string;
  radius?: number;
};

export type RectangleDatum = Point & Dimensions & ShapeAttributes;

export type Circle = Point & { radius: number };

export type AreaDatum = {
  x: number;
  y0: number;
  y1: number;
};

export type ArcDatum = ShapeAttributes &
  PieArcDatum<
    | number
    | {
        valueOf(): number;
      }
  >;

export interface ArcConfig {
  cornerRadius?: number;
  padAngle?: number;
  padRadius?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface PieConfig extends ArcConfig {
  donutRadius?: number; // [0 .. 1]
  sortValues?: (a: number, b: number) => number;
}

export interface RadialConfig extends PieConfig {
  spacing?: number;
}

export interface ChartContext {
  dimensions: Dimensions;
  padding: ChartPadding;
  animationOptions?: AnimationOptions;
  data: NormalizedData;
  dataDict: NormalizedDataDict;
  activeData: NormalizedData;
  toggleDatum: (
    datum: NormalizedDatum,
    newState: boolean,
    idx: number
  ) => void;
  colors: string[];
  isRTL: boolean;
  scales: any[];
}

export type ShapeDatum = PointDatum | RectangleDatum | ArcDatum;

export type TooltipContext = {
  showTooltip: (_datum: ShapeDatum, _event: MouseEvent) => void;
  hideTooltip: (_datum: ShapeDatum, _event: MouseEvent) => void;
  moveTooltip: (_datum: ShapeDatum, _event: MouseEvent) => void;
};

export type LineData = PointDatum[];

export type AreaData = AreaDatum[];

export type AreaCurve =
  | 'curveLinear'
  | 'curveBasis'
  | 'curveBumpX'
  | 'curveBumpY'
  | 'curveCardinal'
  | 'curveNatural'
  | 'curveStep'
  | 'curveStepAfter'
  | 'curveStepBefore';

export type LineCurve = AreaCurve | 'curveBundle';

type CurveConfig = {
  stroke: string;
  strokeWidth?: number;
  beta?: number;
};

export type AreaConfig = CurveConfig & {
  curve?: AreaCurve;
  fill?: string;
};

export type LineConfig = CurveConfig & {
  curve?: LineCurve;
};
