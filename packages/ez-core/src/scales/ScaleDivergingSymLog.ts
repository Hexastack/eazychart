import { ScaleDiverging as D3ScaleDiverging, scaleDivergingSymlog } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleDivergingSymLogDefinition,
  ScaleDivergingSymLogMinimalDefinition,
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
 * @see D3ScaleDiverging
 */
class ScaleDivergingSymLog
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleDivergingSymLogDefinition,
      ScaleDivergingSymLogMinimalDefinition
    >
{
  constructor(definition: ScaleDivergingSymLogDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleDivergingSymLogDefinition;

  declare public definition: ScaleDivergingSymLogMinimalDefinition;

  declare public scale: D3ScaleDiverging<NumberLike, never>;

  protected defaultDefinition: ScaleDivergingSymLogMinimalDefinition = {
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
  ): D3ScaleDiverging<NumberLike, number> {
    const domain = getDivergingScaleDomain(this.definition, data);
    const range = getDivergingScaleRange(this.definition, dimensions);
    let scale: D3ScaleDiverging<NumberLike, number> = scaleDivergingSymlog()
      .domain(domain)
      .range(range);
    scale = configureDivergingScale(scale, this.definition);
    // @ts-ignore - @d3-types does not include constant in ScaleDivergingSymLog
    scale = scale.constant(this.definition.constant);
    return scale;
  }
}

export default ScaleDivergingSymLog;
