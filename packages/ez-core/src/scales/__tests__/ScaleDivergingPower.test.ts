import ScaleDivergingPower from '../ScaleDivergingPower';
import ScaleDivergingSqrt from '../ScaleDivergingSqrt';

describe('ScaleDivergingPower & ScaleDivergingSqrt', () => {
  describe('ScaleDivergingPower', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
      const divergingPower = new ScaleDivergingPower();
      expect(divergingPower).toBeDefined();
      expect(divergingPower.scale).toBeDefined();

      expect(divergingPower.scale.domain()).toEqual([0, 0.5, 1]);
      expect(divergingPower.scale.range()).toEqual([0, 400, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const divergingPower = new ScaleDivergingPower();

      divergingPower.setDefinition({ range: [0, 50] });

      expect(divergingPower.scale.range()).toEqual([0, 25, 50]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const divergingPower = new ScaleDivergingPower({
        domain: [-10, 0, 10],
        range: [0, 10, 110],
      });

      expect(divergingPower.scale(-10)).toEqual(0);
      expect(divergingPower.scale(-5)).toBeCloseTo(7.5);
      expect(divergingPower.scale(0)).toEqual(10);
      expect(divergingPower.scale(7)).toBeCloseTo(59);
      expect(divergingPower.scale(10)).toEqual(110);
    });

    it('Outputs the scaled value with custom exponent', () => {
      const divergingPower = new ScaleDivergingPower({
        domain: [-10, 0, 10],
        range: [0, 10, 110],
        exponent: 3,
      });

      expect(divergingPower.scale(-10)).toEqual(0);
      expect(divergingPower.scale(-9)).toBeCloseTo(2.7, -1);
      expect(divergingPower.scale(0)).toEqual(10);
      expect(divergingPower.scale(5)).toBeCloseTo(22.5);
      expect(divergingPower.scale(10)).toEqual(110);
    });
  });

  describe('ScaleDivergingSqrt', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
      const divergingPower = new ScaleDivergingSqrt();
      expect(divergingPower).toBeDefined();
      expect(divergingPower.scale).toBeDefined();

      expect(divergingPower.scale.domain()).toEqual([0, 0.5, 1]);
      expect(divergingPower.scale.range()).toEqual([0, 400, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const divergingPower = new ScaleDivergingSqrt();

      divergingPower.setDefinition({ range: [0, 50] });

      expect(divergingPower.scale.range()).toEqual([0, 25, 50]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const divergingPower = new ScaleDivergingSqrt({
        domain: [-100, 0, 100],
        range: [0, 10, 100],
      });

      expect(divergingPower.scale(-100)).toEqual(0);
      expect(divergingPower.scale(-64)).toBeCloseTo(2);
      expect(divergingPower.scale(0)).toEqual(10);
      expect(divergingPower.scale(81)).toBeCloseTo(91);
      expect(divergingPower.scale(100)).toEqual(100);
    });
  });
});
