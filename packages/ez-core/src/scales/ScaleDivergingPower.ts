import { ScaleDiverging as D3ScaleDiverging, scaleDivergingPow } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleDivergingPowerDefinition,
  ScaleDivergingPowerMinimalDefinition,
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
class ScaleDivergingPower
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleDivergingPowerDefinition,
      ScaleDivergingPowerMinimalDefinition
    >
{
  constructor(definition: ScaleDivergingPowerDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleDivergingPowerDefinition;

  declare public definition: ScaleDivergingPowerMinimalDefinition;

  declare public scale: D3ScaleDiverging<NumberLike, number>;

  protected defaultDefinition: ScaleDivergingPowerMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
    exponent: 2,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleDiverging<NumberLike, number> {
    const domain = getDivergingScaleDomain(this.definition, data);
    const range = getDivergingScaleRange(this.definition, dimensions);
    let scale: D3ScaleDiverging<NumberLike, number> = scaleDivergingPow()
      .domain(domain)
      .range(range);
    scale = configureDivergingScale(scale, this.definition);
    // @ts-ignore - @d3-types does not include exponent in ScaleDivergingPow
    scale = scale.exponent(this.definition.exponent);
    return scale;
  }
}

export default ScaleDivergingPower;
