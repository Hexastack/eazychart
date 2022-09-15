import D3ScaleIdentity from '../ScaleIdentity';

describe('ScaleIdentity', () => {
  it('Instanciate and computes with 0 config with a range and a domain of 0 - 1', () => {
    const identity = new D3ScaleIdentity();
    expect(identity).toBeDefined();
    expect(identity.scale).toBeDefined();

    expect(identity.scale.domain()).toEqual([0, 1]);
    expect(identity.scale.range()).toEqual([0, 1]);
  });

  it('Generates a new computed scale when user definition changes', () => {
    const identity = new D3ScaleIdentity();

    identity.setDefinition({ range: [0, 50] });
    expect(identity.scale.domain()).toEqual([0, 50]);
    expect(identity.scale.range()).toEqual([0, 50]);
  });

  it('Sets the same range and domain when only one of them is provided', () => {
    let identity = new D3ScaleIdentity({ range: [0, 50] });
    expect(identity.scale.domain()).toEqual([0, 50]);
    expect(identity.scale.range()).toEqual([0, 50]);

    identity = new D3ScaleIdentity({ domain: [0, 10] });
    expect(identity.scale.domain()).toEqual([0, 10]);
    expect(identity.scale.range()).toEqual([0, 10]);
  });

  it('Ignores the domain when the range is already provided', () => {
    const identity = new D3ScaleIdentity({ range: [0, 10], domain: [0, 50] });
    expect(identity.scale.domain()).toEqual([0, 10]);
    expect(identity.scale.range()).toEqual([0, 10]);
  });

  it('Returns the passed value if it is a number regardless of the range', () => {
    const identity = new D3ScaleIdentity();

    // Domain and range would be [0, 1], while 0.5 is within that range, 3 is not
    expect(identity.scale(0.5)).toEqual(0.5);
    expect(identity.scale(3)).toEqual(3);
  });

  it('Returns the scale `unknown value` when the passed value is not a number', () => {
    const identity = new D3ScaleIdentity();
    // @ts-ignore
    expect(identity.scale('a')).toBeUndefined();

    identity.setDefinition({ unknown: 42 });
    // @ts-ignore
    expect(identity.scale('a')).toEqual(42);

    identity.setDefinition({ unknown: '-' });
    // @ts-ignore
    expect(identity.scale('a')).toEqual('-');
  });

  it('Applies nice scaling', () => {
    const identity = new D3ScaleIdentity({ range: [-1.1, 0.9] });

    expect(identity.scale.ticks(2)).toEqual([-1, 0]);

    identity.setDefinition({ range: [-1.1, 0.9], nice: 4 });
    expect(identity.scale.ticks(2)).toEqual([-1, 0, 1]);
  });
});
