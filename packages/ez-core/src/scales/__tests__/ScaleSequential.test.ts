import SaleSequential from '../ScaleSequential';

describe('ScaleSequential', () => {
  it('Instanciate and computes with 0 config with a range of 0 - 800 (width) and a domain of 0 - 1', () => {
    const sequential = new SaleSequential();
    expect(sequential).toBeDefined();
    expect(sequential.scale).toBeDefined();

    expect(sequential.scale.domain()).toEqual([0, 1]);
    expect(sequential.scale.range()).toEqual([0, 800]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const sequential = new SaleSequential();

    sequential.setDefinition({ range: [0, 50] });
    expect(sequential.scale.range()).toEqual([0, 50]);
  });

  it('Outputs the scaled value (from the computed scale)', () => {
    const sequential = new SaleSequential({
      domain: [0, 10],
      range: [0, 100],
    });

    // With a domain [0, 10] and range [0, 100]
    // an input value 0 should be result on an output of 0
    // an input value 1 should be result on an output of 10
    // an input value 5 should be result on an output of 50
    // output can be out of the range boundaries as clamping is not applied
    expect(sequential.scale(5)).toEqual(50);
    expect(sequential.scale(10)).toEqual(100);
    expect(sequential.scale(15)).toEqual(150);
    expect(sequential.scale(-5)).toEqual(-50);
  });
});
