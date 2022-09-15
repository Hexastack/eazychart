import D3ScaleRadial from '../ScaleRadial';

describe('ScaleRadial', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const radial = new D3ScaleRadial();
    expect(radial).toBeDefined();
    expect(radial.scale).toBeDefined();

    expect(radial.scale.domain()).toEqual([0, 1]);
    expect(radial.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const radial = new D3ScaleRadial();

    // nice is always set to 0 on tests to avoid that rounding affects in the tests
    radial.setDefinition({ range: [0, 50], nice: 0 });
    expect(radial.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const radial = new D3ScaleRadial({
      domain: [0, 10],
      range: [0, 100],
      nice: 0,
    });

    // With a domain [0, 10] and range [0, 100]
    // an input value 0 should be result on an output of 0
    // an input value 2 should be result on an output of ~ 100 / Math.sqrt(5)
    // an input value 5 should be result on an output of ~ 100 / Math.sqrt(2)
    // output can be out of the range boundaries as clamping is not applied
    expect(radial.scale(0)).toEqual(0);
    expect(radial.scale(2)).toBeCloseTo(100 / Math.sqrt(5));
    expect(radial.scale(5)).toBeCloseTo(100 / Math.sqrt(2));
    expect(radial.scale(10)).toBeCloseTo(100);
    expect(radial.scale(-5)).toBeCloseTo(-100 / Math.sqrt(2));
  });
});
