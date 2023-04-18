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
import {
  AnyScale,
  ArcDatum,
  GeoFeatureData,
  GeoFeatures,
  GeoProjection,
  PointDatum,
  RectangleDatum,
} from './types';
import { getGeoPathByProjection } from '../utils/map'

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
  data: NormalizedData,
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
  projection: GeoProjection,
  colorScale: AnyScale | undefined,
  defaultColor: string,
): GeoFeatureData => {
  const geoPath = getGeoPathByProjection(projection)
  return features.map((feature, idx) => {
    let color = defaultColor;
    let id: string = `${feature.id || idx}`;
    const { properties } = feature;
    // Check if geo domain key is part of the feature properties
    // and map each feature to it's corresponding datum.
    // We draw the feature anyway using the default color when
    // failing to find the corresponding datum so we are able
    // to draw the whole map.
    if (properties && geoDomainKey in properties) {
      const datum = data.find(
        datum => datum[geoDomainKey] === properties[geoDomainKey]
      );
      if (datum) {
        color =
          datum && colorScale?.isDefined()
            ? colorScale.scale(datum[valueDomainKey] as number)
            : defaultColor;
        id = datum.id;
      } else {
        console.warn(
          'Unable to find map feature to datum by the provided geo domain key'
        );
      }
    } else {
      console.warn(
        'Geo feature is missing the provided geo domain key property'
      );
    }

    const [x, y] = geoPath.centroid(feature);
    return {
      id,
      color,
      feature,
      centroid: { x, y },
    };
  });
};

export const scaleMapBubbleData = (
  data: NormalizedData,
  mapData: GeoFeatureData,
  projection: GeoProjection,
  rDomainKey: string,
  rScale: ScaleSqrt,
  colorScale: AnyScale
): PointDatum[] => {
  const geoPath = getGeoPathByProjection(projection)
  return mapData.map(shapeDatum => {
    const datum = data.find(
      datum => rDomainKey in datum && datum.id === shapeDatum.id
    );
    if (datum) {
      const v = datum[rDomainKey] as number;
      const [x, y] = geoPath.centroid(shapeDatum.feature);
      return {
        id: shapeDatum.id,
        x,
        y,
        radius: rScale.scale(v),
        color: colorScale.scale(v),
      };
    }
    return { id: shapeDatum.id, x: 0, y: 0, color: '#000' };
  });
};
