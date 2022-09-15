import { ScalePoint } from 'd3-scale';
import {
  CategoricalScaleMinimalDefinition,
  ScaleOrdinalMinimalDefinition,
  ArrayOfStringLike,
  StringLike,
} from '../types';
import { Dimensions, Direction } from '../../types';

export const getCategoricalScaleDomain = (
  definition:
    | ScaleOrdinalMinimalDefinition
    | CategoricalScaleMinimalDefinition,
  data: Array<any>
): ArrayOfStringLike => {
  if (definition.domain) return definition.domain;
  if (definition.domainKey) {
    const domainSet = new Set(
      data.map((d) => d[definition.domainKey as string] as StringLike)
    )
    return Array.from(domainSet);
  }
  return [];
};

const getAbsoluteCategoricalScaleRange = (
  definition: CategoricalScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: [number, number]
): [number, number] => {
  if (definition.range) return definition.range;
  if (definition.direction === Direction.HORIZONTAL)
    return [0, dimensions.width];
  if (definition.direction === Direction.VERTICAL)
    return [dimensions.height, 0];
  return fallback;
};

export const getCategoricalScaleRange = (
  definition: CategoricalScaleMinimalDefinition,
  dimensions: Dimensions,
  fallback: [number, number] = [0, 1]
): [number, number] => {
  const range = getAbsoluteCategoricalScaleRange(
    definition,
    dimensions,
    fallback
  );
  if (definition.reverse) return range.reverse() as [number, number];
  return range;
};

export const configureCategoricalScale = <T extends ScalePoint<StringLike>>(
  scale: T,
  definition: CategoricalScaleMinimalDefinition
): T => {
  scale = scale
    .align(definition.align)
    .round(definition.round)
    .padding(definition.padding);
  if (definition.roundRange) scale = scale.rangeRound(scale.range());
  return new Proxy(scale, {
    apply: (target, _thisArg, argumentsList) => {
      const output = target(argumentsList[0]);
      if (output === undefined) return definition.unknown;
      return output;
    },
  });
};
