import { ScaleDiverging as D3ScaleDiverging, scaleDivergingLog } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleDivergingLogarithmicDefinition,
  ScaleDivergingLogarithmicMinimalDefinition,
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
 * @see D3ScaleDiverging
 */
class ScaleDivergingLogarithmic
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleDivergingLogarithmicDefinition,
      ScaleDivergingLogarithmicMinimalDefinition
    >
{
  constructor(definition: ScaleDivergingLogarithmicDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleDivergingLogarithmicDefinition;

  declare public definition: ScaleDivergingLogarithmicMinimalDefinition;

  declare public scale: D3ScaleDiverging<NumberLike, never>;

  protected defaultDefinition: ScaleDivergingLogarithmicMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
    base: 10,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleDiverging<NumberLike, number> {
    const domain = getDivergingScaleDomain(this.definition, data, [0.1, 10]);
    const range = getDivergingScaleRange(this.definition, dimensions);
    let scale: D3ScaleDiverging<NumberLike, number> = scaleDivergingLog()
      .domain(domain)
      .range(range);
    scale = configureDivergingScale(scale, this.definition);
    // @ts-ignore - @d3-types does not include base in ScaleDivergingLog
    scale = scale.base(this.definition.base);
    return scale;
  }
}

export default ScaleDivergingLogarithmic;
