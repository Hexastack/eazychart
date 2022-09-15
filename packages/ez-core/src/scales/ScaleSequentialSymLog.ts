import { ScaleSequential as D3ScaleSequential, scaleSequentialSymlog } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleSequentialSymLogDefinition,
  ScaleSequentialSymLogMinimalDefinition,
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
 * @see D3ScaleSequential
 */
class ScaleSequentialSymLog
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleSequentialSymLogDefinition,
      ScaleSequentialSymLogMinimalDefinition
    >
{
  constructor(definition: ScaleSequentialSymLogDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSequentialSymLogDefinition;

  declare public definition: ScaleSequentialSymLogMinimalDefinition;

  declare public scale: D3ScaleSequential<NumberLike, number>;

  protected defaultDefinition: ScaleSequentialSymLogMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
    constant: 1,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleSequential<NumberLike, number> {
    const domain = getSequentialScaleDomain(this.definition, data);
    const range = getSequentialScaleRange(this.definition, dimensions);
    let scale: D3ScaleSequential<NumberLike, number> = scaleSequentialSymlog()
      .domain(domain)
      .range(range);
    scale = configureSequentialScale(scale, this.definition);
    // @ts-ignore - @d3-types does not include constant in ScaleSequentialSymLog
    scale = scale.constant(this.definition.constant);
    return scale;
  }
}

export default ScaleSequentialSymLog;
