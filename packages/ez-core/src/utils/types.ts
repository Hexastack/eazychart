import { PieArcDatum } from 'd3-shape';
import { GeoProjection } from 'd3-geo';
import { GeoJSON, Feature } from 'geojson';
import { AnimationOptions } from '../animation/types';
import {
  Dimensions,
  NormalizedData,
  NormalizedDataDict,
  Point,
  ScaleBandDefinition,
  ScaleLinearDefinition,
  ShapeAttributes,
} from '../types';
import { ScaleBand, ScaleLinear, ScaleOrdinal } from '../scales';
<<<<<<< HEAD
import { GeoJSON, Feature } from 'geojson';
import { GeoProjection } from 'd3-geo';
=======

>>>>>>> 29f483e (fix: fix failing tests)
export type Class<T> = new (...args: any[]) => T;

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

export type PointDatum = Point &
  ShapeAttributes & {
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
  isRTL: boolean;
  registerScale: (scaleId: string, scale: AnyScale) => void;
  getScale: (scaleId: string) => AnyScale | null;
  onLegendClick?: (key: string, isActive: boolean, color: string) => void;
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
  opacity?: number;
};

export type LineConfig = CurveConfig & {
  curve?: LineCurve;
};

export type AnyScale = ScaleLinear | ScaleBand | ScaleOrdinal;

export type ScaleLinearOrBand = ScaleBand | ScaleLinear;

export type ScaleConfig =
  | {
      ScaleClass: Class<ScaleLinear>;
      definition: ScaleLinearDefinition;
    }
  | {
      ScaleClass: Class<ScaleBand>;
      definition: ScaleBandDefinition;
    };

export type GeoJsonFeature = Feature;

export type GeoJSONData = GeoJSON;

export type Projection = GeoProjection;
<<<<<<< HEAD
=======

export type ProjectionTypes =
  | 'geoAzimuthalEqualArea'
  | 'geoAzimuthalEquidistant'
  | 'geoGnomonic'
  | 'geoOrthographic'
  | 'geoStereographic'
  | 'geoEqualEarth'
  | 'geoAlbers'
  | 'geoConicConformal'
  | 'geoConicEqualArea'
  | 'geoConicEquidistant'
  | 'geoEquirectangular'
  | 'geoMercator'
  | 'geoTransverseMercator'
  | 'geoNaturalEarth1';

export type MapConfig = {
  projectionType: ProjectionTypes;
  stroke: string;
  fill: string;
  scale: number;
};
>>>>>>> 29f483e (fix: fix failing tests)
