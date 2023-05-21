import { PieArcDatum } from 'd3-shape';
import * as d3Geo from 'd3-geo';
import {
  GeoJSON,
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from './geojson';
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
import { ScaleBand, ScaleLinear, ScaleOrdinal, ScaleQuantile } from '../scales';

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
  onShapeClick?: ShapeClickEventHandler;
  onLegendClick?: LegendClickEventHandler;
}

export interface MapContext {
  mapData: GeoFeatureData;
  projection: GeoProjection;
}

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

export type AnyScale = ScaleLinear | ScaleBand | ScaleOrdinal | ScaleQuantile;

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

export type GeoJsonData = GeoJSON;
export type GeoFeature = Feature<Geometry, GeoJsonProperties>;
export type GeoFeatureCollection = FeatureCollection<Geometry, GeoJsonProperties>
export type GeoFeatures = FeatureCollection['features'];

export type GeoProjection = d3Geo.GeoProjection;
export type GeoPathGenerator = d3Geo.GeoPath;

export type GeoProjectionType = keyof Pick<
  typeof d3Geo,
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
  | 'geoNaturalEarth1'
>;

export type GeoProjectionViewport = {
  center: [number, number],
  scale: number,
  offset: [number, number]
}

export type GeoFeatureDatum = ShapeAttributes & {
  feature: GeoFeature;
  centroid: Point;
};

export type GeoFeatureData = GeoFeatureDatum[];

export type MapConfig = {
  geoDomainKey: string;
  valueDomainKey: string;
  projectionType: GeoProjectionType;
  stroke: string;
  fill: string;
};


export type ShapeDatum = PointDatum | RectangleDatum | ArcDatum | GeoFeatureDatum;

export type ShapeClickEventHandler = (shapeDatum: ShapeDatum, e: MouseEvent) => void;

export type LegendClickEventHandler = (key: string, isActive: boolean, color: string) => void;
