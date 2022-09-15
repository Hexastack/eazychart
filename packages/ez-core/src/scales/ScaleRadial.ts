import { ScaleRadial as D3ScaleRadial, scaleRadial } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleRadialDefinition,
  ScaleRadialMinimalDefinition,
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
 * @see D3ScaleRadial
 */
class ScaleRadial
  extends AbstractScale
  implements
    ScaleInterface<ScaleRadialDefinition, ScaleRadialMinimalDefinition>
{
  constructor(definition: ScaleRadialDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleRadialDefinition;

  declare public definition: ScaleRadialMinimalDefinition;

  declare public scale: D3ScaleRadial<NumberLike, number, number>;

  protected defaultDefinition: ScaleRadialMinimalDefinition = {
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
  ): D3ScaleRadial<NumberLike, number, number> {
    const domain = getContinuousScaleDomain(this.definition, data);
    const range = getContinuousScaleRange(this.definition, dimensions);
    let scale: D3ScaleRadial<NumberLike, number, number> = scaleRadial(
      domain,
      range
    );
    scale = configureContinuousScale(scale, this.definition);
    return scale;
  }
}

export default ScaleRadial;
