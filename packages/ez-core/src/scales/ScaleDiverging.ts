import { ScaleDiverging as D3ScaleDiverging, scaleDiverging } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleDivergingDefinition,
  ScaleDivergingMinimalDefinition,
  NumberLike,
} from './types';
import {
  getDivergingScaleRange,
  getDivergingScaleDomain,
  configureDivergingScale,
} from './helpers';
import AbstractScale from './AbstractScale';

/**
 * @class
 * @see ScaleDiverging
 */
class ScaleDiverging
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleDivergingDefinition,
      ScaleDivergingMinimalDefinition
    >
{
  constructor(definition: ScaleDivergingDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleDivergingDefinition;

  declare public definition: ScaleDivergingMinimalDefinition;

  declare public scale: D3ScaleDiverging<NumberLike, number>;

  protected defaultDefinition: ScaleDivergingMinimalDefinition = {
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
  ): D3ScaleDiverging<NumberLike, number> {
    const domain = getDivergingScaleDomain(this.definition, data);
    const range = getDivergingScaleRange(this.definition, dimensions);
    let scale: D3ScaleDiverging<NumberLike, number> = scaleDiverging()
      .domain(domain)
      .range(range);
    scale = configureDivergingScale(scale, this.definition);
    return scale;
  }
}

export default ScaleDiverging;
