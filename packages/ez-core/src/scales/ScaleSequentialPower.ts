import { ScaleSequential as D3ScaleSequential, scaleSequentialPow } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleSequentialPowerDefinition,
  ScaleSequentialPowerMinimalDefinition,
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
class ScaleSequentialPower
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleSequentialPowerDefinition,
      ScaleSequentialPowerMinimalDefinition
    >
{
  constructor(definition: ScaleSequentialPowerDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSequentialPowerDefinition;

  declare public definition: ScaleSequentialPowerMinimalDefinition;

  declare public scale: D3ScaleSequential<NumberLike, number>;

  protected defaultDefinition: ScaleSequentialPowerMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'value',
    maxPadding: 0,
    minPadding: 0,
    roundRange: false,
    softMin: Infinity,
    softMax: -Infinity,
    clamp: false,
    reverse: false,
    exponent: 2,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleSequential<NumberLike, number> {
    const domain = getSequentialScaleDomain(this.definition, data);
    const range = getSequentialScaleRange(this.definition, dimensions);
    let scale: D3ScaleSequential<NumberLike, number> = scaleSequentialPow()
      .domain(domain)
      .range(range);
    scale = configureSequentialScale(scale, this.definition);
    // @ts-ignore - @d3-types does not include exponent in ScaleSequentialPow
    scale = scale.exponent(this.definition.exponent);
    return scale;
  }
}

export default ScaleSequentialPower;
