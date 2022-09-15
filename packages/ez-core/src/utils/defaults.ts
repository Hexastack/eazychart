import { AxisData } from '../axis/types';
import {
  PointDatum,
  RectangleDatum,
  Circle,
  ChartPadding,
  ChartContext,
  TooltipContext,
  ShapeDatum,
} from './types';
import { Point, Anchor, Dimensions, ShapeAttributes } from '../types';
import { AnimationOptions } from '../animation/types';

export const defaultColor = '#1f77b4';

export const defaultTooltipOffset = { x: 16, y: -16 };

export const initialTooltipStyle = {
  left: '0px',
  top: '0px',
  opacity: 0.0,
};

export const tooltipAnimationOptions: AnimationOptions = {
  easing: 'easeExpOut',
  delay: 0,
  duration: 400,
};

export const defaultShapeAttributes: ShapeAttributes = {
  id: new Date().getTime().toString(),
  color: defaultColor,
  xValue: '',
  yValue: 0,
};

export const defaultPoint: Point = {
  x: 0,
  y: 0,
};

export const defaultPointDatum: PointDatum = {
  ...defaultPoint,
  ...defaultShapeAttributes,
};

export const defaultBubbleDatum: Circle = {
  ...defaultPointDatum,
  radius: 0,
  ...defaultShapeAttributes,
};

export const defaultPointRadius = 5;

export const defaultLineData: PointDatum[] = [];

export const defaultRectangle: Dimensions = {
  width: 0,
  height: 0,
};

export const defaultRectangleDatum: RectangleDatum = {
  ...defaultPoint,
  ...defaultRectangle,
  ...defaultShapeAttributes,
};

export const defaultChartDimensions: Dimensions = {
  width: 800,
  height: 600,
};

export const defaultChartPadding: ChartPadding = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
};

export const defaultChartAnimationOptions: AnimationOptions = {
  delay: 0,
  duration: 1000,
  easing: 'easeExpIn',
};

export const defaultAxis: AxisData = {
  anchor: Anchor.MIDDLE,
  path: {
    range0: 0,
    range1: 0,
    tick: 0,
  },
  ticks: [],
  x: 0,
  y: 0,
};

export const defaultTooltipContext: TooltipContext = {
  showTooltip: (_datum: ShapeDatum, _event: MouseEvent) => {},
  moveTooltip: (_datum: ShapeDatum, _event: MouseEvent) => {},
  hideTooltip: (_datum: ShapeDatum, _event: MouseEvent) => {},
};

export const defaultChartContext: ChartContext = {
  dimensions: defaultChartDimensions,
  padding: defaultChartPadding,
  animationOptions: undefined,
  scales: [],
  data: [],
  dataDict: {},
  activeData: [],
  toggleDatum: () => {},
  colors: [],
  isRTL: false,
};
