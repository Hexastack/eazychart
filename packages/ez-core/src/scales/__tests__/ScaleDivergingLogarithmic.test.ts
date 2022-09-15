import ScaleDivergingLogarithmic from '../ScaleDivergingLogarithmic';

describe('ScaleDivergingLogarithmic', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const divergingLog = new ScaleDivergingLogarithmic();
    expect(divergingLog).toBeDefined();
    expect(divergingLog.scale).toBeDefined();

    expect(divergingLog.scale.domain()).toEqual([0.1, 5.05, 10]);
    expect(divergingLog.scale.range()).toEqual([0, 400, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const divergingLog = new ScaleDivergingLogarithmic();

    divergingLog.setDefinition({ range: [0, 50] });

    expect(divergingLog.scale.range()).toEqual([0, 25, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const divergingLog = new ScaleDivergingLogarithmic({
      domain: [1, 100, 10000],
      range: [0, 2, 6],
    });

    expect(divergingLog.scale(1)).toBeCloseTo(0);
    expect(divergingLog.scale(10)).toBeCloseTo(1);
    expect(divergingLog.scale(100)).toBeCloseTo(2);
    expect(divergingLog.scale(1000)).toBeCloseTo(4);
    expect(divergingLog.scale(10000)).toBeCloseTo(6);
  });

  it('Outputs the scaled value with a custom base', () => {
    const divergingLog = new ScaleDivergingLogarithmic({
      domain: [1, 16, 512],
      range: [0, 10, 30],
      base: 2,
    });

    expect(divergingLog.scale(1)).toBeCloseTo(0);
    expect(divergingLog.scale(4)).toBeCloseTo(5);
    expect(divergingLog.scale(16)).toBeCloseTo(10);
    expect(divergingLog.scale(256)).toBeCloseTo(26);
    expect(divergingLog.scale(512)).toBeCloseTo(30);
  });
});
