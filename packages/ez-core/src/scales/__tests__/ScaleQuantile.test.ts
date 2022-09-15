import D3ScaleQuantile from '../ScaleQuantile';
import { Direction } from '../../types';
import { ArrayOfTwoOrMoreNumbers } from '../types';

const defaultData = [40, 20, 50, 30, 80, 100] as ArrayOfTwoOrMoreNumbers;
describe('ScaleQuantile', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0-1', () => {
    const quantile = new D3ScaleQuantile({
      direction: Direction.HORIZONTAL,
    });
    quantile.setDimensions({ width: 800, height: 210 });

    expect(quantile).toBeDefined();
    expect(quantile.scale).toBeDefined();

    expect(quantile.scale.domain()).toEqual([]);
    expect(quantile.scale.range()).toEqual([0, 800]);
  });
});
describe('QuantileScale domain', () => {
  it('Deduces the domain from the data when a domainKey is set and found in the data', () => {
    const quantile = new D3ScaleQuantile({
      ...{ domainKey: 'value' },
    });
    quantile.setData([{ value: 20 }, { value: 50 }]);
    expect(quantile.scale.domain()).toEqual([20, 50]);
  });

  it('Resolves to 0 when it is not possible to deduce the domain from data and domainKey is provided but not valid', () => {
    const domain = new D3ScaleQuantile({
      ...{ domainKey: 'value' },
    });
    domain.setData([{ value: 'not a number' }, { value: 50 }]);
    expect(domain.scale.domain()).toEqual([0, 50]);
  });
  it('Returns the domain when it is explecitly defined in the scale definition', () => {
    const quantile = new D3ScaleQuantile({
      range: ['red', 'green', 'yellow'],
      domain: [0, 100],
      domainKey: 'value',
    });
    quantile.setData([{ value: 20 }, { value: 50 }]);
    expect(quantile.scale.domain()).toEqual([0, 100]);
  });
  it('Considers soft limits when computing domain from data', () => {
    const domainWithLowSoftMaxLimit = new D3ScaleQuantile({
      ...{ domainKey: 'value', softMax: 40 },
    });
    domainWithLowSoftMaxLimit.setData([{ value: 20 }, { value: 50 }]);
    // domain of  data is [20, 50], softMax is 40 so domain will not change
    expect(domainWithLowSoftMaxLimit.scale.domain()).toEqual([20, 50]);
  });

  it('Adds paddings when computing domain from data', () => {
    const domainWithMaxPadded = new D3ScaleQuantile(
      {
        ...{ domainKey: 'value', maxPadding: 5 },
      }
      // domain of default data is [20, 50], with a maxPadding of 5 so domain will change to [20, 55]
    );
    domainWithMaxPadded.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithMaxPadded.scale.domain()).toEqual([20, 55]);

    const domainWithMinPadded = new D3ScaleQuantile(
      {
        ...{ domainKey: 'value', minPadding: 5 },
      }
      // domain of default data is [20, 50], with a minPadding of 5 so domain will change to [15, 50]
    );
    domainWithMinPadded.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithMinPadded.scale.domain()).toEqual([15, 50]);

    const domainWithBothPaddings = new D3ScaleQuantile(
      {
        ...{ domainKey: 'value', maxPadding: 5, minPadding: 5 },
      }
      // domain of default data is [20, 50], with both paddings of 5 so domain will change to [15, 55]
    );
    domainWithBothPaddings.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithBothPaddings.scale.domain()).toEqual([15, 55]);
  });

  it('Gives hard limits priority on the calculated domain', () => {
    const domainWithHardMax = new D3ScaleQuantile({
      ...{ domainKey: 'value', max: 60 },
    });
    domainWithHardMax.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithHardMax.scale.domain()).toEqual([20, 60]);

    const domainWithHardMin = new D3ScaleQuantile({
      ...{ domainKey: 'value', min: 10 },
    });
    domainWithHardMin.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithHardMin.scale.domain()).toEqual([10, 50]);

    const domain = new D3ScaleQuantile({
      ...{ domainKey: 'value', min: 10, max: 100 },
    });
    domain.setData([{ value: 20 }, { value: 50 }]);

    expect(domain.scale.domain()).toEqual([10, 100]);
  });

  it("Ignores other domain's modifier when hard limits are set", () => {
    const domainWithHardAndSoftMax = new D3ScaleQuantile({
      ...{ domainKey: 'value', max: 60, softMax: 70 },
    });
    domainWithHardAndSoftMax.setData([{ value: 20 }, { value: 50 }]);

    // hard max is 60 so domain will not change to [20, 70] even that softMax is 70
    expect(domainWithHardAndSoftMax.scale.domain()).toEqual([20, 60]);

    const domainWithHardMinAndPadding = new D3ScaleQuantile({
      ...{ domainKey: 'value', min: 10, minPadding: 5 },
    });
    domainWithHardMinAndPadding.setData([{ value: 20 }, { value: 50 }]);

    // hard min is 10 so domain will not change to [5, 50] even that minPadding is 5
    expect(domainWithHardMinAndPadding.scale.domain()).toEqual([10, 50]);
  });

  it('Returns the fallback domain when the scaleDefinition and data does not allow to deduce the domain', () => {
    const defaultFallbackDomain = new D3ScaleQuantile();
    // [] being the default fallback domain
    expect(defaultFallbackDomain.scale.domain()).toEqual([]);
  });
});
describe('QuantileScale range', () => {
  it('Builds the range from dimentions', () => {
    const quantile = new D3ScaleQuantile({
      domain: [0, 100],
      direction: Direction.HORIZONTAL,
    });

    quantile.setDimensions({ width: 300, height: 210 });

    expect(quantile.scale.range()).toEqual([0, 300]);
    expect(quantile.scale(0)).toEqual(0);
    expect(quantile.scale(50)).toEqual(300);

    quantile.appendDefinition({ direction: Direction.VERTICAL });
    expect(quantile.scale.range()).toEqual([210, 0]);
    expect(quantile.scale(30)).toEqual(210);
    expect(quantile.scale(50)).toEqual(0);
  });
  it('Returns the fallback range when the scaleDefinition and data does not allow to deduce the domain', () => {
    const defaultFallbackRange = new D3ScaleQuantile();
    // [ ] being the default fallback range
    expect(defaultFallbackRange.scale.range()).toEqual([]);
  });
});
describe('QuantileScale', () => {
  it('Generates a new computed scale when user definition changes', () => {
    const quantile = new D3ScaleQuantile();
    quantile.setDefinition({ range: [0, 50] });
    expect(quantile.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const quantile = new D3ScaleQuantile({
      domain: defaultData,
      range: ['red', 'green', 'yellow'],
    });

    // With a domain [0, 100] and range ['red', 'green', 'yellow']
    // an input value 0 should be result on an output of red
    // an input value 30 should be result on an output of red
    // an input value 34 should be result on an output of red
    // an input value 50 should be result on an output of red
    // an input value 67 should be result on an output of yellow
    // an input value 100 should be result on an output of yellow
    // the quantile scale uses range's cardinality to determine the number of quantiles that are computed
    expect(quantile.scale(0)).toEqual('red');
    expect(quantile.scale(30)).toEqual('red');
    expect(quantile.scale(34)).toEqual('red');
    expect(quantile.scale(50)).toEqual('green');
    expect(quantile.scale(67)).toEqual('yellow');
    expect(quantile.scale(100)).toEqual('yellow');
  });

  it('Sets the range and return the same inputed scale', () => {
    // initial scale will be of domain [0, 100] and its range would be usually passed as ['red', 'green', 'yellow']
    const quantile = new D3ScaleQuantile({
      domain: defaultData,
      range: ['red', 'green', 'yellow'],
    });
    expect(quantile.scale.range()).toEqual(['red', 'green', 'yellow']);
    expect(quantile.scale(100)).toEqual('yellow');

    /** laying truth foundation for later tests */
    // @ts-ignore - with unknown attribute set in scale definition this will return the unknown value
    expect(quantile.scale(undefined)).toEqual(undefined);
    expect(quantile.scale(200)).toEqual('yellow');
  });
  it('Sets a fallback value to be used when scale fails to resolve, that value is configured via the unknown attribute', () => {
    // initial scale will be of domain [0, 100] and its range its range would be usually passed as ['red' , 'green']
    const quantile = new D3ScaleQuantile({
      range: ['rain', 'bow'],
      domain: [1.23, 98.76],
      ...{ unknown: 12.34 },
    });
    // @ts-ignore
    expect(quantile.scale(undefined)).toEqual(12.34);
  });
});
