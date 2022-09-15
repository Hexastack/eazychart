import ScaleSequentialPower from '../ScaleSequentialPower';
import ScaleSequentialSqrt from '../ScaleSequentialSqrt';

describe('ScaleSequantialPower & ScaleSequantialSqrt', () => {
  describe('ScaleSequantialPower', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
      const sequantialPower = new ScaleSequentialPower();
      expect(sequantialPower).toBeDefined();
      expect(sequantialPower.scale).toBeDefined();

      expect(sequantialPower.scale.domain()).toEqual([0, 1]);
      expect(sequantialPower.scale.range()).toEqual([0, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const sequantialPower = new ScaleSequentialPower();

      sequantialPower.setDefinition({ range: [0, 50] });

      expect(sequantialPower.scale.range()).toEqual([0, 50]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const sequantialPower = new ScaleSequentialPower({
        domain: [-10, 10],
        range: [-100, 100],
      });
      expect(sequantialPower.scale(-5)).toEqual(-25);
      expect(sequantialPower.scale(0)).toEqual(0);
      expect(sequantialPower.scale(7)).toEqual(49);
      expect(sequantialPower.scale(10)).toEqual(100);
      expect(sequantialPower.scale(14)).toEqual(196);
    });

    it('Outputs the scaled value with custom exponent', () => {
      const sequantialPower = new ScaleSequentialPower({
        domain: [0, 10],
        range: [0, 100],
        exponent: 3,
      });

      expect(sequantialPower.scale(0)).toEqual(0);
      expect(sequantialPower.scale(5)).toEqual(12.5);
      expect(sequantialPower.scale(10)).toEqual(100);
      expect(sequantialPower.scale(14)).toBeCloseTo(274.4);
    });
  });

  describe('ScaleSequantialSqrt', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
      const sequantialSqrt = new ScaleSequentialSqrt();
      expect(sequantialSqrt).toBeDefined();
      expect(sequantialSqrt.scale).toBeDefined();

      expect(sequantialSqrt.scale.domain()).toEqual([0, 1]);
      expect(sequantialSqrt.scale.range()).toEqual([0, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const sequantialSqrt = new ScaleSequentialSqrt();

      sequantialSqrt.setDefinition({ range: [0, 50] });

      expect(sequantialSqrt.scale.range()).toEqual([0, 50]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const sequantialSqrt = new ScaleSequentialSqrt({
        domain: [0, 100],
        range: [0, 10],
      });

      expect(sequantialSqrt.scale(0)).toEqual(0);
      expect(sequantialSqrt.scale(9)).toBeCloseTo(3);
      expect(sequantialSqrt.scale(25)).toEqual(5);
      expect(sequantialSqrt.scale(144)).toBeCloseTo(12);
      expect(sequantialSqrt.scale(-81)).toEqual(-9);
    });
  });
});
