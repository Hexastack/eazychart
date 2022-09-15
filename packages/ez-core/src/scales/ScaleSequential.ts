import { ScaleSequential as D3ScaleSequential, scaleSequential } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import AbstractScale from './AbstractScale';
import {
  configureSequentialScale,
  getSequentialScaleDomain,
  getSequentialScaleRange,
} from './helpers/SequentialScaleHelpers';
import {
  ScaleInterface,
  ScaleSequentialDefinition,
  ScaleSequentialMinimalDefinition,
  NumberLike,
} from './types';

/**
 * @class
 * @see D3ScaleSequential
 */
class ScaleSequential
  extends AbstractScale
  implements
    ScaleInterface<
      ScaleSequentialDefinition,
      ScaleSequentialMinimalDefinition
    >
{
  constructor(definition: ScaleSequentialDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleSequentialDefinition;

  declare public definition: ScaleSequentialMinimalDefinition;

  declare public scale: D3ScaleSequential<NumberLike, number>;

  protected defaultDefinition: ScaleSequentialMinimalDefinition = {
    direction: Direction.HORIZONTAL,
    domainKey: 'column',
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
    let scale: D3ScaleSequential<NumberLike, number> = scaleSequential(
      domain,
      range
    );
    scale = configureSequentialScale(scale, this.definition);
    return scale;
  }
}

export default ScaleSequential;
