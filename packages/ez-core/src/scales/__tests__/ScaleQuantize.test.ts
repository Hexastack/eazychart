import D3ScaleQuantize from '../ScaleQuantize';
import { Direction } from '../../types';

describe('ScaleQuantile', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0-1', () => {
    const quantize = new D3ScaleQuantize();
    expect(quantize).toBeDefined();
    expect(quantize.scale).toBeDefined();

    expect(quantize.scale.domain()).toEqual([0, 1]);
    expect(quantize.scale.range()).toEqual([0, 800]);
  });
});

describe('QuantizeScale domain', () => {
  it('Deduces the domain from the data when a domainKey is set and found in the data', () => {
    const quantize = new D3ScaleQuantize({
      ...{ domainKey: 'value' },
    });
    quantize.setData([{ value: 20 }, { value: 50 }]);
    expect(quantize.scale.domain()).toEqual([20, 50]);
  });

  it('Resolves to 0 when it is not possible to deduce the domain from data and domainKey is provided but not valid', () => {
    const domain = new D3ScaleQuantize({
      ...{ domainKey: 'value' },
    });
    domain.setData([{ value: 'not a number' }, { value: 50 }]);
    expect(domain.scale.domain()).toEqual([0, 50]);
  });
  it('Returns the domain when it is explecitly defined in the scale definition', () => {
    const quantize = new D3ScaleQuantize({
      range: ['red', 'green', 'yellow'],
      domain: [0, 100],
      domainKey: 'value',
    });
    quantize.setData([{ value: 20 }, { value: 50 }]);
    expect(quantize.scale.domain()).toEqual([0, 100]);
  });
  it('Considers soft limits when computing domain from data', () => {
    const domainWithLowSoftMaxLimit = new D3ScaleQuantize({
      ...{ domainKey: 'value', softMax: 40 },
    });
    domainWithLowSoftMaxLimit.setData([{ value: 20 }, { value: 50 }]);
    // domain of  data is [20, 50], softMax is 40 so domain will not change
    expect(domainWithLowSoftMaxLimit.scale.domain()).toEqual([20, 50]);
  });

  it('Adds paddings when computing domain from data', () => {
    const domainWithMaxPadded = new D3ScaleQuantize(
      {
        ...{ domainKey: 'value', maxPadding: 5 },
      }
      // domain of default data is [20, 50], with a maxPadding of 5 so domain will change to [20, 55]
    );
    domainWithMaxPadded.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithMaxPadded.scale.domain()).toEqual([20, 55]);

    const domainWithMinPadded = new D3ScaleQuantize(
      {
        ...{ domainKey: 'value', minPadding: 5 },
      }
      // domain of default data is [20, 50], with a minPadding of 5 so domain will change to [15, 50]
    );
    domainWithMinPadded.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithMinPadded.scale.domain()).toEqual([15, 50]);

    const domainWithBothPaddings = new D3ScaleQuantize(
      {
        ...{ domainKey: 'value', maxPadding: 5, minPadding: 5 },
      }
      // domain of default data is [20, 50], with both paddings of 5 so domain will change to [15, 55]
    );
    domainWithBothPaddings.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithBothPaddings.scale.domain()).toEqual([15, 55]);
  });

  it('Gives hard limits priority on the calculated domain', () => {
    const domainWithHardMax = new D3ScaleQuantize({
      ...{ domainKey: 'value', max: 60 },
    });
    domainWithHardMax.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithHardMax.scale.domain()).toEqual([20, 60]);

    const domainWithHardMin = new D3ScaleQuantize({
      ...{ domainKey: 'value', min: 10 },
    });
    domainWithHardMin.setData([{ value: 20 }, { value: 50 }]);

    expect(domainWithHardMin.scale.domain()).toEqual([10, 50]);

    const domain = new D3ScaleQuantize({
      ...{ domainKey: 'value', min: 10, max: 100 },
    });
    domain.setData([{ value: 20 }, { value: 50 }]);

    expect(domain.scale.domain()).toEqual([10, 100]);
  });

  it("Ignores other domain's modifier when hard limits are set", () => {
    const domainWithHardAndSoftMax = new D3ScaleQuantize({
      ...{ domainKey: 'value', max: 60, softMax: 70 },
    });
    domainWithHardAndSoftMax.setData([{ value: 20 }, { value: 50 }]);

    // hard max is 60 so domain will not change to [20, 70] even that softMax is 70
    expect(domainWithHardAndSoftMax.scale.domain()).toEqual([20, 60]);

    const domainWithHardMinAndPadding = new D3ScaleQuantize({
      ...{ domainKey: 'value', min: 10, minPadding: 5 },
    });
    domainWithHardMinAndPadding.setData([{ value: 20 }, { value: 50 }]);

    // hard min is 10 so domain will not change to [5, 50] even that minPadding is 5
    expect(domainWithHardMinAndPadding.scale.domain()).toEqual([10, 50]);
  });

  it('Returns the fallback domain when the scaleDefinition and data does not allow to deduce the domain', () => {
    const defaultFallbackDomain = new D3ScaleQuantize();
    // [0, 1] being the default fallback domain
    expect(defaultFallbackDomain.scale.domain()).toEqual([0, 1]);
  });
});

it('Builds the range from dimentions', () => {
  const quantize = new D3ScaleQuantize({
    domain: [0, 100],
    direction: Direction.HORIZONTAL,
  });

  quantize.setDimensions({ width: 300, height: 210 });

  expect(quantize.scale.range()).toEqual([0, 300]);
  expect(quantize.scale(0)).toEqual(0);
  expect(quantize.scale(50)).toEqual(300);

  quantize.appendDefinition({ direction: Direction.VERTICAL });
  expect(quantize.scale.range()).toEqual([210, 0]);
  expect(quantize.scale(30)).toEqual(210);
  expect(quantize.scale(50)).toEqual(0);
});

describe('QuantizeScale', () => {
  it('Generates a new computed scale when user definition changes', () => {
    const quantize = new D3ScaleQuantize();
    quantize.setDefinition({ range: [0, 50] });
    expect(quantize.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const quantize = new D3ScaleQuantize({
      domain: [0, 100],
      range: ['red', 'green', 'yellow'],
    });

    // With a domain [0, 100] and range ['red', 'green', 'yellow']
    // an input value 0 should be result on an output of red
    // an input value 30 should be result on an output of red
    // an input value 34 should be result on an output of green
    // an input value 67 should be result on an output of yellow
    // an input value 100 should be result on an output of yellow

    expect(quantize.scale(0)).toEqual('red');
    expect(quantize.scale(30)).toEqual('red');
    expect(quantize.scale(34)).toEqual('green');
    expect(quantize.scale(67)).toEqual('yellow');
    expect(quantize.scale(100)).toEqual('yellow');
  });

  it('Sets the range and return the same inputed scale', () => {
    // initial scale will be of domain [0, 100] and its range would be usually passed as ['red', 'green', 'yellow']
    const quantize = new D3ScaleQuantize({
      domain: [0, 100],
      range: ['red', 'green', 'yellow'],
    });
    expect(quantize.scale.range()).toEqual(['red', 'green', 'yellow']);
    expect(quantize.scale(100)).toEqual('yellow');
    // with nice attribute set in scale definition the ticks would be nicer (contains more ticks - mainly 0 & 100)
    expect(quantize.scale.domain([1.23, 98.76]).ticks()).toEqual([
      10, 20, 30, 40, 50, 60, 70, 80, 90,
    ]);
    /** laying truth foundation for later tests */
    // @ts-ignore - with unknown attribute set in scale definition this will return the unknown value
    expect(quantize.scale(undefined)).toEqual(undefined);
    expect(quantize.scale(200)).toEqual('yellow');
  });
  it('Sets a fallback value to be used when scale fails to resolve, that value is configured via the unknown attribute', () => {
    // initial scale will be of domain [0, 100] and its range its range would be usually passed as ['red' , 'green']
    const quantize = new D3ScaleQuantize({
      range: ['rain', 'bow'],
      domain: [1.23, 98.76],
      ...{ unknown: 12.34 },
    });
    // @ts-ignore
    expect(quantize.scale(undefined)).toEqual(12.34);
  });
  it('Changes the ticks when the nice attribute exists in the scale definition and is not 0', () => {
    // initial scale will be of domain [1.23, 98.76] and its range would be  passed as ['rain' , 'bow']
    const quantize = new D3ScaleQuantize({
      domain: [1.23, 98.76],
      nice: 4,
    });
    expect(quantize.scale.ticks()).toEqual([
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    ]);
  });
});
