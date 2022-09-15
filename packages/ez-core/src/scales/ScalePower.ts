import { ScalePower as D3ScalePower, scalePow } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScalePowerDefinition,
  ScalePowerMinimalDefinition,
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
 * @see D3ScalePower
 */
class ScalePower
  extends AbstractScale
  implements
    ScaleInterface<ScalePowerDefinition, ScalePowerMinimalDefinition>
{
  constructor(definition: ScalePowerDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScalePowerDefinition;

  declare public definition: ScalePowerMinimalDefinition;

  declare public scale: D3ScalePower<NumberLike, number, number>;

  protected defaultDefinition: ScalePowerMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    nice: 1,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    exponent: 2,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScalePower<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScalePower<NumberLike, number, number> = scalePow(domain, range);
    scale = configureContinuousScale(scale, this.definition);
    scale = scale.exponent(this.definition.exponent);
    return scale;
  }
}

export default ScalePower;
