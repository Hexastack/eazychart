import { Dimensions, RawData } from '../types';
import {
  ScaleInterface,
  ScaleDefinition,
  ScaleMinimalDefinition,
  D3Scales,
} from './types';

/**
 * @class Global operations that applies to all scales.
 */
abstract class AbstractScale
  implements ScaleInterface<ScaleDefinition, ScaleMinimalDefinition>
{
  public abstract userDefinition: ScaleDefinition;

  public abstract definition: ScaleMinimalDefinition;

  public abstract scale: D3Scales;

  public data: RawData = [];

  public dimensions: Dimensions = { width: 800, height: 600 };

  /**
   * The scale's default definition.
   */
  protected abstract defaultDefinition: ScaleMinimalDefinition;

  public setData(data: RawData): void {
    this.data = data;
    this.setComputedScale();
  }

  public setDimensions(dimensions: Dimensions): void {
    this.dimensions = dimensions;
    this.setComputedScale();
  }

  /**
   * Merges the user definition with the default definition.
   */
  protected mergeDefinition() {
    // @ts-ignore - TS doesn't know that this.defaultDefinition is an abstract property and
    // that it would match the minimal definition when merged.
    this.definition = { ...this.defaultDefinition, ...this.userDefinition };
    this.setComputedScale();
  }

  public setDefinition(definition: ScaleDefinition): void {
    this.userDefinition = definition;
    this.mergeDefinition();
  }

  public appendDefinition(definition: ScaleDefinition): void {
    this.userDefinition = { ...this.userDefinition, ...definition };
    this.mergeDefinition();
  }

  /**
   * Computes and returns a scale.
   * @param {Dimensions} dimensions - The inner dimensions of the chart.
   * @param {RawData} data - The data to be used to compute the scale.
   * @returns Computed scale.
   */
  protected abstract compute(
    dimensions: Dimensions,
    data: RawData
  ): D3Scales;

  public computeScale(dimensions: Dimensions, data: RawData): void {
    this.data = data;
    this.dimensions = dimensions;
    this.setComputedScale();
  }

  /**
   * Assigns the computed scale to the computedScale property.
   * @param {Dimensions} [dimensions = AbstractScale.dimensions] - The inner dimensions of the chart.
   * @param {RawData} [data = AbstractScale.data] - The data to be used to compute the scale.
   */
  protected setComputedScale(
    dimensions: Dimensions = this.dimensions,
    data: RawData = this.data
  ): void {
    this.scale = this.compute(dimensions, data);
  }
}

export default AbstractScale;
