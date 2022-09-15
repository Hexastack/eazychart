import { ScaleDiverging } from 'd3-scale';
import {
  DivergingsScaleMinimalDefinition,
  DivergingsScaleDefinition,
  NumberLike,
} from '../types';
import { Dimensions, Direction } from '../../types';

export const getDivergingScaleDomain = (
  definition: DivergingsScaleMinimalDefinition,
  data: Array<any>,
  fallback: [number, number] = [0, 1]
): [number, number, number] => {
  if (definition.domain) return definition.domain;
  let continousDomain: [number, number] = [...fallback];
  let values: Array<number> = [];
  if (Number.isFinite(definition.min) && Number.isFinite(definition.max)) {
    continousDomain = [definition.min, definition.max] as [number, number];
  } else if (definition.domainKey && data.length) {
    values = data.map((d) => {
      if (definition.domainKey && definition.domainKey in d) {
        if (Number.isFinite(+d[definition.domainKey]))
          return d[definition.domainKey];
      }
      return Object.values(d).find((value: unknown) => Number.isFinite(value));
    });
    values = values
      .filter((value) => Number.isFinite(value))
      .sort((a, b) => a - b);
    const min = Number.isFinite(definition.min)
      ? (definition.min as number)
      : Math.min(definition.softMin, values[0]) - definition.minPadding;
    const max = Number.isFinite(definition.max)
      ? (definition.max as number)
      : Math.max(definition.softMax, values[values.length - 1]) +
        definition.maxPadding;
    continousDomain = [min, max];
  }

  if (continousDomain[0] === continousDomain[1]) {
    return [continousDomain[0], continousDomain[0], continousDomain[0]];
  }
  if (definition.center) {
    const sortDirection = continousDomain[1] - continousDomain[0];
    return (
      [continousDomain[0], definition.center, continousDomain[1]] as [
        number,
        number,
        number
      ]
    ).sort((a: number, b: number) => sortDirection * (a - b));
  }
  if (continousDomain[0] * continousDomain[1] < 0) {
    return [continousDomain[0], 0, continousDomain[1]];
  }
  if (values.length > 2) {
    return [
      continousDomain[0],
      values[Math.floor(values.length / 2)],
      continousDomain[1],
    ];
  }
  return [
    continousDomain[0],
    (continousDomain[0] + continousDomain[1]) / 2,
    continousDomain[1],
  ];
};

const getAbsoluteDivergingScaleRange = (
  definition: DivergingsScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: [number, number] | [number, number, number]
): [number, number] | [number, number, number] => {
  if (definition.range) return definition.range;
  if (definition.direction === Direction.HORIZONTAL)
    return [0, dimensions.width];
  if (definition.direction === Direction.VERTICAL)
    return [dimensions.height, 0];
  return fallback;
};

export const getDivergingScaleRange = (
  definition: DivergingsScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: [number, number] | [number, number, number] = [0, 1]
): [number, number, number] => {
  const range = getAbsoluteDivergingScaleRange(
    definition,
    dimensions,
    fallback
  );
  if (definition.reverse) range.reverse();
  if (range.length === 2)
    return [range[0], (range[0] + range[1]) / 2, range[1]];
  return range;
};

export const configureDivergingScale = <
  T extends ScaleDiverging<NumberLike, number>
>(
  scale: T,
  definition: DivergingsScaleDefinition
): T => {
  // @ts-ignore
  if (definition.roundRange) scale = scale.rangeRound(scale.range());
  if (definition.unknown !== undefined) {
    // @ts-ignore - Typeing lib default... return value should be this
    scale = scale.unknown(definition.unknown);
  }
  // For logarithmic scales, nice() does not take any arguments, calling it with args wouldn't change anything
  scale = scale.clamp(!!definition.clamp);
  return scale;
};
