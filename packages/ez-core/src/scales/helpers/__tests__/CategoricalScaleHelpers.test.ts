import { scalePoint } from 'd3-scale';
import { Direction, Dimensions } from '../../../types';
import { CategoricalScaleMinimalDefinition, StringLike } from '../../types';
import {
  getCategoricalScaleRange,
  getCategoricalScaleDomain,
  configureCategoricalScale,
} from '..';

const minimalDefinition: CategoricalScaleMinimalDefinition = {
  reverse: false,
  roundRange: false,
  round: false,
  padding: 0,
  align: 0.5,
};

const defaultDimenstions: Dimensions = { width: 800, height: 600 };

const defaultData = [
  { category: 'Rock' },
  { category: 'Pop' },
  { category: 'R&B' },
];

describe('CategoricalScaleHelpers', () => {
  describe('Categorical Range', () => {
    it('Returns the range when it is explecitly defined in the scale definition', () => {
      const range = getCategoricalScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100] },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 100]);
    });

    it('Deduces the range as the width when the scaleDefinition contains an Horizontal Direction', () => {
      const range = getCategoricalScaleRange(
        {
          ...minimalDefinition,
          ...{ direction: Direction.HORIZONTAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 800]);
    });

    it('Deduces the range as the inverted height when the scaleDefinition contains an Horizontal Direction', () => {
      const range = getCategoricalScaleRange(
        {
          ...minimalDefinition,
          ...{ direction: Direction.VERTICAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([600, 0]);
    });

    it('Returns the fallback range when the scaleDefinition does not allow to deduce the range', () => {
      const rangeWithDefaultFallback = getCategoricalScaleRange(
        {
          ...minimalDefinition,
        },
        defaultDimenstions
      );
      // Default fallback range is [0, 1]
      expect(rangeWithDefaultFallback).toEqual([0, 1]);

      const rangeWithConstumFallback = getCategoricalScaleRange(
        {
          ...minimalDefinition,
        },
        defaultDimenstions,
        [1, 100]
      );
      expect(rangeWithConstumFallback).toEqual([1, 100]);
    });

    it('Ensure that explicit range take precedence over any deduction', () => {
      const range = getCategoricalScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100], direction: Direction.HORIZONTAL },
        },
        defaultDimenstions
      );
      expect(range).toEqual([0, 100]);
    });

    it('Reverse the range when reverse is set to true on the scaleDefinition', () => {
      const range = getCategoricalScaleRange(
        {
          ...minimalDefinition,
          ...{ range: [0, 100], reverse: true },
        },
        defaultDimenstions
      );
      expect(range).toEqual([100, 0]);
    });
  });

  describe('Categorical Domain', () => {
    it('Returns the domain when it is explecitly defined in the scale definition', () => {
      const domain = getCategoricalScaleDomain(
        {
          ...minimalDefinition,
          ...{ domain: ['A', 'C', 'B'] },
        },
        []
      );
      expect(domain).toEqual(['A', 'C', 'B']);
    });

    it('Computes the domain from the data', () => {
      const domain = getCategoricalScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'category' },
        },
        defaultData
      );
      expect(domain).toEqual(['Rock', 'Pop', 'R&B']);
    });

    it('Computes the domain from the data without repetition', () => {
      const domain = getCategoricalScaleDomain(
        {
          ...minimalDefinition,
          ...{ domainKey: 'category' },
        },
        [...defaultData, ...[{ category: 'HipHop' }, { category: 'HipHop' }]]
      );
      expect(domain).toEqual(['Rock', 'Pop', 'R&B', 'HipHop']);
    });

    it('Falls back to an empty domain if no data and domain is provided', () => {
      const domain = getCategoricalScaleDomain(
        {
          ...minimalDefinition,
        },
        []
      );
      expect(domain).toEqual([]);
    });
  });

  describe('Categorical Scale configuration', () => {
    it('Sets the default align, round and padding', () => {
      const initialScale = scalePoint(
        ['A', 'C', 'B'] as Array<StringLike>,
        [0, 100]
      );
      const scale = configureCategoricalScale(initialScale, minimalDefinition);
      expect(scale.align()).toEqual(0.5);
      expect(scale.round()).toEqual(false);
      expect(scale.padding()).toEqual(0);
    });

    it('Sets custom align, round and padding', () => {
      const initialScale = scalePoint(
        ['A', 'C', 'B'] as Array<StringLike>,
        [0, 100]
      );
      const scale = configureCategoricalScale(initialScale, {
        ...minimalDefinition,
        align: 0.6,
        padding: 0.2,
      });
      expect(scale.align()).toEqual(0.6);
      expect(scale.round()).toEqual(false);
      expect(scale.padding()).toEqual(0.2);
    });

    it('Sets custom align, round and padding', () => {
      const initialScale = scalePoint(
        ['A', 'C', 'B'] as Array<StringLike>,
        [0, 100]
      );
      const scale = configureCategoricalScale(initialScale, {
        ...minimalDefinition,
        align: 0.6,
        padding: 0.2,
      });
      expect(scale.align()).toEqual(0.6);
      expect(scale.round()).toEqual(false);
      expect(scale.padding()).toEqual(0.2);
    });

    it('Sets a rounded range when rangeRound is true in the scaleDefinition', () => {
      const initialScale = scalePoint(
        ['A', 'C', 'B'] as Array<StringLike>,
        [0.2, 99.6]
      );
      expect(initialScale('C')).toEqual(49.9);

      const scale = configureCategoricalScale(initialScale, {
        ...minimalDefinition,
        ...{ roundRange: true },
      });
      expect(scale.range()).toEqual([0.2, 99.6]);
      // inputing 'C' without raounding would result on 49.9
      expect(scale('C')).toEqual(50);
    });

    it('Supports unknown values', () => {
      const initialScale = scalePoint(
        ['A', 'C', 'B'] as Array<StringLike>,
        [0, 100]
      );
      expect(initialScale('D')).toEqual(undefined);
      // @ts-ignore `unknown` does not exist on d3 categorical scales
      // the next test just confirms it and keeps an eye that it remains the case
      // when it fails it means categorical scales started supporting unknown on
      // d3 at which point we would just use it
      expect(initialScale.unknwon).not.toBeDefined();

      const scale = configureCategoricalScale(initialScale, {
        ...minimalDefinition,
        ...{ unknown: 70 },
      });
      expect(scale('D')).toEqual(70);
    });
  });
});
