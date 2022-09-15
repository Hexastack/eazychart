import D3ScalePower from '../ScalePower';
import ScaleSqrt from '../ScaleSqrt';

describe('ScalePower and ScaleSqrt', () => {
  describe('ScalePower', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
      const power = new D3ScalePower();
      expect(power).toBeDefined();
      expect(power.scale).toBeDefined();

      expect(power.scale.domain()).toEqual([0, 1]);
      expect(power.scale.range()).toEqual([0, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const power = new D3ScalePower();

      // nice is always set to 0 on tests to avoid that rounding affects in the tests
      power.setDefinition({ range: [0, 50], nice: 0 });
      expect(power.scale.range()).toEqual([0, 50]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const power = new D3ScalePower({
        domain: [0, 10],
        range: [0, 100],
        nice: 0,
      });

      // With a domain [0, 10] and range [0, 100] and default exponent 2
      // an input value 0 should be result on an output of 0
      // an input value 2 should be result on an output of 4
      // an input value 5 should be result on an output of 25
      // output can be out of the range boundaries as clamping is not applied
      // Also sign is carried so -2^2 actually result on -4 (only unsigned part is scaled)
      expect(power.scale(0)).toEqual(0);
      expect(power.scale(2)).toEqual(4);
      expect(power.scale(5)).toEqual(25);
      expect(power.scale(10)).toEqual(100);
      expect(power.scale(12)).toEqual(144);
      expect(power.scale(-5)).toEqual(-25);
    });

    it('Outputs the scaled value with custom exponent', () => {
      const power = new D3ScalePower({
        domain: [0, 10],
        range: [0, 1000],
        nice: 0,
        exponent: 3,
      });
      // With a domain [0, 10] and range [0, 100] and exponent 3
      // an input value 0 should be result on an output of 0
      // an input value 1 should be result on an output of 1
      // an input value 2 should be result on an output of 8
      // an input value 3 should be result on an output of 27
      expect(power.scale(0)).toEqual(0);
      expect(power.scale(3)).toEqual(27);
      expect(power.scale(10)).toEqual(1000);
    });
  });

  describe('ScaleSqrt', () => {
    it('Generates a new computed scale when user definition changes', () => {
      const sqrt = new ScaleSqrt();

      // nice is always set to 0 on tests to avoid that rounding affects in the tests
      sqrt.setDefinition({ range: [0, 50], nice: 0 });
      expect(sqrt.scale.range()).toEqual([0, 50]);
    });

    it('Outputs the scaled value with an exponent of 1/2', () => {
      const sqrt = new ScaleSqrt({
        domain: [0, 100],
        range: [0, 10],
        nice: 0,
      });
      // With a domain [0, 100] and range [0, 10] and exponent 1/2
      // an input value 0 should be result on an output of 0
      // an input value 1 should be result on an output of 1
      // an input value 4 should be result on an output of 2
      // an input value 64 should be result on an output of 8
      // an input value 100 should be result on an output of 10
      // Also sign is carried so
      expect(sqrt.scale(0)).toEqual(0);
      expect(sqrt.scale(9)).toEqual(3);
      expect(sqrt.scale(25)).toEqual(5);
      expect(sqrt.scale(144)).toEqual(12);
      expect(sqrt.scale(-81)).toEqual(-9);
    });
  });
});
