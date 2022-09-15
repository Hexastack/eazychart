import { ScaleSequentialBase } from 'd3-scale';
import {
  ArrayOfTwoNumbers,
  NumberLike,
  SequentialScaleDefinition,
  SequentialScaleMinimalDefinition,
} from '../types';
import { Dimensions, Direction } from '../../types';

export const getSequentialScaleDomain = (
  definition: SequentialScaleMinimalDefinition,
  data: Array<any>,
  fallback: ArrayOfTwoNumbers = [0, 1]
): ArrayOfTwoNumbers => {
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

const getAbsoluteSequentialScaleRange = (
  definition: SequentialScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: ArrayOfTwoNumbers
): ArrayOfTwoNumbers => {
  if (definition.range) return definition.range;
  if (definition.direction === Direction.HORIZONTAL)
    return [0, dimensions.width];
  if (definition.direction === Direction.VERTICAL)
    return [dimensions.height, 0];
  return fallback;
};

export const getSequentialScaleRange = (
  definition: SequentialScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: ArrayOfTwoNumbers = [0, 1]
): ArrayOfTwoNumbers => {
  const range = getAbsoluteSequentialScaleRange(
    definition,
    dimensions,
    fallback
  );
  if (definition.reverse) return range.reverse() as ArrayOfTwoNumbers;
  return range;
};

export const configureSequentialScale = <
  T extends ScaleSequentialBase<NumberLike, number> & {
    unknown: (known: NumberLike) => T;
  }
>(
  scale: T,
  definition: SequentialScaleDefinition
): T => {
  // @ts-ignore
  if (definition.roundRange) scale = scale.rangeRound(scale.range());
  if (definition.unknown !== undefined) {
    scale = scale.unknown(definition.unknown as number);
  }

  scale = scale.clamp(!!definition.clamp);
  return scale;
};
