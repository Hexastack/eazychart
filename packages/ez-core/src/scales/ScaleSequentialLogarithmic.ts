import { ScaleSequential as D3ScaleSequential, scaleSequentialLog } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleSequentialLogarithmicDefinition,
  ScaleSequentialLogarithmicMinimalDefinition,
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
class ScaleSequentialLogarithmic
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleSequentialLogarithmicDefinition,
      ScaleSequentialLogarithmicMinimalDefinition
    >
{
  constructor(definition: ScaleSequentialLogarithmicDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSequentialLogarithmicDefinition;

  declare public definition: ScaleSequentialLogarithmicMinimalDefinition;

  declare public scale: D3ScaleSequential<NumberLike, number>;

  protected defaultDefinition: ScaleSequentialLogarithmicMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
    base: 10,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleSequential<NumberLike, number> {
    const domain = getSequentialScaleDomain(this.definition, data, [0.1, 10]);
    const range = getSequentialScaleRange(this.definition, dimensions);
    let scale: D3ScaleSequential<NumberLike, number> = scaleSequentialLog()
      .domain(domain)
      .range(range);
    scale = configureSequentialScale(scale, this.definition);
    // @ts-ignore - @d3-types does not include base in ScaleSequentialLog
    scale = scale.base(this.definition.base);
    return scale;
  }
}

export default ScaleSequentialLogarithmic;
