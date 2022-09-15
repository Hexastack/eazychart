import { ScaleLinear as D3ScaleLinear, scaleLinear } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleLinearDefinition,
  ScaleLinearMinimalDefinition,
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
 * @see ScaleLinear
 */
class ScaleLinear
  extends AbstractScale
  implements
    ScaleInterface<ScaleLinearDefinition, ScaleLinearMinimalDefinition>
{
  constructor(definition: ScaleLinearDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleLinearDefinition;

  declare public definition: ScaleLinearMinimalDefinition;

  declare public scale: D3ScaleLinear<NumberLike, number, number>;

  protected defaultDefinition: ScaleLinearMinimalDefinition = {
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
  ): D3ScaleLinear<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScaleLinear<NumberLike, number, number> = scaleLinear(
      domain,
      range
    );
    scale = configureContinuousScale(scale, this.definition);
    return scale;
  }
}

export default ScaleLinear;
