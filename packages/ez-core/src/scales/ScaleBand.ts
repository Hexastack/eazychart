import { ScaleBand as D3ScaleBand, scaleBand } from 'd3-scale';
import { Dimensions, RawData } from '../types';
import {
  ScaleInterface,
  ScaleBandDefinition,
  ScaleBandMinimalDefinition,
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
 * @see ScaleBand
 */
class ScaleBand
  extends AbstractScale
  implements
    ScaleInterface<ScaleBandDefinition, ScaleBandMinimalDefinition>
{
  constructor(definition: ScaleBandDefinition = {}) {
    super();
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  declare public userDefinition: ScaleBandDefinition;

  declare public definition: ScaleBandMinimalDefinition;

  declare public scale: D3ScaleBand<StringLike>;

  protected defaultDefinition: ScaleBandMinimalDefinition = {
    reverse: false,
    roundRange: false,
    round: false,
    padding: 0.2,
    align: 0.5,
  };

  protected compute(
    dimensions: Dimensions,
    data: RawData
  ): D3ScaleBand<StringLike> {
    let domain = getCategoricalScaleDomain(this.definition, data);
    let range = getCategoricalScaleRange(this.definition, dimensions);
    let scale: D3ScaleBand<StringLike> = scaleBand(domain, range);
    scale = configureCategoricalScale(scale, this.definition);
    if (this.definition.innerPadding)
      scale = scale.paddingInner(this.definition.innerPadding);
    if (this.definition.outerPadding)
      scale = scale.paddingOuter(this.definition.outerPadding);
    return scale;
  }
}

export default ScaleBand;
