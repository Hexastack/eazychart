import Axis from '..';
import { ScaleBand, ScaleLinear } from '../../scales';
import { Position } from '../../types';

// linearScale range and domain would be [0, 800]
const linearScale = new ScaleLinear({ domain: [0, 800] });

describe('Axis', () => {
  it('Instanciate with a reference of the passed scale', () => {
    const axis = new Axis(Position.BOTTOM, linearScale.scale);
    expect(axis.scale()).toBe(linearScale.scale);
    expect(axis.orientation()).toBe(Position.BOTTOM);
  });

  it('Defaults to orientation left when the passed orientation is invalid', () => {
    // @ts-ignore
    const axis = new Axis('WEST', linearScale.scale);
    expect(axis.orientation()).toBe(Position.LEFT);
  });

  it('Has 0 offset when run on a zoomed in browser', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get');
    let axis = new Axis(Position.LEFT, linearScale.scale);
    expect(axis.offset()).toEqual(0.5);

    // @ts-ignore
    windowSpy.mockImplementation(() => ({ devicePixelRatio: 2 }));
    axis = new Axis(Position.LEFT, linearScale.scale);
    expect(axis.offset()).toEqual(0);
  });

  describe('Setters and getters', () => {
    it('Defaults tick values and format to null - so it will be deduced from scale', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.tickValues()).toBeNull();
      expect(axis.tickFormat()).toBeNull();
    });

    it('Defaults tick sizes to 6', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.tickSizeInner()).toEqual(6);
      expect(axis.tickSizeOuter()).toEqual(6);
      expect(axis.tickSize()).toEqual(6);
      expect(axis.tickPadding()).toEqual(3);
    });

    it('Returns inner tick size when trying to get tick size', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.tickSize(10).tickSize()).toEqual(10);
      expect(axis.tickSize(10).tickSizeInner(3).tickSize()).toEqual(3);
    });

    it('Uses the passed scale ticks unless ticks are explecitly set', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.axis().ticks.length).toEqual(
        linearScale.scale.ticks().length
      );
      axis.ticks(5);
      expect(axis.axis().ticks.length).toEqual(6);
    });

    it('Sets scale', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      const scaleBand = new ScaleBand({ domain: ['A', 'B'] });
      axis.scale(scaleBand.scale);
      expect(axis.scale()).toBe(scaleBand.scale);
    });

    it('Sets Orientation when it is valid otherwise it keeps last valid orientation', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.orientation()).toBe(Position.LEFT);
      axis.orientation(Position.RIGHT);
      expect(axis.orientation()).toBe(Position.RIGHT);
      // @ts-ignore
      axis.orientation('EAST');
      expect(axis.orientation()).toBe(Position.RIGHT);
    });

    it('Sets an empty array when the passed tickArguments are null', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      axis.tickArguments(null);
      expect(axis.tickArguments()).toEqual([]);
    });

    it('Sets tickValues to null when null is passed', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      axis.tickValues(null);
      expect(axis.tickValues()).toBeNull();
    });

    it('Sets various attributes and returns the instance (chainable)', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      const scaleBand = new ScaleBand({ domain: ['A', 'B'] });
      expect(
        axis
          .orientation(Position.RIGHT)
          .scale(scaleBand.scale)
          .ticks(3)
          .tickArguments([1, 'ss'])
          .tickValues([1, 2, 3])
          .tickFormat((d: any) => `+${d}°`)
          .tickSize(3)
          .tickSizeInner(3)
          .tickSizeOuter(4)
          .tickPadding(2)
          .offset(5)
      ).toBe(axis);
      expect(axis.tickArguments()).toEqual([1, 'ss']);
      expect(axis.tickValues()).toEqual([1, 2, 3]);
      expect((axis.tickFormat() as (t: unknown) => unknown)('4')).toEqual(
        '+4°'
      );
      expect(axis.tickSizeInner()).toEqual(3);
      expect(axis.tickSizeOuter()).toEqual(4);
    });
  });

  describe('axis', () => {
    it('Generate a valid axis object', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      const axisTicks = axis.axis();
      expect(axisTicks).toBeDefined();

      expect(axisTicks).toHaveProperty('anchor', 'end');

      expect(axisTicks).toHaveProperty('path');
      expect(axisTicks.path).toHaveProperty('tick');
      expect(axisTicks.path).toHaveProperty('range0');
      expect(axisTicks.path).toHaveProperty('range1');

      expect(axisTicks).toHaveProperty('ticks');
      expect(axisTicks.ticks).toBeInstanceOf(Array);
      expect(axisTicks.ticks.length).toBeGreaterThan(0);
      expect(axisTicks.ticks[0]).toHaveProperty('transform');
      expect(axisTicks.ticks[0]).toHaveProperty('line');
      expect(axisTicks.ticks[0]).toHaveProperty('text');

      expect(axisTicks.ticks[0].transform).toHaveProperty('x');
      expect(axisTicks.ticks[0].transform).toHaveProperty('y');
      expect(axisTicks.ticks[0].text).toHaveProperty('text');
      expect(axisTicks.ticks[0].text).toHaveProperty('dy');
    });

    it('Generate a centered text for top and bottom axis', () => {
      const axis = new Axis(Position.TOP, linearScale.scale);
      expect(axis.axis().anchor).toEqual('middle');
      axis.orientation(Position.BOTTOM);
      expect(axis.axis().anchor).toEqual('middle');
    });

    it('Generate a text end anchored for left axis while start anchored for right axis', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.axis().anchor).toEqual('end');
      axis.orientation(Position.RIGHT);
      expect(axis.axis().anchor).toEqual('start');
    });

    it('Generate ticks with dy of 0.3 for left and right axis', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      expect(axis.axis().ticks[0].text.dy).toEqual(0.3);
      axis.orientation(Position.RIGHT);
      expect(axis.axis().ticks[0].text.dy).toEqual(0.3);
    });

    it('Generate ticks with dy of 0.6 for bottom axis but dy of 0 for top axis', () => {
      const axis = new Axis(Position.TOP, linearScale.scale);
      expect(axis.axis().ticks[0].text.dy).toEqual(0);
      axis.orientation(Position.BOTTOM);
      expect(axis.axis().ticks[0].text.dy).toEqual(0.6);
    });

    it('Ticks are centered when using scale Band', () => {
      const axis = new Axis(Position.TOP, linearScale.scale);
      expect(axis.axis().ticks[0].text.dy).toEqual(0);
      axis.orientation(Position.BOTTOM);
      expect(axis.axis().ticks[0].text.dy).toEqual(0.6);
    });

    it('Uses identity by default when the passed scale does not support tickFormat', () => {
      const scaleBand = new ScaleBand({ domain: ['A', 'B'] });
      const axis = new Axis(Position.TOP, scaleBand.scale);
      expect(axis.axis().ticks[0].text.text).toEqual('A');
      expect(axis.axis().ticks[1].text.text).toEqual('B');
    });

    it('Moves Ticks to center of bandwidth when the passed scale is scaleBand', () => {
      const scaleBand = new ScaleBand({
        domain: ['A', 'B'],
        padding: 0,
        range: [0, 8],
      });
      const axis = new Axis(Position.TOP, scaleBand.scale);
      expect(axis.axis().ticks[0].transform.x).toEqual(2);
      expect(axis.axis().ticks[1].transform.x).toEqual(6);

      const edgyScaleBand = new ScaleBand({
        domain: ['A', 'B'],
        padding: 0,
        range: [0, 8.2],
      });
      axis.scale(edgyScaleBand.scale);
      expect(axis.axis().ticks[0].transform.x).not.toEqual(2);

      const smoothScaleBand = new ScaleBand({
        domain: ['A', 'B'],
        padding: 0,
        range: [0, 8.2],
        round: true,
      });
      axis.scale(smoothScaleBand.scale);
      expect(axis.axis().ticks[0].transform.x).toEqual(2);
    });

    it('Returns the expected ticks', () => {
      const axis = new Axis(Position.LEFT, linearScale.scale);
      axis.tickValues([0, 100, 800]).tickFormat((text: any) => `${text}%`);
      expect(axis.axis().ticks).toEqual([
        {
          transform: { x: 0, y: 0 },
          line: { x2: -6 },
          text: { dy: 0.3, text: '0%', x: -9 },
        },
        {
          transform: { x: 0, y: 80 },
          line: { x2: -6 },
          text: { dy: 0.3, text: '100%', x: -9 },
        },
        {
          transform: { x: 0, y: 640 },
          line: { x2: -6 },
          text: { dy: 0.3, text: '800%', x: -9 },
        },
      ]);

      axis.tickSizeInner(10).offset(20);
      expect(axis.axis().ticks).toEqual([
        {
          transform: { x: 0, y: 20 },
          line: { x2: -10 },
          text: { dy: 0.3, text: '0%', x: -13 },
        },
        {
          transform: { x: 0, y: 100 },
          line: { x2: -10 },
          text: { dy: 0.3, text: '100%', x: -13 },
        },
        {
          transform: { x: 0, y: 660 },
          line: { x2: -10 },
          text: { dy: 0.3, text: '800%', x: -13 },
        },
      ]);
    });
  });
});
