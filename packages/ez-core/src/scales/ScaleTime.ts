import { ScaleTime as D3ScaleTime, scaleTime } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleTimeDefinition,
  ScaleTimeMinimalDefinition,
  ArrayOfTwoOrMoreNumbers,
  DateLike,
  dateLikeKeys,
  NumberLike,
} from './types';
import {
  getContinuousScaleRange,
  getContinuousScaleDomain,
  configureContinuousScale,
} from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see D3ScaleTime
 */
class ScaleTime
  extends AbstractScale
  implements
    ScaleInterface<ScaleTimeDefinition, ScaleTimeMinimalDefinition>
{
  constructor(definition: ScaleTimeDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleTimeDefinition;

  declare public definition: ScaleTimeMinimalDefinition;

  declare public scale: D3ScaleTime<NumberLike, number, number>;

  protected defaultDefinition: ScaleTimeMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'time',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    nice: 0,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
  };

  private convertDateLikeToNumber(value?: DateLike): number {
    if (value === undefined) return 0;
    const number = +new Date(value);
    if (Number.isFinite(number)) return number;
    return 0;
  }

  private normalizeUserDefinition(): ScaleTimeMinimalDefinition {
    const normalizedUserDefinition: ScaleTimeDefinition = {
      ...this.userDefinition,
    };
    if (normalizedUserDefinition.domain !== undefined) {
      normalizedUserDefinition.domain = normalizedUserDefinition.domain.map(
        (value: DateLike) => this.convertDateLikeToNumber(value)
      ) as ArrayOfTwoOrMoreNumbers;
    }
    dateLikeKeys.forEach((key) => {
      if (normalizedUserDefinition[key] !== undefined) {
        normalizedUserDefinition[key] = this.convertDateLikeToNumber(
          normalizedUserDefinition[key]
        );
      }
    });
    return {
      ...this.userDefinition,
      ...normalizedUserDefinition,
    } as ScaleTimeMinimalDefinition;
  }

  protected mergeDefinition(): void {
    this.definition = {
      ...this.defaultDefinition,
      ...this.normalizeUserDefinition(),
    };
    this.setComputedScale();
  }

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleTime<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data, [
      +new Date('2000-01-01'),
      +new Date('2000-01-02'),
    ]);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScaleTime<NumberLike, number, number> = scaleTime(domain, range);
    // @ts-ignore - d3-scale types does not consider scale time as a Continuous scale (while it is)
    scale = configureContinuousScale(scale, this.definition);
    return scale;
  }
}

export default ScaleTime;
