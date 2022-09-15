import { ScaleDiverging as D3ScaleDiverging, scaleDivergingSqrt } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleDivergingSqrtDefinition,
  ScaleDivergingSqrtMinimalDefinition,
  NumberLike,
} from './types';
import {
  getDivergingScaleRange,
  getDivergingScaleDomain,
  configureDivergingScale,
} from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see scaleDivergingSqrt
 */
class ScaleDivergingSqrt
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleDivergingSqrtDefinition,
      ScaleDivergingSqrtMinimalDefinition
    >
{
  constructor(definition: ScaleDivergingSqrtDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleDivergingSqrtDefinition;

  declare public definition: ScaleDivergingSqrtMinimalDefinition;

  declare public scale: D3ScaleDiverging<NumberLike, never>;

  protected defaultDefinition: ScaleDivergingSqrtMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleDiverging<NumberLike, number> {
    const domain = getDivergingScaleDomain(this.definition, data);
    const range = getDivergingScaleRange(this.definition, dimensions);
    let scale: D3ScaleDiverging<NumberLike, number> = scaleDivergingSqrt()
      .domain(domain)
      .range(range);
    scale = configureDivergingScale(scale, this.definition);
    return scale;
  }
}

export default ScaleDivergingSqrt;
