import D3ScaleThreshold from '../ScaleThreshold';

describe('ThresholdScale', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0.5', () => {
    const threshold = new D3ScaleThreshold();
    expect(threshold).toBeDefined();
    expect(threshold.scale).toBeDefined();
    expect(threshold.scale.domain()).toEqual([0.5]);
    expect(threshold.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const threshold = new D3ScaleThreshold();
    threshold.setDefinition({ range: [0, 50] });
    expect(threshold.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const threshold = new D3ScaleThreshold({
      domain: [0, 10],
      range: [0, 5, 10],
    });

    // With a domain [0, 10] and range [0, 5, 10]
    // an input value 0 should be result on an output of 5
    // an input value 1 should be result on an output of 5
    // an input value 5 should be result on an output of 5
    // an input value 10 should be result on an output of 10
    // output can be out of the range boundaries as clamping is not applied
    expect(threshold.scale(-1)).toEqual(0);

    expect(threshold.scale(0)).toEqual(5);
    expect(threshold.scale(1)).toEqual(5);
    expect(threshold.scale(5)).toEqual(5);
    expect(threshold.scale(10)).toEqual(10);
  });
});
