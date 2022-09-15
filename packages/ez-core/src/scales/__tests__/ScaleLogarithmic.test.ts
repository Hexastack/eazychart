import D3ScaleLogarithmic from '../ScaleLogarithmic';

describe('ScaleLogarithmic', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const logarithmic = new D3ScaleLogarithmic();
    expect(logarithmic).toBeDefined();
    expect(logarithmic.scale).toBeDefined();

    expect(logarithmic.scale.domain()).toEqual([0.1, 1]);
    expect(logarithmic.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const logarithmic = new D3ScaleLogarithmic();

    logarithmic.setDefinition({ range: [0, 50] });
    expect(logarithmic.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the positive scaled value (from the computed scale)', () => {
    const logarithmic = new D3ScaleLogarithmic({
      domain: [1, 1000],
      range: [0, 3],
      nice: 0,
    });

    // With a domain [1, 1000] and range [0, 3]
    // an input value 1 should be result on an output of 0 (10^0)
    // an input value 1000 should be result on an output of 3 (10^3)
    // an input value <= 0 should be result on an unexpected output (NaN - Unkown wont be taken into account)
    // output can be out of the range boundaries as clamping is not applied
    expect(logarithmic.scale(1)).toEqual(0);
    expect(logarithmic.scale(10)).toEqual(1);
    expect(logarithmic.scale(1000)).toEqual(3);
    expect(logarithmic.scale(10000)).toEqual(4);
    expect(logarithmic.scale(0)).toEqual(NaN);
  });

  it('Outputs the negative scaled value (from the computed scale)', () => {
    const logarithmic = new D3ScaleLogarithmic({
      domain: [-1, -1000],
      range: [0, 3],
      nice: 0,
    });

    expect(logarithmic.scale(-1)).toEqual(0);
    expect(logarithmic.scale(-1000)).toEqual(3);
    expect(logarithmic.scale(1)).toEqual(NaN);
  });

  it('Outputs the scaled value with custom log base', () => {
    const logarithmic = new D3ScaleLogarithmic({
      domain: [1, 64],
      range: [0, 6],
      base: 2,
      nice: 0,
    });
    // With a domain [1, 64] and range [0, 100] and base 2
    // an input value 1 should be result on an output of 0 (2^0)
    // an input value 16 should be result on an output of 4 (2^4)
    expect(logarithmic.scale(1)).toEqual(0);
    expect(logarithmic.scale(2)).toEqual(1);
    expect(logarithmic.scale(32)).toEqual(5);
    expect(logarithmic.scale(64)).toEqual(6);
  });

  it('Does not compute the domain when it contains a 0 (e.g: -1, 1) and nice is set', () => {
    const logarithmic = new D3ScaleLogarithmic({
      domain: [-10, 10],
      range: [0, 3],
      nice: 1,
    });

    expect(logarithmic.scale.domain()).toContainEqual(NaN);
  });

  it('Applies a domain nicing (tested since log scale uses nice without args)', () => {
    const logarithmic = new D3ScaleLogarithmic({
      domain: [1.23, 987.65],
      range: [0, 3],
      nice: 1,
    });

    expect(logarithmic.scale.domain()).toEqual([1, 1000]);
  });
});
