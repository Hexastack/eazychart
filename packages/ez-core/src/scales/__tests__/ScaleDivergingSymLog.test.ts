import ScaleDivergingSymLog from '../ScaleDivergingSymLog';

describe('ScaleDivergingSymLog', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const divergingSymLog = new ScaleDivergingSymLog();
    expect(divergingSymLog).toBeDefined();
    expect(divergingSymLog.scale).toBeDefined();

    expect(divergingSymLog.scale.domain()).toEqual([0, 0.5, 1]);
    expect(divergingSymLog.scale.range()).toEqual([0, 400, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const divergingSymLog = new ScaleDivergingSymLog();

    divergingSymLog.setDefinition({ range: [0, 50] });

    expect(divergingSymLog.scale.range()).toEqual([0, 25, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const divergingSymLog = new ScaleDivergingSymLog({
      domain: [-1e10, 0, 1e10],
      range: [0, 10, 100],
    });

    expect(divergingSymLog.scale(-1e10)).toBeCloseTo(0);
    expect(divergingSymLog.scale(-1e9)).toBeCloseTo(1);
    expect(divergingSymLog.scale(0)).toBeCloseTo(10);
    expect(divergingSymLog.scale(1e5)).toBeCloseTo(55, -4);
    expect(divergingSymLog.scale(1e10)).toBeCloseTo(100);
  });

  it('Outputs the scaled value with a custom constant', () => {
    const divergingSymLog = new ScaleDivergingSymLog({
      domain: [-1e10, 0, 1e10],
      range: [0, 10, 100],
      constant: 100,
    });

    expect(divergingSymLog.scale(-1e10)).toBeCloseTo(0);
    expect(divergingSymLog.scale(-1e9)).toBeCloseTo(1.25);
    expect(divergingSymLog.scale(0)).toBeCloseTo(10);
    expect(divergingSymLog.scale(1e9)).toBeCloseTo(88.75);
    expect(divergingSymLog.scale(1e10)).toBeCloseTo(100);
  });
});
