import { ScalePoint as D3ScalePoint, scalePoint } from 'd3-scale';
import { Dimensions, RawData } from '../types';
import {
  ScaleInterface,
  ScalePointDefinition,
  ScalePointMinimalDefinition,
  StringLike,
} from './types';
import AbstractScale from './AbstractScale';
import {
  getCategoricalScaleDomain,
  getCategoricalScaleRange,
  configureCategoricalScale,
} from './helpers';

/**
 * @class
 * @see D3ScalePoint
 */
class ScalePoint
  extends AbstractScale
  implements
    ScaleInterface<ScalePointDefinition, ScalePointMinimalDefinition>
{
  constructor(definition: ScalePointDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScalePointDefinition;

  declare public definition: ScalePointMinimalDefinition;

  declare public scale: D3ScalePoint<StringLike>;

  protected defaultDefinition: ScalePointMinimalDefinition = {
    reverse: false,
    roundRange: false,
    round: false,
    padding: 0.1,
    align: 0.5,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScalePoint<StringLike> {
    let domain = getCategoricalScaleDomain(this.definition, data);
    let range = getCategoricalScaleRange(this.definition, dimensions);
    let scale: D3ScalePoint<StringLike> = scalePoint(domain, range);
    scale = configureCategoricalScale(scale, this.definition);
    return scale;
  }
}

export default ScalePoint;
