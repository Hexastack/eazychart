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
  RawDatum,
  AreaData,
  GeoFeatureCollection,
  GeoFeature,
} from './types';

import { ScaleLinear, ScaleBand, ScaleOrdinal } from '.';

export const rawData: RawData = [
  {
    id: '1',
    label: 'Alpha',
    value: 50,
    amount: 10,
  },
  {
    id: '2',
    label: 'Beta',
    value: 100,
    amount: 20,
  },
  {
    id: '3',
    label: 'Gamma',
    value: 75,
    amount: 30,
  },
];

export const colors = ['red', 'blue', 'green'];

export const chartData: NormalizedData = rawData.map((d, idx) => {
  return {
    ...d,
    id: d.id as string,
    label: d.label as string,
    color: colors[idx],
  };
});

export const verticalLinearScaleId = 'myVerticalLinearScale';
export const horizontalBandScaleId = 'myHorizontalBandScale';
export const horizontalLinearScaleId = 'myHorizontalLinearScale';
export const RadialLinearScaleId = 'myRadialLinearScale';

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

export const radialLinearScaleDef: ScaleLinearDefinition = {
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
  [RadialLinearScaleId]: radialLinearScaleDef,
};

export const verticalLinearScale = new ScaleLinear(verticalLinearScaleDef);
export const horizontalBandScale = new ScaleBand(horizontalBandScaleDef);
export const horizontalLinearScale = new ScaleLinear(horizontalLinearScaleDef);
export const radialLinearScale = new ScaleLinear(radialLinearScaleDef);
export const colorScale = new ScaleOrdinal({
  domainKey: 'label',
  range: colors,
});

verticalLinearScale.computeScale(dimensions, chartData);
horizontalBandScale.computeScale(dimensions, chartData);
horizontalLinearScale.computeScale(dimensions, chartData);
radialLinearScale.computeScale(dimensions, chartData);
colorScale.computeScale(dimensions, chartData);

export const scales: { [scaleName: string]: D3Scales } = {
  [verticalLinearScaleId]: verticalLinearScale.scale,
  [horizontalBandScaleId]: horizontalBandScale.scale,
  [horizontalLinearScaleId]: horizontalLinearScale.scale,
  [RadialLinearScaleId]: radialLinearScale.scale,
};

export const rectData: RectangleDatum = {
  id: '1',
  color: 'yellow',
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

export const datumA: RawDatum = {
  id: 'A',
  color: 'red',
  xValue: 0,
  yValue: 10,
  zValue: 100,
};

export const pointA: PointDatum = {
  id: 'A',
  color: 'red',
  x: 10,
  y: 20,
  radius: 5,
};

export const datumB: RawDatum = {
  id: 'B',
  color: 'blue',
  xValue: 10,
  yValue: 25,
  zValue: 250,
};

export const pointB: PointDatum = {
  id: 'B',
  color: 'blue',
  x: 10,
  y: 40,
  radius: 5,
};

export const datumC: RawDatum = {
  id: 'C',
  color: 'yellow',
  xValue: 15,
  yValue: 30,
  zValue: 300,
};

export const pointC: PointDatum = {
  id: 'C',
  color: 'yellow',
  x: 20,
  y: 40,
  radius: 5,
};

export const pointsRawData: RawData = [datumA, datumB, datumC];

export const pointsData: PointDatum[] = [pointA, pointB, pointC];

export const pointsWithMarginData: RawData = pointsRawData.map((d, idx) => {
  return {
    ...d,
    positiveMargin: (idx + 1) / 10,
    negativeMargin: (2 * (idx + 1)) / 10,
  };
});

export const arcDatum: ArcDatum = {
  id: '1',
  color: 'yellow',
  data: 100,
  value: 100,
  startAngle: 0,
  endAngle: 45,
  padAngle: 0,
  index: 0,
};

export const areaData: AreaData = [
  {
    x: 5,
    y0: 10,
    y1: 20,
  },
  {
    x: 10,
    y0: 7,
    y1: 13,
  },
  {
    x: 15,
    y0: 9,
    y1: 18,
  },
];

export const geoFeatureA: GeoFeature = {
  type: 'Feature',
  properties: { label: 'Alpha' },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        
        [-114.03808593750001, 42.00032514831623],
        [-110.96191406250001, 42.00032514831623],
        [-111.00585937500001, 40.97989806962016],
        [-109.11621093750001, 41.0130657870063],
        [-109.11621093750001, 36.98500309285596],
        [-114.03808593750001, 37.02009820136812],
        [-114.03808593750001, 42.00032514831623]
      ]
    ]
  }  
}

export const geoFeatureB: GeoFeature = {
  type: 'Feature',
  properties: { label: 'Beta' },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-111.09375000000001, 44.93369638969471],
        [-104.0625, 44.96479793033104],
        [-103.93066406250001, 41.0130657870063],
        [-111.00585937500001, 40.97989806962016],
        [-111.09375000000001, 44.93369638969471]
      ]
    ]
  }
}


export const geoFeatureC: GeoFeature = {
  type: 'Feature',
  properties: { label: 'Gamma' },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-109.20444401111992, 40.98834448518997],
        [-103.93066406250001, 41.0130657870063],
        [-102.04101562500001, 39.60568817832081],
        [-101.99707031250001, 37.02009820136812],
        [-109.11621093750001, 36.98500309285596],
        [-109.20444401111992, 40.98834448518997]
      ]
    ]
  }
}

export const mapFeatureData: GeoFeatureCollection = {
  type: 'FeatureCollection',
  features: [geoFeatureA, geoFeatureB, geoFeatureC]
}
 