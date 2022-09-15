import { ScaleQuantize as D3ScaleQuantize, scaleQuantize } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleQuantizeDefinition,
  ScaleQuantizeMinimalDefinition,
  ArrayOfTwoNumbers,
  NumberLike,
} from './types';
import { getThresholdScaleRange } from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see D3ScaleQuantize
 */
class ScaleQuantize
  extends AbstractScale
  implements
    ScaleInterface<ScaleQuantizeDefinition, ScaleQuantizeMinimalDefinition>
{
  constructor(definition: ScaleQuantizeDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleQuantizeDefinition;

  declare public definition: ScaleQuantizeMinimalDefinition;

  declare public scale: D3ScaleQuantize<NumberLike, unknown>;

  protected defaultDefinition: ScaleQuantizeMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    softMin: Infinity,
    softMax: -Infinity,
    nice: 0,
  };

  private getQuantizeScaleDomain = (
    definition: ScaleQuantizeMinimalDefinition,
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

  private configureQuantizeScale = <
    T extends D3ScaleQuantize<NumberLike, unknown> & {
      unknown: () => unknown;
    }
  >(
    scale: T,
    definition: ScaleQuantizeDefinition
  ): T => {
    if (definition.unknown !== undefined) {
      // @ts-ignore - Typescript still see definition.unknown as a possible undefined, thus it considers
      // scale.unknown() instead of scale.unknown(somethingDefined)
      scale = scale.unknown(definition.unknown);
    }
    if (definition.nice) scale = scale.nice(definition.nice);
    return scale;
  };
  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleQuantize<NumberLike, unknown> {
    const range = getThresholdScaleRange(this.definition, dimensions);
    const domain = this.getQuantizeScaleDomain(this.definition, data);

    let scale = scaleQuantize(range).domain(domain) as D3ScaleQuantize<
      NumberLike,
      unknown
    >;
    scale = this.configureQuantizeScale(scale, this.definition);
    return scale;
  }
}

export default ScaleQuantize;
