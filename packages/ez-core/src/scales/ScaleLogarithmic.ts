import { ScaleLogarithmic as D3ScaleLogarithmic, scaleLog } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleLogarithmicDefinition,
  ScaleLogarithmicMinimalDefinition,
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
 * @see scaleLog
 */
class ScaleLogarithmic
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleLogarithmicDefinition,
      ScaleLogarithmicMinimalDefinition
    >
{
  constructor(definition: ScaleLogarithmicDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleLogarithmicDefinition;

  declare public definition: ScaleLogarithmicMinimalDefinition;

  declare public scale: D3ScaleLogarithmic<NumberLike, number, number>;

  protected defaultDefinition: ScaleLogarithmicMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    nice: 1,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    base: 10,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleLogarithmic<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data, [0.1, 1]);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScaleLogarithmic<NumberLike, number, number> = scaleLog(
      domain,
      range
    );
    scale = configureContinuousScale(scale, this.definition);
    scale = scale.base(this.definition.base);
    return scale;
  }
}

export default ScaleLogarithmic;
