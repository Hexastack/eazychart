import {
  AnimationOptions,
  D3Scales,
  ChartPadding,
  Dimensions,
  Direction,
  NormalizedData,
  ArcDatum,
  PointDatum,
  RawData,
  RectangleDatum,
  ScaleBandDefinition,
  ScaleLinearDefinition,
  TooltipContext,
} from './types';

import  {
  ScaleLinear,
  ScaleBand,
} from '.';

export const rawData: RawData = [
  {
    id: '1',
    label: 'Alpha',
    value: 50,
    amount: 10,
    isActive: true,
  },
  {
    id: '2',
    label: 'Beta',
    value: 100,
    amount: 20,
    isActive: false,
  },
  {
    id: '3',
    label: 'Gamma',
    value: 75,
    amount: 30,
    isActive: true,
  },
];

export const colors = ['red', 'blue', 'green'];

export const chartData: NormalizedData = rawData.map((d, idx) => {
  return {
    ...d,
    id: d.id as string,
    label: d.label as string,
    color: colors[idx],
    isActive: d.isActive as boolean,
  };
});

export const verticalLinearScaleId = 'myVerticalLinearScale';
export const horizontalBandScaleId = 'myHorizontalBandScale';
export const horizontalLinearScaleId = 'myHorizontalLinearScale';
export const RadialLinearScaleId = 'myRadialLinearScale'

export const verticalLinearScaleDef: ScaleLinearDefinition = {
  direction: Direction.VERTICAL,
  nice: 3,
  domainKey: 'value',
};

export const horizontalBandScaleDef: ScaleBandDefinition = {
  direction: Direction.HORIZONTAL,
  domainKey: 'label',
  padding: 0,
  align: 0,
};

export const horizontalLinearScaleDef: ScaleLinearDefinition = {
  direction: Direction.HORIZONTAL,
  nice: 3,
  domainKey: 'amount',
};

export const RadialLinearScaleDef: ScaleLinearDefinition = {
  direction: Direction.HORIZONTAL,
  range: [0, 2 * Math.PI],
  domainKey: 'amount',
};

export const dimensions: Dimensions = {
  width: 800,
  height: 600,
};

export const padding: ChartPadding = {
  top: 10,
  right: 20,
  left: 20,
  bottom: 30,
};

export const animationOptions: AnimationOptions = {
  easing: 'easeLinear',
  duration: 1000,
  delay: 100,
};

export const scaleDefinitions = {
  [verticalLinearScaleId]: verticalLinearScaleDef,
  [horizontalBandScaleId]: horizontalBandScaleDef,
  [horizontalLinearScaleId]: horizontalLinearScaleDef,
  [RadialLinearScaleId] : RadialLinearScaleDef,
};

export const verticalLinearScale = new ScaleLinear(verticalLinearScaleDef);
export const horizontalBandScale = new ScaleBand(horizontalBandScaleDef);
export const horizontalLinearScale = new ScaleLinear(horizontalLinearScaleDef);
export const radialLinearScale = new ScaleLinear(RadialLinearScaleDef)

verticalLinearScale.computeScale(dimensions, chartData);
horizontalBandScale.computeScale(dimensions, chartData);
horizontalLinearScale.computeScale(dimensions, chartData);
radialLinearScale.computeScale(dimensions, chartData)

export const scales: {[scaleName: string]: D3Scales} = {
  [verticalLinearScaleId]: verticalLinearScale.scale,
  [horizontalBandScaleId]: horizontalBandScale.scale,
  [horizontalLinearScaleId]: horizontalLinearScale.scale,
  [RadialLinearScaleId] : radialLinearScale.scale
};

export const rectData: RectangleDatum = {
  id: '1',
  color: 'yellow',
  xValue: 'GDP',
  yValue: 100,
  x: 50,
  y: 10,
  width: 20,
  height: 100,
};

export const tooltip: TooltipContext = {
  showTooltip: jest.fn(),
  hideTooltip: jest.fn(),
  moveTooltip: jest.fn(),
};

export const pointA: PointDatum = {
  x: 10,
  y: 20,
  radius: 5,
  id: 'A',
  color: 'red',
  xValue: 'A',
  yValue: 10,
};

export const pointB: PointDatum = {
  x: 10,
  y: 40,
  radius: 5,
  id: 'B',
  color: 'blue',
  xValue: 'B',
  yValue: 25,
};

export const pointC: PointDatum = {
  x: 20,
  y: 40,
  radius: 5,
  id: 'C',
  color: 'yellow',
  xValue: 'C',
  yValue: 30,
};

export const pointsData: PointDatum[] = [pointA, pointB, pointC];

export const pointsWithMarginData: RawData = pointsData.map((d, idx) => {
  return {
    ...d,
    positiveMargin: (idx + 1) / 10,
    negativeMargin: 2 * (idx + 1) / 10,
  };
});

export const arcDatum: ArcDatum = {
  id: '1',
  color: 'yellow',
  xValue: 'GDP',
  yValue: 100,
  data: 100,
  value: 100,
  startAngle: 0,
  endAngle: 45,
  padAngle: 0,
  index: 0
};
