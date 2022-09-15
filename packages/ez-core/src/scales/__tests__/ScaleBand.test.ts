import { Direction } from '../../types';
import ScaleBand from '../ScaleBand';

describe('ScaleBand', () => {
  it('Instanciate and compute', () => {
    const band = new ScaleBand();
    expect(band).toBeDefined();
    expect(band.scale).toBeDefined();

    expect(band.scale.domain()).toEqual([]);
    expect(band.scale.range()).toEqual([0, 1]);
  });

  it('Reverses the range', () => {
    const band = new ScaleBand({
      reverse: true,
    });

    expect(band.scale.domain()).toEqual([]);
    expect(band.scale.range()).toEqual([1, 0]);
  });

  it('Computes the range from dimensions when no range is explicitly passed', () => {
    const band = new ScaleBand({
      direction: Direction.HORIZONTAL,
    });

    band.setDimensions({ width: 800, height: 600 });
    expect(band.scale.range()).toEqual([0, 800]);

    band.appendDefinition({
      direction: Direction.VERTICAL,
    });
    expect(band.scale.range()).toEqual([600, 0]);

    band.appendDefinition({ range: [10, 100] });
    expect(band.scale.range()).toEqual([10, 100]);
  });

  it('Outputs the right bands positions', () => {
    const band = new ScaleBand({
      domain: ['A', 'B', 'C'],
      range: [0, 150],
      // adding padding 0 to have crisp edges results
      padding: 0,
    });

    expect(band.scale('A')).toEqual(0);
    expect(band.scale('B')).toEqual(50);
    expect(band.scale('C')).toEqual(100);
    expect(band.scale('D')).not.toBeDefined();
    expect(band.scale.step()).toEqual(50);
    expect(band.scale.bandwidth()).toEqual(50);
  });

  it('Outputs unknown position if set', () => {
    const band = new ScaleBand({
      domain: ['A', 'B', 'C'],
      range: [0, 100],
      unknown: 30,
    });

    expect(band.scale('D')).toEqual(30);
  });

  it('Outputs according to a Rounded range', () => {
    const band = new ScaleBand({
      domain: ['A', 'B', 'C'],
      range: [-0.2, 100.1],
      roundRange: true,
      // adding padding 0 to have crisp edges results
      padding: 0,
    });

    expect(band.scale.range()).toEqual([-0.2, 100.1]);
    expect(band.scale('A')).toEqual(0);
    expect(band.scale('C')).toEqual(66);
  });

  it('Rounds outputs', () => {
    const band = new ScaleBand({
      domain: ['A', 'B', 'C'],
      range: [-0.2, 7.1],
      round: true,
    });

    expect(band.scale('A')).toEqual(1);
    // without round inputing 'B' would result on 3.5 output
    expect(band.scale('B')).toEqual(3);
    // as rounding acts directly on the steps rather than each input individually 'C' output
    // is also altered to be 6 (3 + step)
    expect(band.scale('C')).toEqual(5);
  });

  it('Adds a padding to the outputs', () => {
    const band = new ScaleBand({
      domain: ['A', 'B', 'C'],
      range: [0, 12],
      padding: 1,
    });

    // without padding A would result to 0
    expect(band.scale('A')).toEqual(3);
    expect(band.scale('B')).toEqual(6);
    // without padding C would result to 12
    expect(band.scale('C')).toEqual(9);

    expect(band.scale.step()).toEqual(3);
  });

  it('Aligns the bands when a padding is added', () => {
    const band = new ScaleBand({
      domain: ['A', 'B', 'C'],
      range: [0, 12],
      padding: 1,
      align: 0,
    });

    // bands would be pushed towerd the first element of the range (0)
    expect(band.scale('A')).toEqual(0);
    expect(band.scale('B')).toEqual(3);
    expect(band.scale('C')).toEqual(6);

    band.appendDefinition({
      align: 1,
    });

    // bands would be pushed towerd the last element of the range (12)
    expect(band.scale('A')).toEqual(6);
    expect(band.scale('B')).toEqual(9);
    expect(band.scale('C')).toEqual(12);
  });

  it('Adds an outer/inner padding that overwrites the global padding', () => {
    const band = new ScaleBand({
      domain: ['A', 'B'],
      range: [0, 11],
      padding: 0.2,
      // adding align 0 just to highlight the overwrite (first node not affected by inner padding)
      align: 0,
    });

    // padding of 0.2 result on A outputing to 0 and B to 5
    expect(band.scale('A')).toEqual(0);
    expect(band.scale('B')).toEqual(5);
    expect(band.scale.bandwidth()).toEqual(4);

    band.appendDefinition({ innerPadding: 0.4 });

    // adding inner padding will keep A at 0 (from global padding)
    // but push B further than 5 (would be 6)
    expect(band.scale('A')).toEqual(0);
    expect(band.scale('B')).toBeGreaterThan(5);
    expect(band.scale.bandwidth()).toBeLessThan(4);

    // we save the bandwidth to compare after applying outer padding
    const lastBandwidth = band.scale.bandwidth();
    band.appendDefinition({ outerPadding: 0.6 });

    // adding outer padding will move B under 5 (because of align 0)
    // bandwidth is further reduced
    expect(band.scale('B')).toBeLessThan(5);
    expect(band.scale.bandwidth()).toBeLessThan(lastBandwidth);
  });
});
