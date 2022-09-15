import { ScaleThreshold as D3ScaleThreshold, scaleThreshold } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleThresholdDefinition,
  ScaleThresholdMinimalDefinition,
  DateLike,
} from './types';
import {
  getThresholdScaleRange,
  getThresholdScaleDomain,
  configureThresholdScale,
} from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see D3ScaleThreshold
 */
class ScaleThreshold
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleThresholdDefinition,
      ScaleThresholdMinimalDefinition
    >
{
  constructor(definition: ScaleThresholdDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleThresholdDefinition;

  declare public definition: ScaleThresholdMinimalDefinition;

  declare public scale: D3ScaleThreshold<DateLike, unknown, unknown>;

  protected defaultDefinition: ScaleThresholdMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    softMin: Infinity,
    softMax: -Infinity,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleThreshold<DateLike, unknown, unknown> {
    const domain = getThresholdScaleDomain(this.definition, data);
    const range = getThresholdScaleRange(this.definition, dimensions);
    let scale = scaleThreshold(domain, range) as D3ScaleThreshold<
      DateLike,
      unknown,
      unknown
    >;
    scale = configureThresholdScale(scale, this.definition);
    return scale;
  }
}

export default ScaleThreshold;
