import { pie } from 'd3-shape';
import { ScaleBand, ScaleLinear } from '../scales';
import { StringLike } from '../scales/types';
import { Dimensions, NormalizedDatum } from '../types';
import { ArcDatum, PointDatum, RectangleDatum } from './types';

type ScaledDatumValue = {
  scaledValue: number;
  value: string | number;
};

type ComputedScale = ScaleBand | ScaleLinear;

export const scaleDatumValue = (
  datum: NormalizedDatum,
  computedScale: ComputedScale
): ScaledDatumValue => {
  if (computedScale instanceof ScaleLinear) {
    let value = 0;
    if (computedScale.definition.domainKey) {
      const v = datum[computedScale.definition.domainKey as string];
      value = Number.isFinite(v) ? (v as number) : 0;
    } else {
      // Pick the first match
      const match = Object.entries(datum).find(([_key, value]) => {
        return typeof value === 'number';
      });
      if (match) {
        const [, v] = match;
        value = Number(v);
      }
    }
    return {
      scaledValue: computedScale.scale(value) || 0,
      value,
    };
  }
  if (computedScale instanceof ScaleBand) {
    let value = '';
    // Check if the value attribute is provided
    if (computedScale.definition.domainKey) {
      const v = datum[computedScale.definition.domainKey as string];
      value = v ? (v as StringLike).toString() : '';
    } else {
      // Pick the first match
      const match = Object.entries(datum).find(([_key, value]) => {
        return typeof value === 'string';
      });
      if (match) {
        const [, v] = match;
        value = String(v);
      }
    }
    return {
      scaledValue: computedScale.scale(value) || 0,
      value,
    };
  } else {
    throw new Error('Unknown scale type');
  }
};

export const scaleVerticalRectangleData = (
  datum: NormalizedDatum,
  xScale: ScaleBand,
  yScale: ScaleLinear,
  dimensions: Dimensions
): RectangleDatum => {
  const { scaledValue: x, value: xValue } = scaleDatumValue(datum, xScale);
  const { scaledValue: y, value: yValue } = scaleDatumValue(datum, yScale);
  return {
    id: datum.id,
    color: datum.color,
    x,
    y,
    width: xScale.scale.bandwidth(),
    height: dimensions.height - y,
    xValue,
    yValue,
  };
};

export const scaleHorizontalRectangleData = (
  datum: NormalizedDatum,
  xScale: ScaleLinear,
  yScale: ScaleBand,
  dimensions: Dimensions,
  isRTL: boolean
): RectangleDatum => {
  const { scaledValue: x, value: xValue } = scaleDatumValue(datum, xScale);
  const { scaledValue: y, value: yValue } = scaleDatumValue(datum, yScale);
  return {
    id: datum.id,
    color: datum.color,
    x: isRTL ? x : 0,
    y,
    width: isRTL ? dimensions.width - x : x,
    height: yScale.scale.bandwidth(),
    xValue,
    yValue,
  };
};

export const scaleRectangleData = (
  data: NormalizedDatum[],
  xScale: ComputedScale,
  yScale: ComputedScale,
  dimensions: Dimensions,
  isRTL: boolean
): RectangleDatum[] => {
  if (xScale instanceof ScaleBand && yScale instanceof ScaleLinear) {
    // We need to display vertical bars
    return data.map(datum => {
      return scaleVerticalRectangleData(datum, xScale, yScale, dimensions);
    });
  } else if (xScale instanceof ScaleLinear && yScale instanceof ScaleBand) {
    // We need to display hoziontal bars
    return data.map(datum => {
      return scaleHorizontalRectangleData(
        datum,
        xScale,
        yScale,
        dimensions,
        isRTL
      );
    });
  } else {
    throw new Error('Bars requires two scale definitions : Linear and Band');
  }
};

export const scalePointDatum = (
  datum: NormalizedDatum,
  xScale: ComputedScale,
  yScale: ComputedScale,
  _dimensions: Dimensions,
  _isRTL: boolean
): PointDatum => {
  const { scaledValue: x, value: xValue } = scaleDatumValue(datum, xScale);
  const { scaledValue: y, value: yValue } = scaleDatumValue(datum, yScale);
  return {
    id: datum.id,
    color: datum.color,
    x,
    y,
    xValue,
    yValue,
  };
};

export const scalePointData = (
  data: NormalizedDatum[],
  xScale: ComputedScale,
  yScale: ComputedScale,
  dimensions: Dimensions,
  isRTL: boolean
): PointDatum[] => {
  return data.map(datum => {
    return scalePointDatum(datum, xScale, yScale, dimensions, isRTL);
  });
};

export const scaleBubbleData = (
  data: NormalizedDatum[],
  xScale: ComputedScale,
  yScale: ComputedScale,
  rScale: ScaleLinear,
  dimensions: Dimensions,
  isRTL: boolean
): PointDatum[] => {
  return data.map(datum => {
    const v =
      typeof rScale.definition.domainKey === 'string' &&
      rScale.definition.domainKey in datum
        ? datum[rScale.definition.domainKey]
        : 0;
    return {
      ...scalePointDatum(datum, xScale, yScale, dimensions, isRTL),
      radius: rScale.scale(v as number),
    };
  });
};

export const scalePieArcData = (
  data: NormalizedDatum[],
  scale: ComputedScale,
  startAngle: number = 0,
  endAngle: number = Math.PI * 2,
  sortValues?: (a: number, b: number) => number
): ArcDatum[] => {
  if (!scale) {
    return [];
  }
  const domainKey =
    typeof scale.definition.domainKey === 'string'
      ? scale.definition.domainKey
      : 'id';
  const values = data.map(d => d[domainKey]);
  const pieGenerator = pie()
    .startAngle(startAngle)
    .endAngle(endAngle);

  if (typeof sortValues === 'function') {
    pieGenerator.sortValues(sortValues);
  }
  const pieArcs = pieGenerator(values as number[]);
  return pieArcs.map((pieArc, idx) => {
    const d = data[idx];
    const shapeDatum: ArcDatum = {
      ...pieArc,
      id: d.id,
      color: d.color,
      xValue: '',
      yValue: '',
    };
    return shapeDatum;
  });
};

export const scaleArcData = (
  data: NormalizedDatum[],
  scale: ComputedScale,
  startAngle: number = 0,
  sortValues?: (a: number, b: number) => number
): ArcDatum[] => {
  if (!scale) {
    return [];
  }
  const domainKey =
    typeof scale.definition.domainKey === 'string'
      ? scale.definition.domainKey
      : 'id';

  const shapeData = data.map((d, idx) => {
    const v = d[domainKey] as number;
    const arc = {
      data: v,
      value: v as number,
      index: idx,
      startAngle: startAngle,
      endAngle: scale.scale(v as number) || 2 * Math.PI,
      padAngle: 0,
    };
    const shapeDatum: ArcDatum = {
      ...arc,
      id: d.id,
      color: d.color,
      xValue: '',
      yValue: '',
    };
    return shapeDatum;
  });
  if (typeof sortValues === 'function') {
    return shapeData.sort((a, b) => sortValues(a.value, b.value));
  }
  return shapeData;
};
