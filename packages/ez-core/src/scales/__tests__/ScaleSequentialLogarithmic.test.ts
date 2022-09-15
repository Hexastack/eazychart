import ScaleSequentialLogarithmic from '../ScaleSequentialLogarithmic';

describe('ScaleSequentialLogarithmic', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const sequentialLog = new ScaleSequentialLogarithmic();
    expect(sequentialLog).toBeDefined();
    expect(sequentialLog.scale).toBeDefined();

    expect(sequentialLog.scale.domain()).toEqual([0.1, 10]);
    expect(sequentialLog.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const sequentialLog = new ScaleSequentialLogarithmic();

    sequentialLog.setDefinition({ range: [0, 50] });

    expect(sequentialLog.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const sequentialLog = new ScaleSequentialLogarithmic({
      domain: [1, 1000],
      range: [0, 3],
    });

    expect(sequentialLog.scale(1)).toEqual(0);
    expect(sequentialLog.scale(10)).toEqual(1);
    expect(sequentialLog.scale(1000)).toEqual(3);
    expect(sequentialLog.scale(10000)).toEqual(4);
    expect(sequentialLog.scale(0)).toEqual(NaN);
  });

  it('Outputs the scaled value with a custom base', () => {
    const sequentialLog = new ScaleSequentialLogarithmic({
      domain: [1, 64],
      range: [0, 6],
      base: 2,
    });

    expect(sequentialLog.scale(1)).toBeCloseTo(0);
    expect(sequentialLog.scale(2)).toBeCloseTo(1);
    expect(sequentialLog.scale(32)).toBeCloseTo(5);
    expect(sequentialLog.scale(64)).toBeCloseTo(6);
  });
});
