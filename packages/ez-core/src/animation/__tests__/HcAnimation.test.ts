import { Animation, animationMap, animate, getEasingFunction } from '..';
import { easeLinear, easeQuad } from 'd3-ease';

describe('Animation', () => {
  describe('Animation Class', () => {
    test.each(Array.from({ length: 10 }, (_, i) => i + 1))(
      'instanciate Animation and adds it to the animation map with a unique id',
      (id) => {
        const duration = 1000;
        const animation = new Animation(
          0,
          1,
          duration,
          jest.fn(),
          duration / 2,
          jest.fn()
        );
        expect(animationMap.get(id.toString())).toBe(animation);
      }
    );

    it('does update the animation', () => {
      const duration = 1000;
      const onUpdate = jest.fn();
      const animation = new Animation(0, 1, duration, onUpdate, 0, (t) => t);
      expect(onUpdate).not.toHaveBeenCalled();
      animation.update();
      expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    it('does not update the animation when duration has been exceeded', () => {
      const duration = 1000;
      const onUpdate = jest.fn();
      const animation = new Animation(
        0,
        1,
        duration,
        onUpdate,
        duration,
        (t) => t
      );
      animation.update();
      expect(onUpdate).not.toHaveBeenCalled();
    });

    it('does destroy the animation', () => {
      const duration = 1000;
      const onUpdate = jest.fn();
      const animation = new Animation(
        0,
        1,
        duration,
        onUpdate,
        0, // delay equal to duration
        (t) => t
      );
      expect(animationMap.get(animation.id)).toBeDefined();
      animation.destroy();
      expect(onUpdate).not.toHaveBeenCalled();
      expect(animationMap.get(animation.id)).toBeUndefined();
    });

    it('forces the animation to end with a fast forward', () => {
      const duration = 1000;
      const from = 0;
      const to = 1;
      const onUpdate = jest.fn();
      const animation = new Animation(
        from,
        to,
        duration,
        onUpdate,
        0, // delay equal to duration
        (t) => t
      );
      animation.destroy(true);
      expect(animationMap.get(animation.id)).toBeUndefined();
      expect(onUpdate).toHaveBeenCalledWith(1);
    });
  });

  describe('animate function', () => {
    const duration = 1000;
    const delay = 0;
    const tickInterval = 100;
    const callCount = duration / tickInterval;
    const ticks = Array.from(Array(callCount).keys()).map(
      (callIdx: number) => callIdx + 1
    );
    const expectedValues = ticks.map((tick: number) => [tick / callCount]);
    let currentTimestamp = 0;

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => {
        return currentTimestamp;
      });
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        currentTimestamp += tickInterval;
        setTimeout(cb, tickInterval);
        return +new Date();
      });
    });

    afterEach(() => {
      currentTimestamp = 0;
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it('does not create an animation when no option is provided', () => {
      const { animationMap, animate } = require('../');
      const from = 0;
      const to = 1;
      const onUpdate = jest.fn();
      const animationCount = animationMap.size;
      const destroy = animate(from, to, undefined as any, onUpdate);
      expect(animationMap.size).toBe(animationCount);
      expect(onUpdate).toBeCalledWith(to);
      destroy();
      expect(onUpdate).toBeCalledTimes(1);
    });

    it('does create an animation', (done) => {
      const onUpdate = jest.fn();
      const animationCount = animationMap.size;
      animate(0, 1, { duration, delay, easing: 'easeLinear' }, onUpdate);

      // Animation is added to the dict
      expect(animationMap.size).toBe(animationCount + 1);

      // onUpdate should called 10 times with values from 0 to 1 in a linear progression : .1, .2, .3 ....
      setTimeout(() => {
        expect(onUpdate).toBeCalled();
        expect(onUpdate).toBeCalledTimes(callCount);
        expect(onUpdate.mock.calls).toEqual(expectedValues);
        done();
      }, duration + delay);
    });

    it('does destroy the animation', (done) => {
      const onUpdate = jest.fn();
      const destroy = animate(
        0,
        1,
        { duration, delay, easing: 'easeLinear' },
        onUpdate
      );

      // Destroy animation half way
      setTimeout(() => {
        destroy();
      }, (duration + delay) / 2);

      // onUpdate should called 10 times with values from 0 to 1 in a linear progression : .1, .2, .3 ....
      setTimeout(() => {
        destroy();
        expect(onUpdate).toBeCalled();
        expect(onUpdate).toBeCalledTimes(callCount / 2);
        expect(onUpdate.mock.calls).toEqual(
          expectedValues.slice(0, expectedValues.length / 2)
        );
        done();
      }, duration + delay);
    });

    it('does fast-forward and destroy the animation', (done) => {
      const onUpdate = jest.fn();
      const destroy = animate(
        0,
        1,
        { duration, delay, easing: 'easeLinear' },
        onUpdate
      );

      // Destroy animation half way
      setTimeout(() => {
        destroy(true);
      }, (duration + delay) / 2);

      // onUpdate should called 10 times with values from 0 to 1 in a linear progression : .1, .2, .3 ....
      setTimeout(() => {
        destroy();
        expect(onUpdate).toBeCalled();
        expect(onUpdate).toBeCalledTimes(callCount / 2 + 1);
        expect(onUpdate.mock.calls).toEqual(
          expectedValues.slice(0, expectedValues.length / 2).concat([[1]])
        );
        done();
      }, duration + delay);
    });

    it('Runs with default options when they are not provided', (done) => {
      const onUpdate = jest.fn();
      animate(0, 1, {}, onUpdate);

      // should run as first test althought no animation options were provided as first
      // test duration is 1000, delay 0 and uses easeLinear which are the default options
      setTimeout(() => {
        expect(onUpdate).toBeCalled();
        expect(onUpdate).toBeCalledTimes(callCount);
        expect(onUpdate.mock.calls).toEqual(expectedValues);
        done();
      }, 1000);
    });

    it('Uses custom easing function', (done) => {
      const onUpdate = jest.fn();
      animate(0, 1, { easing: (t) => 0.5 + t / 2 }, onUpdate);

      // onUpdate should called 10 times with values from .5 to 1 in a linear progression : .55, .6, .65 ....
      setTimeout(() => {
        expect(onUpdate).toBeCalled();
        expect(onUpdate).toBeCalledTimes(callCount);
        expect(onUpdate.mock.calls).toEqual([
          [0.55],
          [0.6],
          [0.65],
          [0.7],
          [0.75],
          [0.8],
          [0.85],
          [0.9],
          [0.95],
          [1],
        ]);
        done();
      }, duration);
    });
  });

  describe('getEasingFunction', () => {
    it('Returns the d3 linear easing function by default', () => {
      expect(getEasingFunction()).toEqual(easeLinear);
    });

    it('Displays a warning when providing an unknown easing fn and fallsback to easeLinear', () => {
      const consoleWarn = spyOn(console, 'warn');
      const easingFunction = getEasingFunction('ManaMana' as any);
      expect(easingFunction).toBe(easeLinear);
      expect(consoleWarn).toBeCalledTimes(1);
    });

    it('Returns the d3 easing function by name', () => {
      expect(getEasingFunction('easeQuad')).toEqual(easeQuad);
    });
  });
});
