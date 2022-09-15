import { ScaleTime as D3ScaleTime, scaleUtc } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleUtcDefinition,
  ScaleUtcMinimalDefinition,
  NumberLike,
} from './types';
import {
  getContinuousScaleRange,
  getContinuousScaleDomain,
  configureContinuousScale,
} from './helpers';
import ScaleTime from './ScaleTime';

/**
 * @class
 * @see D3ScaleTime
 */
class ScaleUtc
  extends ScaleTime
  implements ScaleInterface<ScaleUtcDefinition, ScaleUtcMinimalDefinition>
{
  declare public userDefinition: ScaleUtcDefinition;

  declare public definition: ScaleUtcMinimalDefinition;

  declare public scale: D3ScaleTime<NumberLike, number, number>;

  protected defaultDefinition: ScaleUtcMinimalDefinition = {
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

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleTime<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data, [
      +new Date('2000-01-01'),
      +new Date('2000-01-02'),
    ]);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScaleTime<NumberLike, number, number> = scaleUtc(domain, range);
    // @ts-ignore d3-scale types does not consider scale time as a Continuous scale (while it is)
    scale = configureContinuousScale(scale, this.definition);
    return scale;
  }
}

export default ScaleUtc;
