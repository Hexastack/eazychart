import { pie } from 'd3-shape';
import { ScaleBand, ScaleLinear, ScaleSqrt } from '../scales';
import {
  ArrayOfTwoNumbers,
  Dimensions,
  NormalizedData,
  NormalizedDatum,
  NumberLike,
  RawData,
} from '../types';
import { calculateCentroid, getGeoFeatureDataDict } from './map';
import {
  AnyScale,
  ArcDatum,
  GeoFeatureDatum,
  GeoFeatures,
  GeoProjectionCenter,
  GeoProjectionType,
  PointDatum,
  RectangleDatum,
} from './types';

export const scaleDatumValue = <T = string | number>(
  datum: NormalizedDatum,
  domainKey: string,
  AnyScale: AnyScale
) => {
  if (domainKey in datum) {
    const value = datum[domainKey] as T;
    const scaleValue = AnyScale.scale(value as NumberLike) || 0;
    return scaleValue;
  }
  throw new Error('Domain key does not exist in the supplied data');
};

export const scaleVerticalRectangleData = (
  datum: NormalizedDatum,
  xDomainKey: string,
  yDomainKey: string,
  xScale: ScaleBand,
  yScale: ScaleLinear,
  colorScale: AnyScale,
  dimensions: Dimensions
): RectangleDatum => {
  const x = scaleDatumValue(datum, xDomainKey, xScale);
  const y = scaleDatumValue(datum, yDomainKey, yScale);
  const color = scaleDatumValue(datum, xDomainKey, colorScale);
  return {
    id: datum.id,
    color,
    x,
    y,
    width: xScale.scale.bandwidth(),
    height: dimensions.height - y,
  };
};

export const scaleHorizontalRectangleData = (
  datum: NormalizedDatum,
  xDomainKey: string,
  yDomainKey: string,
  xScale: ScaleLinear,
  yScale: ScaleBand,
  colorScale: AnyScale,
  dimensions: Dimensions,
  isRTL: boolean
): RectangleDatum => {
  const x = scaleDatumValue(datum, xDomainKey, xScale);
  const y = scaleDatumValue(datum, yDomainKey, yScale);
  const color = scaleDatumValue(datum, yDomainKey, colorScale);
  return {
    id: datum.id,
    color,
    x: isRTL ? x : 0,
    y,
    width: isRTL ? dimensions.width - x : x,
    height: yScale.scale.bandwidth(),
  };
};

export const scaleRectangleData = (
  data: NormalizedDatum[],
  xDomainKey: string,
  yDomainKey: string,
  xScale: AnyScale,
  yScale: AnyScale,
  colorScale: AnyScale,
  dimensions: Dimensions,
  isRTL: boolean
): RectangleDatum[] => {
  if (xScale instanceof ScaleBand && yScale instanceof ScaleLinear) {
    // We need to display vertical bars
    return data.map(datum => {
      return scaleVerticalRectangleData(
        datum,
        xDomainKey,
        yDomainKey,
        xScale,
        yScale,
        colorScale,
        dimensions
      );
    });
  } else if (xScale instanceof ScaleLinear && yScale instanceof ScaleBand) {
    // We need to display hoziontal bars
    return data.map(datum => {
      return scaleHorizontalRectangleData(
        datum,
        xDomainKey,
        yDomainKey,
        xScale,
        yScale,
        colorScale,
        dimensions,
        isRTL
      );
    });
  } else {
    console.warn('Bars requires two scale definitions : Linear and Band');
    return [];
  }
};

export const scalePointDatum = (
  datum: NormalizedDatum,
  xDomainKey: string,
  yDomainKey: string,
  xScale: AnyScale,
  yScale: AnyScale
): PointDatum => {
  const x = scaleDatumValue(datum, xDomainKey, xScale);
  const y = scaleDatumValue(datum, yDomainKey, yScale);
  return {
    id: datum.id,
    x,
    y,
  };
};

export const scalePointData = (
  data: NormalizedData,
  xDomainKey: string,
  yDomainKey: string,
  xScale: AnyScale,
  yScale: AnyScale
): PointDatum[] => {
  return data.map(datum => {
    return scalePointDatum(datum, xDomainKey, yDomainKey, xScale, yScale);
  });
};

export const scaleBubbleData = (
  data: NormalizedDatum[],
  xDomainKey: string,
  yDomainKey: string,
  rDomainKey: string,
  xScale: AnyScale,
  yScale: AnyScale,
  rScale: ScaleLinear
): PointDatum[] => {
  return data
    .filter(datum => rDomainKey in datum)
    .map(datum => {
      const v = datum[rDomainKey];
      return {
        ...scalePointDatum(datum, xDomainKey, yDomainKey, xScale, yScale),
        radius: rScale.scale(v as number),
      };
    });
};

export const scalePieArcData = (
  data: NormalizedDatum[],
  valueDomainKey: string,
  labelDomainKey: string,
  colorScale: AnyScale,
  startAngle: number = 0,
  endAngle: number = Math.PI * 2,
  sortValues?: (a: number, b: number) => number
): ArcDatum[] => {
  const values = data.map(d => d[valueDomainKey]);
  const pieGenerator = pie()
    .startAngle(startAngle)
    .endAngle(endAngle);

  if (typeof sortValues === 'function') {
    pieGenerator.sortValues(sortValues);
  }
  const pieArcs = pieGenerator(values as number[]);
  return pieArcs.map((pieArc, idx) => {
    const datum = data[idx];
    const color = scaleDatumValue(datum, labelDomainKey, colorScale);
    const shapeDatum: ArcDatum = {
      ...pieArc,
      id: datum.id,
      color,
    };
    return shapeDatum;
  });
};

export const scaleArcData = (
  data: NormalizedDatum[],
  valueDomainKey: string,
  labelDomainKey: string,
  angleScale: AnyScale,
  colorScale: AnyScale,
  startAngle: number = 0,
  sortValues?: (a: number, b: number) => number
): ArcDatum[] => {
  if (!angleScale) {
    return [];
  }

  const shapeData = data.map((datum, idx) => {
    const endAngle = scaleDatumValue(datum, valueDomainKey, angleScale);
    const color = scaleDatumValue(datum, labelDomainKey, colorScale);
    const value = datum[valueDomainKey] as number;
    const arc = {
      data: value,
      value: value,
      index: idx,
      startAngle: startAngle,
      endAngle: endAngle || 2 * Math.PI,
      padAngle: 0,
    };
    const shapeDatum: ArcDatum = {
      ...arc,
      id: datum.id,
      color,
    };
    return shapeDatum;
  });
  if (typeof sortValues === 'function') {
    return shapeData.sort((a, b) => sortValues(a.value, b.value));
  }
  return shapeData;
};

export const getDomainByKeys = (domainKeys: string[], data: RawData) => {
  return domainKeys.reduce(
    ([min, max], domainKey) => {
      const values = data.map(datum => datum[domainKey] as number);
      return [Math.min(min, ...values), Math.max(max, ...values)];
    },
    [+Infinity, -Infinity] as number[]
  ) as ArrayOfTwoNumbers;
};

export const scaleGeoFeatureData = (
  data: NormalizedData,
  features: GeoFeatures,
  geoDomainKey: string,
  valueDomainKey: string,
  colorScale: AnyScale | undefined,
  defaultColor: string,
  projectionType?: GeoProjectionType,
  projectionCenter?: GeoProjectionCenter,
  rScale?: ScaleSqrt
): GeoFeatureDatum[] => {
  const geoFeatureDataDict = getGeoFeatureDataDict(
    features,
    data,
    geoDomainKey
  );
  return Object.values(geoFeatureDataDict).map(({ feature, datum }) => {
    let bubbleData = {};
    if (rScale && projectionCenter && projectionType) {
      bubbleData = scaleMapBubbleData(
        datum,
        feature,
        valueDomainKey,
        rScale,
        projectionType,
        projectionCenter
      );
    }
    const color =
      datum && colorScale?.isDefined()
        ? colorScale.scale(datum[valueDomainKey] as number)
        : defaultColor;

    if (bubbleData) {
      return {
        id: datum?.id,
        color,
        bubbleData,
        ...feature,
      } as GeoFeatureDatum;
    }
    return {
      id: datum?.id,
      color,
      ...feature,
    } as GeoFeatureDatum;
  });
};

export const scaleMapBubbleData = (
  datum: any,
  feature: any,
  rDomainKey: string,
  rScale: any,
  projectionType: GeoProjectionType,
  projectionCenter: GeoProjectionCenter
): any[] => {
  if (rDomainKey in datum) {
    const v = datum[rDomainKey];
    return {
      ...datum,
      ...calculateCentroid(
        feature,
        projectionType,
        projectionCenter,
        Number(datum.id)
      ),
      radius: rScale.scale(v as number),
    };
  }
  return [];
};
