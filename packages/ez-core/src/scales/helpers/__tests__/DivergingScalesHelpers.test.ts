import { scaleDiverging } from 'd3-scale';
import { Direction, Dimensions } from '../../../types';
import { DivergingsScaleMinimalDefinition } from '../../types';
import {
  getDivergingScaleRange,
  getDivergingScaleDomain,
  configureDivergingScale,
} from '..';

const minimalDefinition: DivergingsScaleMinimalDefinition = {
  reverse: false,
  roundRange: false,
  clamp: false,
  maxPadding: 0,
  minPadding: 0,
  softMax: -Infinity,
  softMin: Infinity,
};

const defaultDimenstions: Dimensions = { width: 800, height: 600 };

// Data would generate domain [5, 30, 50], when domainKey is set to 'value'
const defaultData = [
  { value: 40 },
  { value: 20 },
  { value: 50 },
  { value: 30 },
  { value: 5 },
];

describe('DivergingScaleHelpers', () => {
  describe('Diverging Range', () => {
    it('Returns the range when it is explecitly defined in the scale definition', () => {
      const range = getDivergingScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 40, 100] },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 40, 100]);
    });

    it('Return always 3 element array as a range', () => {
      const range = getDivergingScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100] },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 50, 100]);
    });

    it('Deduces the range as the width when the scaleDefinition contains an Horizontal Direction', () => {
      const range = getDivergingScaleRange(
        {
          ...minimalDefinition,
          ...{ direction: Direction.HORIZONTAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 400, 800]);
    });

    it('Deduces the range as the inverted height when the scaleDefinition contains an Horizontal Direction', () => {
      const range = getDivergingScaleRange(
        {
          ...minimalDefinition,
          ...{ direction: Direction.VERTICAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([600, 300, 0]);
    });

    it('Returns the fallback range when the range can not be deduced', () => {
      const defaultFallbackRange = getDivergingScaleRange(
        {
          ...minimalDefinition,
        },
        defaultDimenstions
      );
      // [0, 1] being the default fallback range
      expect(defaultFallbackRange).toEqual([0, 0.5, 1]);

      const customFallbackRange = getDivergingScaleRange(
        {
          ...minimalDefinition,
        },
        defaultDimenstions,
        [0, 30, 100]
      );
      expect(customFallbackRange).toEqual([0, 30, 100]);
    });

    it('Reverse the range', () => {
      const range = getDivergingScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 40, 100], reverse: true },
        },
        defaultDimenstions
      );
      expect(range).toEqual([100, 40, 0]);
    });
  });

  describe('Diverging Domain', () => {
    it('Returns the domain when it is explecitly defined in the scale definition', () => {
      const domain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domain: [0, 50, 100] },
        },
        []
      );
      expect(domain).toEqual([0, 50, 100]);
    });

    it('Computes the domain when from hard limits when both are provided', () => {
      const domain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 0,
          max: 100,
        },
        []
      );
      expect(domain).toEqual([0, 50, 100]);
    });

    it("Computes the domain's center as 0 when it is within the domain's bounds", () => {
      const domain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: -30,
          max: 100,
        },
        []
      );
      expect(domain).toEqual([-30, 0, 100]);
    });

    it('Inserts domain center in the right order when provided', () => {
      const ascendentDomainWithCenterWithinBounds = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 0,
          max: 100,
          center: 30,
        },
        []
      );
      expect(ascendentDomainWithCenterWithinBounds).toEqual([0, 30, 100]);

      const descendentDomainWithCenterWithinBounds = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 100,
          max: 0,
          center: 30,
        },
        []
      );
      expect(descendentDomainWithCenterWithinBounds).toEqual([100, 30, 0]);

      const ascendentDomainWithCenterAboveBounds = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 0,
          max: 100,
          center: 130,
        },
        []
      );
      expect(ascendentDomainWithCenterAboveBounds).toEqual([0, 100, 130]);

      const descendentDomainWithCenterAboveBounds = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 100,
          max: 0,
          center: 130,
        },
        []
      );
      expect(descendentDomainWithCenterAboveBounds).toEqual([130, 100, 0]);

      const ascendentDomainWithCenterBellowBounds = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 0,
          max: 100,
          center: -130,
        },
        []
      );
      expect(ascendentDomainWithCenterBellowBounds).toEqual([-130, 0, 100]);

      const descendentDomainWithCenterBellowBounds = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 100,
          max: 0,
          center: -130,
        },
        []
      );
      expect(descendentDomainWithCenterBellowBounds).toEqual([100, 0, -130]);
    });

    it('Sets a 3 elements domain of same value when hard limits are equals', () => {
      const domain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          min: 100,
          max: 100,
        },
        []
      );
      expect(domain).toEqual([100, 100, 100]);
    });

    it('Deduces the domain from the data when a domainKey is set and found in the data with the center being relative to data', () => {
      const domain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value' },
        },
        defaultData
      );
      expect(domain).toEqual([5, 30, 50]);
    });

    it('Considers soft limits when computing domain from data', () => {
      const domainWithLowSoftMaxLimit = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMax: 40 },
        },
        // domain of default data is [5, 30, 50], softMax is 40 so domain will not change
        defaultData
      );
      expect(domainWithLowSoftMaxLimit).toEqual([5, 30, 50]);

      const domainWithHighSoftMinLimit = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMin: 100 },
        },
        // domain of default data is [5, 30, 50], softMin is 100 so so domain will not change
        defaultData
      );
      expect(domainWithHighSoftMinLimit).toEqual([5, 30, 50]);

      const domainWithHighSoftMaxLimit = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMax: 100 },
        },
        // domain of default data is [5, 30, 50], softMax is 100 so domain will change to [5, 30, 100]
        defaultData
      );
      expect(domainWithHighSoftMaxLimit).toEqual([5, 30, 100]);

      const domainWithHighSoftMaxLimitCrossingZero = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMax: 100 },
        },
        // domain of default data is [-50, -30, -5], softMax is 100 so domain will change to [-50, 0, 100]
        // as the center should be 0 because both domain's extents are of different signs
        [
          { value: -40 },
          { value: -20 },
          { value: -50 },
          { value: -30 },
          { value: -5 },
        ]
      );
      expect(domainWithHighSoftMaxLimitCrossingZero).toEqual([-50, 0, 100]);

      const domainWithLowSoftMinLimit = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMin: 2 },
        },
        // domain of default data is [5, 30, 50], softMin is -5 so domain will change to [2, 0, 50]
        defaultData
      );
      expect(domainWithLowSoftMinLimit).toEqual([2, 30, 50]);

      const domainWithLowSoftMinLimitCrossingZero = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', softMin: -5 },
        },
        // domain of default data is [5, 30, 50], softMin is -5 so domain will change to [-5, 0, 50]
        // as the center should be 0 because both domain's extents are of different signs
        defaultData
      );
      expect(domainWithLowSoftMinLimitCrossingZero).toEqual([-5, 0, 50]);
    });

    it('Adds paddings when computing domain from data', () => {
      const domainWithMaxPadded = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', maxPadding: 5 },
        },
        // domain of default data is [5, 30, 50]
        defaultData
      );
      expect(domainWithMaxPadded).toEqual([5, 30, 55]);

      const domainWithMinPadded = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', minPadding: 5 },
        },
        // domain of default data is [5, 30, 50]
        defaultData
      );
      expect(domainWithMinPadded).toEqual([0, 30, 50]);

      const domainWithBothPaddings = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', maxPadding: 10, minPadding: 10 },
        },
        // domain of default data is [5, 30, 50]
        defaultData
      );
      expect(domainWithBothPaddings).toEqual([-5, 0, 60]);
    });

    it("Tries to deduces the domain from each datum's first numeric value when a domainKey is set but not found in the data", () => {
      const domainOfWellStructredData = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'non existant domainKey' },
        },
        defaultData
      );
      expect(domainOfWellStructredData).toEqual([5, 30, 50]);

      const domainOfAmbigousData = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'non existant domainKey' },
        },
        // the attribute v will be considered for v:100 as it occures before value: 40
        // but v: 0 will not be considered as it exists after value: 40
        // thus max should be 100 while min should remain the same
        [...defaultData, { v: 100, value: 40 }, { value: 40, v: 0 }]
      );
      expect(domainOfAmbigousData).toEqual([5, 40, 100]);

      const domainWithNonFiniteData = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'non existant domainKey' },
        },
        [{ value: 9 }, {}, {}, { value: 3 }]
      );
      expect(domainWithNonFiniteData).toEqual([3, 6, 9]);
    });

    it('Gives hard limits priority on the calculated domain', () => {
      const domainWithHardMax = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', max: 60 },
        },
        defaultData
      );
      expect(domainWithHardMax).toEqual([5, 30, 60]);

      const domainWithHardMin = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', min: 10 },
        },
        defaultData
      );
      expect(domainWithHardMin).toEqual([10, 30, 50]);

      const domain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ min: 0, max: 100 },
        },
        defaultData
      );
      expect(domain).toEqual([0, 50, 100]);
    });

    it("Ignores other domain's modifier when hard limits are set", () => {
      const domainWithHardAndSoftMax = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', max: 60, softMax: 70 },
        },
        defaultData
      );
      // hard max is 60 so domain will not change to [5, 30, 70] even that softMax is 70
      expect(domainWithHardAndSoftMax).toEqual([5, 30, 60]);

      const domainWithHardMinAndPadding = getDivergingScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'value', min: 10, minPadding: 5 },
        },
        defaultData
      );
      // hard min is 10 so domain will not change to [0, 30, 50] even that minPadding is 5
      expect(domainWithHardMinAndPadding).toEqual([10, 30, 50]);
    });

    it('Returns the fallback domain when the scaleDefinition and data does not allow to deduce the domain', () => {
      const defaultFallbackDomain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
        },
        defaultData
      );
      // [0, 0.5, 1] being the default fallback domain
      expect(defaultFallbackDomain).toEqual([0, 0.5, 1]);

      const customFallbackDomain = getDivergingScaleDomain(
        {
          ...minimalDefinition,
        },
        defaultData,
        [0, 100]
      );
      expect(customFallbackDomain).toEqual([0, 50, 100]);
    });
  });

  describe('Diverging Scale configuration', () => {
    it('Sets a rounded range when rangeRound is true in the scaleDefinition', () => {
      const initialScale = scaleDiverging([0.2, 50, 99.6], [0, 50, 100]);
      const scale = configureDivergingScale(initialScale, {
        ...minimalDefinition,
        roundRange: true,
      });

      expect(scale(49.6)).toEqual(50);
    });

    it('Sets a fallback value to be used when scale fails to resolve, that value is configured via the unknown attribute', () => {
      const initialScale = scaleDiverging([0, 50, 100], [0, 50, 100]);
      const scale = configureDivergingScale(initialScale, {
        ...minimalDefinition,
        unknown: -1,
      });

      // @ts-ignore
      expect(scale('c')).toEqual(-1);
    });

    it("Caps the scale's resolved value to range limits, when clamp is set to true in the definition", () => {
      const initialScale = scaleDiverging([0, 50, 100], [0, 50, 100]);
      const scale = configureDivergingScale(initialScale, {
        ...minimalDefinition,
        clamp: true,
      });

      expect(scale(110)).toEqual(100);
      expect(scale(-10)).toEqual(0);
    });
  });
});
