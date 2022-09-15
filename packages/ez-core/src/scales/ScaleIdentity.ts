import { ScaleIdentity as D3ScaleIdentity, scaleIdentity } from 'd3-scale';
import { Dimensions, RawData } from '../types';
import {
  ScaleInterface,
  ScaleIdentityDefinition,
  ScaleIdentityMinimalDefinition,
  NumberLike,
} from './types';
import { getContinuousScaleRange, getContinuousScaleDomain } from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see ScaleIdentity
 */
class ScaleIdentity
  extends AbstractScale
  implements
    ScaleInterface<ScaleIdentityDefinition, ScaleIdentityMinimalDefinition>
{
  constructor(definition: ScaleIdentityDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleIdentityDefinition;

  declare public definition: ScaleIdentityMinimalDefinition;

  declare public scale: D3ScaleIdentity<NumberLike>;

  protected defaultDefinition: ScaleIdentityMinimalDefinition = {
    nice: 0,
    minPadding: 0,
    maxPadding: 0,
    softMin: Infinity,
    softMax: -Infinity,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleIdentity<NumberLike> {
    const range = getContinuousScaleRange(
      this.definition,
      dimensions,
      getContinuousScaleDomain(this.definition, data, [0, 1])
    );
    let scale = scaleIdentity(range) as D3ScaleIdentity<NumberLike>;
    if (this.definition.unknown !== undefined)
      scale = scale.unknown(
        this.definition.unknown
      ) as D3ScaleIdentity<NumberLike>;
    if (this.definition.nice) scale = scale.nice(this.definition.nice);
    return scale;
  }
}

export default ScaleIdentity;
