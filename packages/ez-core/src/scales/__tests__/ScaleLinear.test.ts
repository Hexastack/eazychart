import D3ScaleLinear from '../ScaleLinear';

describe('ScaleLinear', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const linear = new D3ScaleLinear();
    expect(linear).toBeDefined();
    expect(linear.scale).toBeDefined();

    expect(linear.scale.domain()).toEqual([0, 1]);
    expect(linear.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const linear = new D3ScaleLinear();

    // nice is always set to 0 on tests to avoid that rounding affects in the tests
    linear.setDefinition({ range: [0, 50], nice: 0 });
    expect(linear.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const linear = new D3ScaleLinear({
      domain: [0, 10],
      range: [0, 100],
      nice: 0,
    });

    // With a domain [0, 10] and range [0, 100]
    // an input value 0 should be result on an output of 0
    // an input value 1 should be result on an output of 10
    // an input value 5 should be result on an output of 50
    // output can be out of the range boundaries as clamping is not applied
    expect(linear.scale(5)).toEqual(50);
    expect(linear.scale(10)).toEqual(100);
    expect(linear.scale(15)).toEqual(150);
    expect(linear.scale(-5)).toEqual(-50);
  });
});
