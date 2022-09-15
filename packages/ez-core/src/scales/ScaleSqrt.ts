import { ScalePower as D3ScalePower, scaleSqrt } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleSqrtDefinition,
  ScaleSqrtMinimalDefinition,
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
class ScaleSqrt
  extends AbstractScale
  implements
    ScaleInterface<ScaleSqrtDefinition, ScaleSqrtMinimalDefinition>
{
  constructor(definition: ScaleSqrtDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSqrtDefinition;

  declare public definition: ScaleSqrtMinimalDefinition;

  declare public scale: D3ScalePower<NumberLike, number, number>;

  protected defaultDefinition: ScaleSqrtMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    nice: 2,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScalePower<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScalePower<NumberLike, number, number> = scaleSqrt(
      domain,
      range
    );
    scale = configureContinuousScale(scale, this.definition);
    return scale;
  }
}

export default ScaleSqrt;
