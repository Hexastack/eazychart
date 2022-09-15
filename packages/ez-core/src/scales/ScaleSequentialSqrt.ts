import { ScaleSequential as D3ScaleSequential, scaleSequentialSqrt } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleSequentialSqrtDefinition,
  ScaleSequentialSqrtMinimalDefinition,
  NumberLike,
} from './types';
import {
  getSequentialScaleRange,
  getSequentialScaleDomain,
  configureSequentialScale,
} from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see scaleSequentialSqrt
 */
class ScaleSequentialSqrt
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleSequentialSqrtDefinition,
      ScaleSequentialSqrtMinimalDefinition
    >
{
  constructor(definition: ScaleSequentialSqrtDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSequentialSqrtDefinition;

  declare public definition: ScaleSequentialSqrtMinimalDefinition;

  declare public scale: D3ScaleSequential<NumberLike, number>;

  protected defaultDefinition: ScaleSequentialSqrtMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleSequential<NumberLike, number> {
    const domain = getSequentialScaleDomain(this.definition, data);
    const range = getSequentialScaleRange(this.definition, dimensions);
    let scale: D3ScaleSequential<NumberLike, number> = scaleSequentialSqrt()
      .domain(domain)
      .range(range);
    scale = configureSequentialScale(scale, this.definition);
    return scale;
  }
}

export default ScaleSequentialSqrt;
