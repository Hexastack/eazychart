import { ScaleContinuousNumeric } from 'd3-scale';
import {
  ContiousScaleDefinition,
  ContinousScaleMinimalDefinition,
  ArrayOfTwoOrMoreNumbers,
  NumberLike,
} from '../types';
import { Dimensions, Direction } from '../../types';

export const getContinuousScaleDomain = (
  definition: ContinousScaleMinimalDefinition,
  data: Array<any>,
  fallback: ArrayOfTwoOrMoreNumbers = [0, 1]
): ArrayOfTwoOrMoreNumbers => {
  if (definition.domain) return definition.domain;
  if (Number.isFinite(definition.min) && Number.isFinite(definition.max))
    return [definition.min, definition.max] as [number, number];
  if (definition.domainKey && data.length) {
    const values: Array<number> = data.map((d) => {
      if (definition.domainKey && definition.domainKey in d) {
        if (Number.isFinite(+d[definition.domainKey]))
          return d[definition.domainKey];
      }
      return (
        Object.values(d).find((value: unknown) => Number.isFinite(value)) || 0
      );
    });
    const min = Number.isFinite(definition.min)
      ? (definition.min as number)
      : Math.min(definition.softMin, ...values) - definition.minPadding;
    const max = Number.isFinite(definition.max)
      ? (definition.max as number)
      : Math.max(definition.softMax, ...values) + definition.maxPadding;
    return [min, max];
  }
  return fallback;
};

const getAbsoluteContinuousScaleRange = (
  definition: ContinousScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: ArrayOfTwoOrMoreNumbers
): ArrayOfTwoOrMoreNumbers => {
  if (definition.range) return definition.range;
  if (definition.direction === Direction.HORIZONTAL)
    return [0, dimensions.width];
  if (definition.direction === Direction.VERTICAL)
    return [dimensions.height, 0];
  return fallback;
};

export const getContinuousScaleRange = (
  definition: ContinousScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: ArrayOfTwoOrMoreNumbers = [0, 1]
): ArrayOfTwoOrMoreNumbers => {
  const range = getAbsoluteContinuousScaleRange(
    definition,
    dimensions,
    fallback
  );
  if (definition.reverse) return range.reverse() as ArrayOfTwoOrMoreNumbers;
  return range;
};

export const configureContinuousScale = <
  T extends ScaleContinuousNumeric<NumberLike, number, unknown> & {
    unknown: (known: number) => T;
  }
>(
  scale: T,
  definition: ContiousScaleDefinition
): T => {
  if (definition.roundRange) scale = scale.rangeRound(scale.range());
  if (definition.unknown !== undefined) {
    scale = scale.unknown(definition.unknown as number);
  }
  // For logarithmic scales, nice() does not take any arguments, calling it with args wouldn't change anything
  if (definition.nice) scale = scale.nice(definition.nice);
  scale = scale.clamp(!!definition.clamp);
  return scale;
};
