import D3ScaleTime from '../ScaleTime';
import ScaleUtc from '../ScaleUtc';

describe('ScaleTime & ScaleUtc', () => {
  describe('ScaleTime', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 2000-01-01 - 2000-01-02', () => {
      const time = new D3ScaleTime();
      expect(time).toBeDefined();
      expect(time.scale).toBeDefined();

      expect(time.scale.domain()).toEqual([
        new Date('2000-01-01T00:00:00.000Z'),
        new Date('2000-01-02T00:00:00.000Z'),
      ]);
      expect(time.scale.range()).toEqual([0, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const time = new D3ScaleTime();

      // nice is always set to 0 on tests to avoid that rounding affects in the tests
      time.setDefinition({ range: [0, 50], nice: 0 });
      expect(time.scale.range()).toEqual([0, 50]);
    });

    it("Accepts dates as domain which exists as numbers in the scale's definition", () => {
      const time = new D3ScaleTime({
        domain: [
          new Date('2020-01-01T00:00:00.000Z'),
          new Date('2020-01-02T00:00:00.000Z'),
        ],
        range: [0, 100],
        nice: 0,
      });

      expect(time.definition.domain).toEqual([1577836800000, 1577923200000]);
      expect(time.scale.domain()).toEqual([
        new Date('2020-01-01T00:00:00.000Z'),
        new Date('2020-01-02T00:00:00.000Z'),
      ]);
    });

    it("Accepts dates as domain modifiers which exist as numbers in the scale's definition", () => {
      const time = new D3ScaleTime({
        domainKey: 'value',
        maxPadding: 1000,
        min: new Date('1999-01-01T00:00:00.000Z'),
        range: [0, 100],
        nice: 0,
      });

      time.setData([
        { value: new Date('1999-01-01T00:00:00.000Z') },
        { value: new Date('2020-01-01T00:00:00.000Z') },
      ]);

      expect(time.definition.min).toEqual(915148800000);
      expect(time.scale.domain()).toEqual([
        new Date('1999-01-01T00:00:00.000Z'),
        new Date('2020-01-01T00:00:01.000Z'),
      ]);
    });

    it("Accepts string dates as domain which exists as numbers in the scale's definition", () => {
      const time = new D3ScaleTime({
        domain: ['2022-01-01T00:00:00.000Z', '2022-01-02T00:00:00.000Z'],
        range: [0, 100],
        nice: 0,
      });

      expect(time.definition.domain).toEqual([1640995200000, 1641081600000]);
      expect(time.scale.domain()).toEqual([
        new Date('2022-01-01T00:00:00.000Z'),
        new Date('2022-01-02T00:00:00.000Z'),
      ]);
    });

    it("Accepts string  dates as domain modifiers which exist as numbers in the scale's definition", () => {
      const time = new D3ScaleTime({
        domainKey: 'value',
        softMax: '2020-01-02T00:00:00.000Z',
        min: '1999-01-01T00:00:00.000Z',
        range: [0, 100],
        nice: 0,
      });

      time.setData([
        { value: new Date('1999-01-01T00:00:00.000Z') },
        { value: new Date('2020-01-01T00:00:00.000Z') },
      ]);

      expect(time.definition.min).toEqual(915148800000);
      expect(time.definition.softMax).toEqual(1577923200000);
      expect(time.scale.domain()).toEqual([
        new Date('1999-01-01T00:00:00.000Z'),
        new Date('2020-01-02T00:00:00.000Z'),
      ]);
    });

    it('Fallsback to 0 (timestamp) when it can not convert user definition to a valid date', () => {
      const time = new D3ScaleTime({
        // @ts-ignore
        domain: ['invalid date', undefined, new Date('non valid')],
        range: [0, 100],
        nice: 0,
      });

      expect(time.definition.domain).toEqual([0, 0, 0]);
      expect(time.scale.domain()).toEqual([
        new Date('1970-01-01T00:00:00.000Z'),
        new Date('1970-01-01T00:00:00.000Z'),
        new Date('1970-01-01T00:00:00.000Z'),
      ]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const time = new D3ScaleTime({
        domain: [
          new Date('2000-01-01T00:00:00.000Z'),
          new Date('2000-01-07T00:00:00.000Z'),
        ],
        range: [1, 7],
        nice: 0,
      });

      // With a domain [2000-01-01, 2000-01-07] and range [1, 7]
      // an input value 2000-01-01 should be result on an output of 1
      // an input value 2000-01-05 should be result on an output of 5
      // output can be out of the range boundaries as clamping is not applied
      expect(time.scale(new Date('2000-01-01'))).toEqual(1);
      expect(time.scale(new Date('2000-01-10'))).toEqual(10);
    });

    it('Produces ticks relative to local timezone', () => {
      // Timezone EST is applied to the domain (notice no Z at the end of the date)
      const time = new D3ScaleTime({
        domain: [
          new Date('2000-01-01T00:00:00.000'),
          new Date('2000-01-03T00:00:00.000'),
        ],
        range: [1, 2],
        nice: 0,
      });

      expect(time.scale.ticks(4)).toEqual([
        new Date('2000-01-01T05:00:00.000Z'),
        new Date('2000-01-01T17:00:00.000Z'),
        new Date('2000-01-02T05:00:00.000Z'),
        new Date('2000-01-02T17:00:00.000Z'),
        new Date('2000-01-03T05:00:00.000Z'),
      ]);
    });
  });

  describe('ScaleUtc', () => {
    it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of  2000-01-01 - 2000-01-02', () => {
      const utc = new ScaleUtc();
      expect(utc).toBeDefined();
      expect(utc).toBeInstanceOf(D3ScaleTime);
      expect(utc.scale).toBeDefined();

      expect(utc.scale.domain()).toEqual([
        new Date('2000-01-01T00:00:00.000Z'),
        new Date('2000-01-02T00:00:00.000Z'),
      ]);
      expect(utc.scale.range()).toEqual([0, 800]);
    });

    it('Generates a new computed scale when user definition changes', () => {
      const utc = new ScaleUtc();

      // nice is always set to 0 on tests to avoid that rounding affects in the tests
      utc.setDefinition({ range: [0, 50], nice: 0 });
      expect(utc.scale.range()).toEqual([0, 50]);
    });

    it('Fallsback to 0 (timestamp) when it can not convert user definition to a valid date', () => {
      const utc = new ScaleUtc({
        // @ts-ignore
        domain: ['invalid date', undefined, new Date('non valid')],
        range: [0, 100],
        nice: 0,
      });

      expect(utc.definition.domain).toEqual([0, 0, 0]);
      expect(utc.scale.domain()).toEqual([
        new Date('1970-01-01T00:00:00.000Z'),
        new Date('1970-01-01T00:00:00.000Z'),
        new Date('1970-01-01T00:00:00.000Z'),
      ]);
    });

    it('Outputs the scaled value (from the computed scale)', () => {
      const utc = new ScaleUtc({
        domain: [
          new Date('2000-01-01T00:00:00.000Z'),
          new Date('2000-01-07T00:00:00.000Z'),
        ],
        range: [1, 7],
        nice: 0,
      });

      // With a domain [2000-01-01, 2000-01-07] and range [1, 7]
      // an input value 2000-01-01 should be result on an output of 1
      // an input value 2000-01-05 should be result on an output of 5
      // output can be out of the range boundaries as clamping is not applied
      expect(utc.scale(new Date('2000-01-01'))).toEqual(1);
      expect(utc.scale(new Date('2000-01-03'))).toEqual(3);
      expect(utc.scale.invert(10)).toEqual(
        new Date('2000-01-10T00:00:00.000Z')
      );
    });

    it('Produces ticks relative to utc', () => {
      // Timezone EST is applied to the domain (notice no Z at the end of the date)
      const utc = new ScaleUtc({
        domain: [
          new Date('2000-01-01T00:00:00.000'),
          new Date('2000-01-03T00:00:00.000'),
        ],
        range: [1, 2],
        nice: 0,
      });

      expect(utc.scale.ticks(4)).toEqual([
        new Date('2000-01-01T12:00:00.000Z'),
        new Date('2000-01-02T00:00:00.000Z'),
        new Date('2000-01-02T12:00:00.000Z'),
        new Date('2000-01-03T00:00:00.000Z'),
      ]);
    });
  });
});
