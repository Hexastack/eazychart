import D3ScaleSymLog from '../ScaleSymLog';

describe('ScaleSymLog', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const symlog = new D3ScaleSymLog();
    expect(symlog).toBeDefined();
    expect(symlog.scale).toBeDefined();

    expect(symlog.scale.domain()).toEqual([0, 1]);
    expect(symlog.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const symlog = new D3ScaleSymLog();

    symlog.setDefinition({ range: [0, 50] });
    expect(symlog.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the signed scaled value (from the computed scale)', () => {
    const symlog = new D3ScaleSymLog({
      domain: [-10, 10],
      range: [0, 1e10],
      nice: 0,
    });

    // With a domain [-10, 10] and range [0, 10000000000] and constant of 1
    // an input value -10 should be result on an output of 0
    // an input value 0 should be result on an output of   5000000000
    // an input value 10 should be result on an output of  10000000000
    // this scale acts like log, but works with signed and unsigned values
    expect(symlog.scale(-10)).toEqual(0);
    expect(symlog.scale(-9)).toBeLessThan(1e9);
    expect(symlog.scale(-1)).toBeLessThan(4e9);
    expect(symlog.scale(-1)).toBeGreaterThan(3e9);
    expect(symlog.scale(0)).toEqual(5e9);
    expect(symlog.scale(1)).toBeLessThan(7e9);
    expect(symlog.scale(1)).toBeGreaterThan(6e9);
    expect(symlog.scale(9)).toBeGreaterThan(9e9);
    expect(symlog.scale(10)).toEqual(1e10);
  });

  it('Outputs the scaled value with custom log base', () => {
    const symlog = new D3ScaleSymLog({
      domain: [-10, 10],
      range: [0, 1e10],
      constant: 1e9,
      nice: 0,
    });

    // With a domain [-10, 10] and range [0, 10000000000] and constant of 1e9
    // The scale becomes almost linear
    expect(symlog.scale(-10)).toEqual(0);
    expect(symlog.scale(-8)).toBeCloseTo(1e9, 1);
    expect(symlog.scale(-6)).toBeCloseTo(2e9, 1);
    expect(symlog.scale(0)).toEqual(5e9);
    expect(symlog.scale(6)).toBeCloseTo(8e9, 1);
    expect(symlog.scale(8)).toBeCloseTo(9e9, 1);
    expect(symlog.scale(10)).toEqual(1e10);
  });
});
