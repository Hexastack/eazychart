import D3ScaleDiverging from '../ScaleDiverging';

describe('ScaleDiverging', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const diverging = new D3ScaleDiverging();
    expect(diverging).toBeDefined();
    expect(diverging.scale).toBeDefined();

    expect(diverging.scale.domain()).toEqual([0, 0.5, 1]);
    expect(diverging.scale.range()).toEqual([0, 400, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const diverging = new D3ScaleDiverging();

    diverging.setDefinition({ range: [0, 50] });

    expect(diverging.scale.range()).toEqual([0, 25, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const diverging = new D3ScaleDiverging({
      domain: [-10, 0, 10],
      range: [0, 10, 100],
    });

    // With a domain [-10, 0, 10] and range [0, 10, 100]
    // an input value -10 should be result on an output of 0
    // an input value 0 should be result on an output of 10
    // an input value 5 should be result on an output of 55
    // an input value 10 should be result on an output of 100
    // output can be out of the range boundaries as clamping is not applied
    expect(diverging.scale(-5)).toEqual(5);
    expect(diverging.scale(0)).toEqual(10);
    expect(diverging.scale(5)).toEqual(55);
    expect(diverging.scale(20)).toEqual(190);
  });
});
