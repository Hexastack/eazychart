import { ScaleOrdinal as D3ScaleOrdinal, scaleOrdinal } from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';
import {
  ScaleInterface,
  ScaleOrdinalDefinition,
  ScaleOrdinalMinimalDefinition,
  StringLike,
  ArrayOfStringLike,
} from './types';
import AbstractScale from './AbstractScale';
import { getCategoricalScaleDomain } from './helpers';

/**
 * @class
 * @see D3ScaleOrdinal
 */
class ScaleOrdinal
  extends AbstractScale
  implements
    ScaleInterface<ScaleOrdinalDefinition, ScaleOrdinalMinimalDefinition>
{
  constructor(definition: ScaleOrdinalDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleOrdinalDefinition;

  declare public definition: ScaleOrdinalMinimalDefinition;

  declare public scale: D3ScaleOrdinal<StringLike, StringLike, StringLike>;

  protected defaultDefinition: ScaleOrdinalMinimalDefinition = {
    reverse: false,
    invert: false,
  };

  private getOrdinalScaleRange = (
    definition: ScaleOrdinalMinimalDefinition,
    dimensions: Dimensions,
    domain: ArrayOfStringLike
  ): ArrayOfStringLike => {
    if (definition.range) return definition.range;
    if (domain.length > 0 && definition.direction !== undefined) {
      let size!: number;
      if (definition.direction === Direction.HORIZONTAL)
        size = dimensions.width;
      if (definition.direction === Direction.VERTICAL)
        size = dimensions.height;
      if (domain.length === 1) return [size / 2];
      return [...domain.keys()].map((i) => (i * size) / (domain.length - 1));
    }
    return [...domain];
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleOrdinal<StringLike, StringLike, StringLike> {
    let domain = getCategoricalScaleDomain(this.definition, data);
    let range = this.getOrdinalScaleRange(this.definition, dimensions, domain);
    if (this.definition.reverse) {
      range.reverse();
    }
    if (this.definition.invert) {
      const temp = range;
      range = domain;
      domain = temp;
    }
    let scale: D3ScaleOrdinal<StringLike, StringLike, StringLike> = scaleOrdinal(
      domain,
      range
    );
    if (this.definition.unknown !== undefined) {
      scale = scale.unknown(this.definition.unknown) as typeof scale;
    }
    return scale;
  }
}

export default ScaleOrdinal;
