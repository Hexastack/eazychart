import { ScaleThreshold } from 'd3-scale';
import {
  DateLike,
  ScaleThresholdDefinition,
  ScaleThresholdMinimalDefinition,
} from '../types';
import { Dimensions, Direction } from '../../types';

export const getThresholdScaleDomain = (
  definition: ScaleThresholdMinimalDefinition,
  data: Array<any>,
  fallback: Array<DateLike> = [0.5]
): Array<DateLike> => {
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

const getAbsoluteThresholdScaleRange = (
  definition: ScaleThresholdMinimalDefinition,
  dimensions: Dimensions,
  fallback: Array<unknown>
): Array<unknown> => {
  if (definition.range) return definition.range;
  if (definition.direction === Direction.HORIZONTAL)
    return [0, dimensions.width];
  if (definition.direction === Direction.VERTICAL)
    return [dimensions.height, 0];
  return fallback;
};

export const getThresholdScaleRange = (
  definition: ScaleThresholdMinimalDefinition,
  dimensions: Dimensions,
  fallback: Array<unknown> = [0, 1]
): Array<unknown> => {
  const range = getAbsoluteThresholdScaleRange(
    definition,
    dimensions,
    fallback
  );

  return range;
};

export const configureThresholdScale = <
  T extends ScaleThreshold<DateLike, unknown, unknown> & {
    unknown: () => unknown;
  }
>(
  scale: T,
  definition: ScaleThresholdDefinition
): T => {
  if (definition.unknown !== undefined) {
    // @ts-ignore - Typescript still see definition.unknown as a possible undefined, thus it considers
    // scale.unknown() instead of scale.unknown(somethingDefined)
    scale = scale.unknown(definition.unknown);
  }
  // For logarithmic scales, nice() does not take any arguments, calling it with args wouldn't change anything
  //   if (definition.invert) scale = scale.nice(definition.nice);
  //   scale = scale.clamp(!!definition.clamp);
  return scale;
};
