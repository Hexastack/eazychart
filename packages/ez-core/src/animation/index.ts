import { interpolate } from 'd3-interpolate';
import * as easings from 'd3-ease';
import {
  AnimationEasingFn,
  AnimationOptions,
  AnyAnimationEasingFn,
  Interpolation,
  Interpolables,
  InterpolationFunction,
} from './types';
import { logger } from '../utils/logger';

export const getEasingFunction = (
  easing: keyof AnimationEasingFn = 'easeLinear'
) => {
  if (typeof easings[easing] === 'undefined') {
    logger.warn(
      `Unknown %c${easing}%c easing function, must be one of the following:
    ${Object.keys(easings).join(', ')}`,
      'font-weight: bold'
    );
    return easings.easeLinear;
  }
  return easings[easing];
};

// In memory singleton to store all current animations
let animationIdx: number = 0;
export const animationMap = new Map<string, Animation<any>>();

export class Animation<T extends Interpolables> {
  public id: string;
  private to: T;
  private interpolatorFn: InterpolationFunction<T>;
  private duration: number;
  private onUpdate: Function;
  private start: number;
  private easingFn: AnyAnimationEasingFn;

  constructor(
    from: T,
    to: T,
    duration = 1000,
    onUpdate: (v: T) => void,
    delay = 0,
    easingFn: AnyAnimationEasingFn
  ) {
    this.id = (++animationIdx).toString();
    this.to = to;
    this.interpolatorFn = (interpolate as Interpolation<T>)(from, to);
    this.duration = duration;
    this.onUpdate = onUpdate;
    this.start = Date.now() + delay;
    this.easingFn = easingFn;
    // Add to the animations dict
    animationMap.set(this.id, this);
  }

  update() {
    const t = (Date.now() - this.start) / this.duration;
    if (t >= 1) {
      this.destroy(true);
    } else if (t >= 0) {
      this.onUpdate(this.interpolatorFn(this.easingFn(t)));
    }
  }

  destroy(shouldUpdate = false) {
    if (shouldUpdate) {
      this.onUpdate(this.to);
    }
    animationMap.delete(this.id);
  }

  /**
   * Endless loop to watch for animation updates to perform
   */
  static loopAnimation() {
    window.requestAnimationFrame(Animation.loopAnimation);
    animationMap.forEach((animation) => animation.update());
  }
}

export const animate = <T extends Interpolables>(
  from: T,
  to: T,
  options: Partial<AnimationOptions> | undefined,
  onUpdate: (v: T) => void
) => {
  if (!options || (options.delay === 0 && options.duration === 0)) {
    onUpdate(to);
    return () => {};
  }
  const easingFn =
    typeof options.easing === 'function'
      ? options.easing
      : getEasingFunction(options.easing);
  const animation = new Animation<T>(
    from,
    to,
    options.duration,
    onUpdate,
    options.delay,
    easingFn
  );
  return animation.destroy.bind(animation);
};

// Start animation loop

if (typeof window !== 'undefined') {
  Animation.loopAnimation();
}
