import {
  // Continuous
  ScaleLinear,
  ScalePower,
  ScaleLogarithmic,
  ScaleSymLog,
  ScaleRadial,
  ScaleTime,
  ScaleIdentity,
  // Sequential
  ScaleSequential,
  // ScaleSequentialQuantile,
  // Diverging
  ScaleDiverging,
  // Quantize
  ScaleQuantize,
  // Threshold
  ScaleThreshold,
  // Quantile
  ScaleQuantile,
  // Ordinal
  ScaleOrdinal,
  ScaleBand,
  ScalePoint,
} from 'd3-scale';
import { Dimensions, Direction, RawData } from '../types';

export type NumberLike = number | (any & { toValue(): number });
export type StringLike = string | (any & { toString(): string });
export type DateLike = number | Date | string;

export type DefinitionDateLikeKeys =
  | 'min'
  | 'max'
  | 'softMin'
  | 'softMax'
  | 'maxPadding'
  | 'minPadding';

export const dateLikeKeys: Array<DefinitionDateLikeKeys> = [
  'min',
  'max',
  'softMin',
  'softMax',
  'maxPadding',
  'minPadding',
];
export type ArrayOfTwoNumbers = [number, number];
export type ArrayOfTwoOrMoreNumbers = [number, number, ...number[]];
export type ArrayOfTwoOrMoreDateLike = [DateLike, DateLike, ...DateLike[]];
export type ArrayOfStringLike = StringLike[];

/** User's definitions */
/**
 * Global definition that applies to all scales.
 */
export type ScaleBaseDefinition = {
  unknown?: unknown;
  domainKey?: string;
};

/**
 * Definitions that apply to all continuous scales.
 */
export type ScaleContinuousDefinition = ScaleBaseDefinition & {
  range?: ArrayOfTwoOrMoreNumbers;
  nice?: number;
  direction?: Direction;
  reverse?: boolean;
};

export type ScaleTimeDefinition = ScaleContinuousDefinition & {
  domain?: ArrayOfTwoOrMoreDateLike;
  maxPadding?: DateLike;
  minPadding?: DateLike;
  max?: DateLike;
  min?: DateLike;
  softMax?: DateLike;
  softMin?: DateLike;
  roundRange?: boolean;
  clamp?: boolean;
};

export type ScaleUtcDefinition = ScaleTimeDefinition;

export type ScaleIdentityDefinition = ScaleContinuousDefinition & {
  domain?: ArrayOfTwoOrMoreNumbers;
  maxPadding?: number;
  minPadding?: number;
  max?: number;
  min?: number;
  softMax?: number;
  softMin?: number;
};

export type ScaleLinearDefinition = ScaleIdentityDefinition & {
  roundRange?: boolean;
  clamp?: boolean;
};

export type ScaleRadialDefinition = ScaleLinearDefinition;

export type ScaleSqrtDefinition = ScaleLinearDefinition;

export type ScalePowerDefinition = ScaleLinearDefinition & {
  exponent?: number;
};

export type ScaleLogarithmicDefinition = ScaleLinearDefinition & {
  base?: number;
};

export type ScaleSymLogDefinition = ScaleLinearDefinition & {
  constant?: number;
};

/**
 * Definitions that apply to all diverging scales
 */
export type ScaleDivergingDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: [number, number] | [number, number, number];
  domain?: [number, number, number];
  reverse?: boolean;
  roundRange?: boolean;
  clamp?: boolean;
  maxPadding?: number;
  minPadding?: number;
  max?: number;
  min?: number;
  softMax?: number;
  softMin?: number;
  center?: number;
};

export type ScaleDivergingSqrtDefinition = ScaleDivergingDefinition;

export type ScaleDivergingPowerDefinition = ScaleDivergingDefinition & {
  exponent?: number;
};

export type ScaleDivergingLogarithmicDefinition =
  ScaleDivergingDefinition & {
    base?: number;
  };

export type ScaleDivergingSymLogDefinition = ScaleDivergingDefinition & {
  constant?: number;
};

/**
 * Definitions that apply to all categorical scales
 */
export type ScaleOrdinalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: ArrayOfStringLike;
  domain?: ArrayOfStringLike;
  reverse?: boolean;
  invert?: boolean;
};

export type ScalePointDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: [number, number];
  domain?: ArrayOfStringLike;
  reverse?: boolean;
  roundRange?: boolean;
  round?: boolean;
  padding?: number;
  align?: number;
};

export type ScaleBandDefinition = ScalePointDefinition & {
  innerPadding?: number;
  outerPadding?: number;
};

/**
 * Definitions that apply to all Sequential scales
 */
export type ScaleSequentialDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: ArrayOfTwoNumbers;
  domain?: ArrayOfTwoNumbers;
  clamp?: boolean;
  roundRange?: boolean;
};
export type ScaleSequentialLogarithmicDefinition =
  ScaleSequentialDefinition & {
    base?: number;
  };
export type ScaleSequentialSqrtDefinition = ScaleSequentialDefinition;

export type ScaleSequentialPowerDefinition = ScaleSequentialDefinition & {
  exponent?: number;
};

export type ScaleSequentialSymLogDefinition = ScaleSequentialDefinition & {
  constant?: number;
};
export type ScaleThresholdDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  domain?: ArrayOfTwoOrMoreDateLike;
  range?: Array<unknown>;
};
export type ScaleQuantizeDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: Array<unknown>;
  domain?: ArrayOfTwoNumbers;
  nice?: number;
};
export type ScaleQuantileDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: Array<unknown>;
  domain?: ArrayOfTwoOrMoreNumbers;
  invert?: boolean;
};
/** Scales definitions */
/**
 * Definitions that apply to all continuous scales.
 */
export type ScaleContinuousMinimalDefinition = ScaleBaseDefinition & {
  range?: ArrayOfTwoOrMoreNumbers;
  nice: number;
  reverse: boolean;
};

export type ScaleTimeMinimalDefinition =
  ScaleContinuousMinimalDefinition & {
    domain?: ArrayOfTwoOrMoreNumbers;
    direction: Direction;
    maxPadding: number;
    minPadding: number;
    max?: number;
    min?: number;
    softMax: number;
    softMin: number;
    roundRange: boolean;
    clamp: boolean;
  };

export type ScaleUtcMinimalDefinition = ScaleTimeMinimalDefinition;

export type ScaleIdentityMinimalDefinition =
  ScaleContinuousMinimalDefinition & {
    domain?: ArrayOfTwoOrMoreNumbers;
    direction?: Direction;
    maxPadding: number;
    minPadding: number;
    max?: number;
    min?: number;
    softMax: number;
    softMin: number;
  };

export type ScaleLinearMinimalDefinition =
  ScaleIdentityMinimalDefinition & {
    direction: Direction;
    roundRange: boolean;
    clamp: boolean;
  };

export type ScaleRadialMinimalDefinition = ScaleLinearMinimalDefinition;

export type ScaleSqrtMinimalDefinition = ScaleLinearMinimalDefinition;

export type ScalePowerMinimalDefinition = ScaleLinearMinimalDefinition & {
  exponent: number;
};

export type ScaleLogarithmicMinimalDefinition =
  ScaleLinearMinimalDefinition & {
    base: number;
  };

export type ScaleSymLogMinimalDefinition = ScaleLinearMinimalDefinition & {
  constant: number;
};

/**
 * Definitions that apply to all diverging scales
 */
export type ScaleDivergingMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: [number, number] | [number, number, number];
  domain?: [number, number, number];
  reverse: boolean;
  roundRange: boolean;
  clamp: boolean;
  maxPadding: number;
  minPadding: number;
  max?: number;
  min?: number;
  softMax: number;
  softMin: number;
  center?: number;
};

export type ScaleDivergingSqrtMinimalDefinition =
  ScaleDivergingMinimalDefinition;

export type ScaleDivergingPowerMinimalDefinition =
  ScaleDivergingMinimalDefinition & {
    exponent: number;
  };

export type ScaleDivergingLogarithmicMinimalDefinition =
  ScaleDivergingMinimalDefinition & {
    base: number;
  };

export type ScaleDivergingSymLogMinimalDefinition =
  ScaleDivergingMinimalDefinition & {
    constant: number;
  };

/**
 * Definitions that apply to all categorical scales.
 */
export type ScaleOrdinalMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: ArrayOfStringLike;
  domain?: ArrayOfStringLike;
  reverse: boolean;
  invert: boolean;
};

export type ScalePointMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: [number, number];
  domain?: ArrayOfStringLike;
  reverse: boolean;
  roundRange: boolean;
  round: boolean;
  padding: number;
  align: number;
};

export type ScaleBandMinimalDefinition = ScalePointMinimalDefinition & {
  innerPadding?: number;
  outerPadding?: number;
};

/**
 * Definitions that apply to all the sequential scales
 */

export type ScaleSequentialMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: ArrayOfTwoNumbers;
  domain?: ArrayOfTwoNumbers;
  maxPadding: number;
  minPadding: number;
  max?: number;
  min?: number;
  softMax: number;
  softMin: number;
  roundRange: boolean;
  clamp: boolean;
  reverse: boolean;
};

export type ScaleSequentialSqrtMinimalDefinition =
  ScaleSequentialMinimalDefinition;

export type ScaleSequentialPowerMinimalDefinition =
  ScaleSequentialMinimalDefinition & {
    exponent: number;
  };

export type ScaleSequentialLogarithmicMinimalDefinition =
  ScaleSequentialMinimalDefinition & {
    base: number;
  };

export type ScaleSequentialSymLogMinimalDefinition =
  ScaleSequentialMinimalDefinition & {
    constant: number;
  };
export type ScaleThresholdMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: Array<unknown>;
  domain?: ArrayOfTwoOrMoreDateLike;
  maxPadding: number;
  minPadding: number;
  max?: number;
  min?: number;
  softMax: number;
  softMin: number;
  invert?: boolean;
};
export type ScaleQuantizeMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: Array<unknown>;
  domain?: ArrayOfTwoNumbers;
  maxPadding: number;
  minPadding: number;
  max?: number;
  min?: number;
  softMax: number;
  softMin: number;
  invert?: boolean;
  nice: number;
};
export type ScaleQuantileMinimalDefinition = ScaleBaseDefinition & {
  direction?: Direction;
  range?: Array<unknown>;
  domain?: ArrayOfTwoOrMoreNumbers;
  maxPadding: number;
  minPadding: number;
  max?: number;
  min?: number;
  softMax: number;
  softMin: number;
  invert?: boolean;
};
/**
 * All the possible definitions for any scale.
 */
export type ScaleDefinition =
  | ScaleIdentityDefinition
  | ScaleTimeDefinition
  | ScaleUtcDefinition
  | ScaleLinearDefinition
  | ScaleRadialDefinition
  | ScaleSqrtDefinition
  | ScalePowerDefinition
  | ScaleLogarithmicDefinition
  | ScaleSymLogDefinition
  | ScaleOrdinalDefinition
  | ScalePointDefinition
  | ScaleBandDefinition
  | ScaleDivergingDefinition
  | ScaleDivergingSqrtDefinition
  | ScaleDivergingPowerDefinition
  | ScaleDivergingLogarithmicDefinition
  | ScaleDivergingSymLogDefinition
  | ScaleSequentialDefinition
  | ScaleSequentialSqrtDefinition
  | ScaleSequentialLogarithmicDefinition
  | ScaleSequentialPowerDefinition
  | ScaleSequentialSymLogDefinition
  | ScaleThresholdDefinition
  | ScaleQuantizeDefinition
  | ScaleQuantizeDefinition;

/** Continuous scale definitions except identity */
export type ContiousScaleDefinition =
  | ScaleTimeDefinition
  | ScaleUtcDefinition
  | ScaleLinearDefinition
  | ScaleRadialDefinition
  | ScaleSqrtDefinition
  | ScalePowerDefinition
  | ScaleLogarithmicDefinition
  | ScaleSymLogDefinition;

export type DivergingsScaleDefinition =
  | ScaleDivergingDefinition
  | ScaleDivergingSqrtDefinition
  | ScaleDivergingPowerDefinition
  | ScaleDivergingLogarithmicDefinition
  | ScaleDivergingSymLogDefinition;

export type CategoricalScaleDefinition =
  | ScalePointDefinition
  | ScaleBandDefinition;

export type SequentialScaleDefinition =
  | ScaleSequentialDefinition
  | ScaleSequentialSqrtDefinition
  | ScaleSequentialLogarithmicDefinition
  | ScaleSequentialPowerDefinition
  | ScaleSequentialSymLogDefinition;
/**
 * All the possible minimal definitions for any scale.
 * A minimal scale definition is a definition that have the minimum required properties
 * to compute the scale. This is used as the defaultScale and as the stored final definition
 * on each scale class.
 */
export type ScaleMinimalDefinition =
  | ScaleIdentityMinimalDefinition
  | ScaleTimeMinimalDefinition
  | ScaleUtcMinimalDefinition
  | ScaleLinearMinimalDefinition
  | ScaleRadialMinimalDefinition
  | ScaleSqrtMinimalDefinition
  | ScalePowerMinimalDefinition
  | ScaleLogarithmicMinimalDefinition
  | ScaleSymLogMinimalDefinition
  | ScaleOrdinalMinimalDefinition
  | ScalePointMinimalDefinition
  | ScaleBandMinimalDefinition
  | ScaleDivergingMinimalDefinition
  | ScaleDivergingSqrtMinimalDefinition
  | ScaleDivergingPowerMinimalDefinition
  | ScaleDivergingLogarithmicMinimalDefinition
  | ScaleDivergingSymLogMinimalDefinition
  | ScaleSequentialMinimalDefinition
  | ScaleSequentialSqrtMinimalDefinition
  | ScaleSequentialLogarithmicMinimalDefinition
  | ScaleSequentialPowerMinimalDefinition
  | ScaleSequentialSymLogMinimalDefinition
  | ScaleThresholdMinimalDefinition
  | ScaleQuantizeMinimalDefinition
  | ScaleQuantileMinimalDefinition;

export type ContinousScaleMinimalDefinition =
  | ScaleIdentityMinimalDefinition
  | ScaleTimeMinimalDefinition
  | ScaleUtcMinimalDefinition
  | ScaleLinearMinimalDefinition
  | ScaleRadialMinimalDefinition
  | ScaleSqrtMinimalDefinition
  | ScalePowerMinimalDefinition
  | ScaleLogarithmicMinimalDefinition
  | ScaleSymLogMinimalDefinition;

export type DivergingsScaleMinimalDefinition =
  | ScaleDivergingMinimalDefinition
  | ScaleDivergingSqrtMinimalDefinition
  | ScaleDivergingPowerMinimalDefinition
  | ScaleDivergingLogarithmicMinimalDefinition
  | ScaleDivergingSymLogMinimalDefinition;

export type CategoricalScaleMinimalDefinition =
  | ScalePointMinimalDefinition
  | ScaleBandMinimalDefinition;

export type SequentialScaleMinimalDefinition =
  | ScaleSequentialMinimalDefinition
  | ScaleSequentialSqrtMinimalDefinition
  | ScaleSequentialLogarithmicMinimalDefinition
  | ScaleSequentialPowerMinimalDefinition
  | ScaleSequentialSymLogMinimalDefinition;

/** All D3 scale functions */
export type D3Scales =
  | ScaleLinear<NumberLike, number, number>
  | ScalePower<NumberLike, number, number>
  | ScaleLogarithmic<NumberLike, number, number>
  | ScaleSymLog<NumberLike, number, number>
  | ScaleRadial<NumberLike, number, number>
  | ScaleTime<NumberLike, number, number>
  | ScaleIdentity<NumberLike>
  | ScaleSequential<NumberLike, number>
  | ScaleDiverging<NumberLike, number>
  | ScaleQuantize<NumberLike, unknown>
  | ScaleThreshold<DateLike, unknown, unknown>
  | ScaleQuantile<NumberLike, unknown>
  | ScaleOrdinal<StringLike, StringLike, StringLike>
  | ScaleBand<StringLike>
  | ScalePoint<StringLike>;

/** All D3 contious scale functions except Identity */
export type D3ContuniousScales =
  | ScaleLinear<NumberLike, number, number>
  | ScalePower<NumberLike, number, number>
  | ScaleLogarithmic<NumberLike, number, number>
  | ScaleSymLog<NumberLike, number, number>
  | ScaleRadial<NumberLike, number, number>
  | ScaleTime<NumberLike, number, number>;

export type D3CategoricalScales =
  | ScaleBand<StringLike>
  | ScalePoint<StringLike>;

export type D3DivergingScales = ScaleDiverging<NumberLike, number>;

export interface ScaleInterface<
  UserDefinition extends ScaleDefinition,
  MinimalDefinition extends ScaleMinimalDefinition,
  scaleFunction extends D3Scales = D3Scales
> {
  userDefinition: UserDefinition;
  definition: MinimalDefinition;
  scale: scaleFunction;
  computeScale: (dimensions: Dimensions, data: RawData) => void;
  setDefinition: (definition: UserDefinition) => void;
  appendDefinition: (definition: UserDefinition) => void;
  setData: (data: RawData) => void;
  setDimensions: (dimension: Dimensions) => void;
}
