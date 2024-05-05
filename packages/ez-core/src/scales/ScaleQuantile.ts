import { ScaleQuantile as D3ScaleQuantile, scaleQuantile } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleQuantileDefinition,
  ScaleQuantileMinimalDefinition,
  ArrayOfTwoOrMoreNumbers,
  NumberLike,
} from './types';
import AbstractScale from './AbstractScale';

/**
 * @class ScaleQuantile
 * @see D3ScaleQuantile
 */
class ScaleQuantile
  extends AbstractScale
  implements
    ScaleInterface<ScaleQuantileDefinition, ScaleQuantileMinimalDefinition>
{
  constructor(definition: ScaleQuantileDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleQuantileDefinition;

  declare public definition: ScaleQuantileMinimalDefinition;

  declare public scale: D3ScaleQuantile<NumberLike, unknown>;

  protected defaultDefinition: ScaleQuantileMinimalDefinition = {
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    softMin: Infinity,
    softMax: -Infinity,
  };

  private getQuantileScaleDomain = (
    definition: ScaleQuantileMinimalDefinition,
    data: Array<any>,
    fallback: ArrayOfTwoOrMoreNumbers = [] as unknown as ArrayOfTwoOrMoreNumbers
  ): ArrayOfTwoOrMoreNumbers => {
    if (definition.domain) {
      return definition.domain;
    }

    if (definition.domainKey && data.length) {
      const values: Array<number> = data.map((d) => {
        if (definition.domainKey && definition.domainKey in d) {
          if (Number.isFinite(+d[definition.domainKey]))
            return d[definition.domainKey];
        }
        return (
          Object.values(d).find((value: unknown) => Number.isFinite(value)) || 0
        );
      }).sort((a, b) => a - b);

      const min = Number.isFinite(definition.min)
        ? (definition.min as number)
        : Math.min(definition.softMin, ...values) - definition.minPadding;
      const max = Number.isFinite(definition.max)
        ? (definition.max as number)
        : Math.max(definition.softMax, ...values) + definition.maxPadding;
      
      return [min, ...values.slice(1, -1), max] as unknown as ArrayOfTwoOrMoreNumbers;
    }
    return fallback;
  };
  getAbsoluteQuantileScaleRange = (
    definition: ScaleQuantileMinimalDefinition,
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
  getQuantileScaleRange = (
    definition: ScaleQuantileMinimalDefinition,
    dimensions: Dimensions,
    fallback: Array<unknown> = []
  ): Array<unknown> => {
    const range = this.getAbsoluteQuantileScaleRange(
      definition,
      dimensions,
      fallback
    );

    return range;
  };
  private configureQuantileScale = <
    T extends D3ScaleQuantile<NumberLike, unknown> & {
      unknown: () => unknown;
    }
  >(
    scale: T,
    definition: ScaleQuantileDefinition
  ): T => {
    if (definition.unknown !== undefined) {
      // @ts-ignore - Typescript still see definition.unknown as a possible undefined, thus it considers
      // scale.unknown() instead of scale.unknown(somethingDefined)
      scale = scale.unknown(definition.unknown);
    }

    return scale;
  };
  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleQuantile<NumberLike, unknown> {
    const range = this.getQuantileScaleRange(this.definition, dimensions);
    const domain = this.getQuantileScaleDomain(this.definition, data);

    let scale = scaleQuantile(range).domain(domain) as D3ScaleQuantile<
      NumberLike,
      unknown
    >;
    scale = this.configureQuantileScale(scale, this.definition);
    return scale;
  }
}

export default ScaleQuantile;
