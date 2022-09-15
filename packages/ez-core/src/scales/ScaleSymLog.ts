import { ScaleSymLog as D3ScaleSymLog, scaleSymlog } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleSymLogDefinition,
  ScaleSymLogMinimalDefinition,
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
class ScaleSymLog
  extends AbstractScale
  implements
    ScaleInterface<ScaleSymLogDefinition, ScaleSymLogMinimalDefinition>
{
  constructor(definition: ScaleSymLogDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSymLogDefinition;

  declare public definition: ScaleSymLogMinimalDefinition;

  declare public scale: D3ScaleSymLog<NumberLike, number, number>;

  protected defaultDefinition: ScaleSymLogMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    nice: 0,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    constant: 1,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleSymLog<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScaleSymLog<NumberLike, number, number> = scaleSymlog(
      domain,
      range
    );
    scale = configureContinuousScale(scale, this.definition);
    scale = scale.constant(this.definition.constant);
    return scale;
  }
}

export default ScaleSymLog;
