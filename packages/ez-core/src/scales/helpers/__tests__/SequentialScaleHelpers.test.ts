import { ScaleSequential, scaleSequential } from 'd3-scale';
import { Direction, Dimensions } from '../../../types';
import { SequentialScaleMinimalDefinition } from '../../types';
import {
  getSequentialScaleRange,
  getSequentialScaleDomain,
  configureSequentialScale,
} from '..';

const minimalDefinition: SequentialScaleMinimalDefinition = {
  reverse: false,
  roundRange: false,
  clamp: false,
  maxPadding: 0,
  minPadding: 0,
  softMax: -Infinity,
  softMin: Infinity,
};
const defaultDimenstions: Dimensions = { width: 800, height: 600 };

const defaultData = [
  { value: 40 },
  { value: 20 },
  { value: 50 },
  { value: 30 },
];

describe('SequentialScaleHelpers', () => {
  describe('Sequential Range', () => {
    it('Returns the range when it is explecitly defined in the scale definition', () => {
      const range = getSequentialScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100] },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 100]);
    });
    it('Deduces the range as the width when the scaleDefinition contains an Horizontal Direction', () => {
      const range = getSequentialScaleRange(
        {
          ...minimalDefinition,
          ...{ direction: Direction.HORIZONTAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 800]);
    });
    it('Deduces the range as the inverted height when the scaleDefinition contains an Horizontal Direction', () => {
      const range = getSequentialScaleRange(
        {
          ...minimalDefinition,
          ...{ direction: Direction.VERTICAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([600, 0]);
    });
    it('Returns the fallback range when the scaleDefinition does not allow to deduce the range', () => {
      const rangeWithDefaultFallback = getSequentialScaleRange(
        {
          ...minimalDefinition,
        },
        defaultDimenstions
      );
      // Default fallback range is [0, 1]
      expect(rangeWithDefaultFallback).toEqual([0, 1]);

      const rangeWithConstumFallback = getSequentialScaleRange(
        {
          ...minimalDefinition,
        },
        defaultDimenstions,
        [1, 100]
      );
      expect(rangeWithConstumFallback).toEqual([1, 100]);
    });

    it('Ensure that explicit range take precedence over any deduction', () => {
      const range = getSequentialScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100], direction: Direction.HORIZONTAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 100]);
    });

    it('Reverse the range when reverse is set to true on the scaleDefinition', () => {
      const range = getSequentialScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100], reverse: true },
        },
        defaultDimenstions
      );
      expect(range).toEqual([100, 0]);
    });
  });

  describe('Sequential Domain', () => {
    it('Returns the domain when it is explecitly defined in the scale definition', () => {
      const domain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domain: [0, 100] },
        },
        defaultData
      );
      expect(domain).toEqual([0, 100]);
    });
    it('Deduces the domain from the data when a domainKey is set and found in the data', () => {
      const domain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value' },
        },
        defaultData
      );
      expect(domain).toEqual([20, 50]);
    });
    it("Tries to deduces the domain from each datum's first numeric value when a domainKey is set but not found in the data", () => {
      const domainOfWellStructredData = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'non existant domainKey' },
        },
        defaultData
      );
      expect(domainOfWellStructredData).toEqual([20, 50]);
      const domainOfAmbigousData = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'non existant domainKey' },
        },
        // the attribute v will be considered for v:100 as it occures before value: 40
        // but v: 0 will not be considered as it exists after value: 40
        // thus max should be 100 while min should remain the same
        [...defaultData, { v: 100, value: 40 }, { value: 40, v: 0 }]
      );
      expect(domainOfAmbigousData).toEqual([20, 100]);
    });
    it('Resolves to 0 when it is not possible to deduce the domain from data and domainKey is provided but not valid', () => {
      const domain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'non valid' },
        },
        // domain of default data is [20, 50], the unvalid domainKey and unvalid datum will drop a 0 and the domain will become [0, 50]
        [...defaultData, { value: 'not a number' }]
      );
      expect(domain).toEqual([0, 50]);
    });

    it('Resolves to 0 when it is not possible to deduce the domain from data and domainKey is provided and valid', () => {
      const domain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value' },
        },
        // domain of default data is [20, 50], the unvalid datum will drop a 0 and the domain will become [0, 50]
        [...defaultData, { value: 'not a number' }]
      );
      expect(domain).toEqual([0, 50]);
    });

    it('Considers soft limits when computing domain from data', () => {
      const domainWithLowSoftMaxLimit = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMax: 40 },
        },
        // domain of default data is [20, 50], softMax is 40 so domain will not change
        defaultData
      );
      expect(domainWithLowSoftMaxLimit).toEqual([20, 50]);

      const domainWithHighSoftMaxLimit = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMax: 100 },
        },
        // domain of default data is [20, 50], softMax is 100 so domain will change to [20, 100]
        defaultData
      );
      expect(domainWithHighSoftMaxLimit).toEqual([20, 100]);

      const domainWithLowSoftMinLimit = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMin: 0 },
        },
        // domain of default data is [20, 50], softMin is 0 so domain will change to [0, 50]
        defaultData
      );
      expect(domainWithLowSoftMinLimit).toEqual([0, 50]);

      const domainWithHighSoftMinLimit = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMin: 100 },
        },
        // domain of default data is [20, 50], softMin is 30 so so domain will not change
        defaultData
      );
      expect(domainWithHighSoftMinLimit).toEqual([20, 50]);
    });

    it('Adds paddings when computing domain from data', () => {
      const domainWithMaxPadded = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', maxPadding: 5 },
        },
        // domain of default data is [20, 50], with a maxPadding of 5 so domain will change to [20, 55]
        defaultData
      );
      expect(domainWithMaxPadded).toEqual([20, 55]);

      const domainWithMinPadded = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', minPadding: 5 },
        },
        // domain of default data is [20, 50], with a minPadding of 5 so domain will change to [15, 50]
        defaultData
      );
      expect(domainWithMinPadded).toEqual([15, 50]);

      const domainWithBothPaddings = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', maxPadding: 5, minPadding: 5 },
        },
        // domain of default data is [20, 50], with both paddings of 5 so domain will change to [15, 55]
        defaultData
      );
      expect(domainWithBothPaddings).toEqual([15, 55]);
    });

    it('Gives hard limits priority on the calculated domain', () => {
      const domainWithHardMax = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', max: 60 },
        },
        defaultData
      );
      expect(domainWithHardMax).toEqual([20, 60]);

      const domainWithHardMin = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', min: 10 },
        },
        defaultData
      );
      expect(domainWithHardMin).toEqual([10, 50]);

      const domain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ min: 0, max: 100 },
        },
        defaultData
      );
      expect(domain).toEqual([0, 100]);
    });

    it("Ignores other domain's modifier when hard limits are set", () => {
      const domainWithHardAndSoftMax = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', max: 60, softMax: 70 },
        },
        defaultData
      );
      // hard max is 60 so domain will not change to [20, 70] even that softMax is 70
      expect(domainWithHardAndSoftMax).toEqual([20, 60]);

      const domainWithHardMinAndPadding = getSequentialScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', min: 10, minPadding: 5 },
        },
        defaultData
      );
      // hard min is 10 so domain will not change to [5, 50] even that minPadding is 5
      expect(domainWithHardMinAndPadding).toEqual([10, 50]);
    });

    it('Returns the fallback domain when the scaleDefinition and data does not allow to deduce the domain', () => {
      const defaultFallbackDomain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
        },
        defaultData
      );
      // [0, 1] being the default fallback domain
      expect(defaultFallbackDomain).toEqual([0, 1]);

      const customFallbackDomain = getSequentialScaleDomain(
        {
          ...minimalDefinition,
        },
        defaultData,
        [1, 100]
      );
      expect(customFallbackDomain).toEqual([1, 100]);
    });
  });
  describe('Scale configuration', () => {
    it('Sets the range and return the same inputed scale', () => {
      // initial scale will be of domain [0, 100] and its range would be usually passed as [0, 100]
      const initialScale: ScaleSequential<number, number> = scaleSequential(
        [0, 100],
        [0, 100]
      );
      const scale = configureSequentialScale(initialScale, {
        ...minimalDefinition,
      });
      expect(scale).toEqual(initialScale);
      expect(scale.range()).toEqual([0, 100]);
      expect(scale(50)).toEqual(50);
      expect(initialScale(50)).toEqual(50);
      /** laying truth foundation for later tests */
      // with range round attribute set in scale definition this would be 50
      expect(scale(49.9)).toEqual(49.9);
      // @ts-ignore - with unknown attribute set in scale definition this will return the unknown value
      expect(scale(undefined)).toEqual(undefined);
      // with clamping set in scale definition this would be 100
      expect(scale(200)).toEqual(200);
    });
    it('Sets a rounded range when rangeRound is true in the scaleDefinition', () => {
      // initial scale will be of domain [0, 100] and its range would be usually passed as [0, 100]
      const initialScale: ScaleSequential<number, number> = scaleSequential(
        [0, 100],
        [0, 100]
      );
      const scale = configureSequentialScale(initialScale, {
        ...minimalDefinition,
        ...{ roundRange: true },
      });
      expect(scale.range()).toEqual([0, 100]);
      // 49.9 would return 50 when range is rounded
      expect(scale(49.9)).toEqual(50);
    });
    it('Sets a fallback value to be used when scale fails to resolve, that value is configured via the unknown attribute', () => {
      // initial scale will be of domain [0, 100] and its range would be usually passed as [0, 100]
      const initialScale: ScaleSequential<number, number> = scaleSequential(
        [0, 100],
        [0, 100]
      );
      const scale = configureSequentialScale(initialScale, {
        ...minimalDefinition,
        ...{ unknown: 12.34 },
      });
      // @ts-ignore
      expect(scale(undefined)).toEqual(12.34);
    });

    it("Caps the scale's resolved value to range limits, when clamp is set to true in the definition", () => {
      // initial scale will be of domain [0, 100] and its range would be usually passed as [0, 100]
      const initialScale: ScaleSequential<number, number> = scaleSequential(
        [0, 100],
        [0, 100]
      );
      const scale = configureSequentialScale(initialScale, {
        ...minimalDefinition,
        ...{ clamp: true },
      });
      expect(scale(200)).toEqual(100);
      expect(scale(-200)).toEqual(0);
    });
  });
});
