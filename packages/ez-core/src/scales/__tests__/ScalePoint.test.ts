import { Direction } from '../../types';
import D3ScalePoint from '../ScalePoint';

describe('ScalePoint', () => {
  it('Instanciate and compute', () => {
    const point = new D3ScalePoint();
    expect(point).toBeDefined();
    expect(point.scale).toBeDefined();

    expect(point.scale.domain()).toEqual([]);
    expect(point.scale.range()).toEqual([0, 1]);
  });

  it('Reverses the range', () => {
    const point = new D3ScalePoint({
      reverse: true,
    });

    expect(point.scale.domain()).toEqual([]);
    expect(point.scale.range()).toEqual([1, 0]);
  });

  it('Computes the range from dimensions when no range is explicitly passed', () => {
    const point = new D3ScalePoint({
      direction: Direction.HORIZONTAL,
    });

    point.setDimensions({ width: 800, height: 600 });
    expect(point.scale.range()).toEqual([0, 800]);

    point.appendDefinition({
      direction: Direction.VERTICAL,
    });
    expect(point.scale.range()).toEqual([600, 0]);

    point.appendDefinition({ range: [10, 100] });
    expect(point.scale.range()).toEqual([10, 100]);
  });

  it('Outputs the right points positions', () => {
    const point = new D3ScalePoint({
      domain: ['A', 'B', 'C'],
      range: [0, 100],
      padding: 0,
    });

    expect(point.scale('A')).toEqual(0);
    expect(point.scale('B')).toEqual(50);
    expect(point.scale('C')).toEqual(100);
    expect(point.scale('D')).not.toBeDefined();
    expect(point.scale.step()).toEqual(50);
  });

  it('Outputs unknown position if set', () => {
    const point = new D3ScalePoint({
      domain: ['A', 'B', 'C'],
      range: [0, 100],
      unknown: 30,
    });

    expect(point.scale('D')).toEqual(30);
  });

  it('Outputs according to a Rounded range', () => {
    const point = new D3ScalePoint({
      domain: ['A', 'B', 'C'],
      range: [-0.2, 100.1],
      roundRange: true,
      padding: 0,
    });

    expect(point.scale.range()).toEqual([-0.2, 100.1]);
    expect(point.scale('A')).toEqual(0);
    expect(point.scale('C')).toEqual(100);
  });

  it('Rounds outputs', () => {
    const point = new D3ScalePoint({
      domain: ['A', 'B', 'C'],
      range: [-0.2, 7.1],
      round: true,
    });

    expect(point.scale('A')).toEqual(0);
    // without round inputing 'B' would result on 3.5 output
    expect(point.scale('B')).toEqual(3);
    // as rounding acts directly on the steps rather than each input individually 'C' output
    // is also altered to be 6 (3 + step)
    expect(point.scale('C')).toEqual(6);
  });

  it('Adds a padding to the outputs', () => {
    const point = new D3ScalePoint({
      domain: ['A', 'B', 'C'],
      range: [0, 12],
      padding: 1,
    });

    // without padding A would result to 0
    expect(point.scale('A')).toEqual(3);
    expect(point.scale('B')).toEqual(6);
    // without padding C would result to 12
    expect(point.scale('C')).toEqual(9);

    expect(point.scale.step()).toEqual(3);
  });

  it('Aligns the points when a padding is added', () => {
    const point = new D3ScalePoint({
      domain: ['A', 'B', 'C'],
      range: [0, 12],
      padding: 1,
      align: 0,
    });

    // points would be pushed towerd the first element of the range (0)
    expect(point.scale('A')).toEqual(0);
    expect(point.scale('B')).toEqual(3);
    expect(point.scale('C')).toEqual(6);

    point.appendDefinition({
      align: 1,
    });

    // points would be pushed towerd the last element of the range (12)
    expect(point.scale('A')).toEqual(6);
    expect(point.scale('B')).toEqual(9);
    expect(point.scale('C')).toEqual(12);
  });
});
