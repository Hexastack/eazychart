import * as easings from 'd3-ease';

export type AnimationEasingFn = Exclude<
  typeof easings,
  'PolynomialEasingFactory' | 'BackEasingFactory' | 'ElasticEasingFactory'
>;
export type AnimationEasing = keyof AnimationEasingFn;

export type CustomEasingFn = (normalizedTime: number) => number;

export type Interpolables = number | string | Date | Array<any> | object;

export type InterpolationFunction<T> = (t: number) => T;

export type Interpolation<T extends Interpolables> = (
  a: T,
  b: T
) => InterpolationFunction<T>;

export type AnyAnimationEasingFn =
  | AnimationEasingFn[AnimationEasing]
  | CustomEasingFn;

export type AnimationOptions = {
  duration: number; // milliseconds
  delay: number; // milliseconds
  easing: CustomEasingFn | AnimationEasing;
};
