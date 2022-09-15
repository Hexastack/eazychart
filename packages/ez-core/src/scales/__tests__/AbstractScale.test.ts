import { Direction } from '../../types';
import D3ScaleIdentity from '../ScaleIdentity';

const data = [{ value: 20 }, { value: 50 }];

describe('AbstractScale', () => {
  it("Instanciate storing userDifinition and merging it with the scale's default definition", () => {
    const scale = new D3ScaleIdentity({ softMax: 30, max: 40 });
    expect(scale).toBeDefined();

    expect(scale.userDefinition).toEqual({ softMax: 30, max: 40 });

    // identity scale default definition beign {
    //   nice: 0,
    //   minPadding: 0,
    //   maxPadding: 0,
    //   softMin: Infinity,
    //   softMax: -Infinity,
    //   reverse: false,
    // };
    expect(scale.definition).toEqual({
      nice: 0,
      minPadding: 0,
      maxPadding: 0,
      softMin: Infinity,
      softMax: 30,
      max: 40,
      reverse: false,
    });
  });

  it('Sets the data and computes the computedScale', () => {
    const scale = new D3ScaleIdentity({ domainKey: 'value' });

    scale.setData(data);
    expect(scale.data).toEqual(data);
    expect(scale.scale.domain()).toEqual([20, 50]);
  });

  it('Sets the dimnensions and computes the computedScale', () => {
    const scale = new D3ScaleIdentity({ direction: Direction.HORIZONTAL });

    scale.setDimensions({ width: 200, height: 100 });
    expect(scale.dimensions).toEqual({ width: 200, height: 100 });
    expect(scale.scale.domain()).toEqual([0, 200]);
  });

  it('Stores new definitions and merges them with the default one', () => {
    const scale = new D3ScaleIdentity();

    scale.setDefinition({ softMax: 30, max: 40 });

    expect(scale.userDefinition).toEqual({ softMax: 30, max: 40 });

    // identity scale default definition beign {
    //   nice: 0,
    //   minPadding: 0,
    //   maxPadding: 0,
    //   softMin: Infinity,
    //   softMax: -Infinity,
    //   reverse: false,
    // };
    expect(scale.definition).toEqual({
      nice: 0,
      minPadding: 0,
      maxPadding: 0,
      softMin: Infinity,
      softMax: 30,
      max: 40,
      reverse: false,
    });
  });

  it('Appends definitions to previous userDefinitions and to the previous definition', () => {
    const scale = new D3ScaleIdentity({ softMax: 30, max: 40 });

    scale.appendDefinition({ domainKey: 'value', max: 50 });

    expect(scale.userDefinition).toEqual({
      softMax: 30,
      max: 50,
      domainKey: 'value',
    });

    // identity scale default definition beign {
    //   nice: 0,
    //   minPadding: 0,
    //   maxPadding: 0,
    //   softMin: Infinity,
    //   softMax: -Infinity,
    //   reverse: false,
    // };
    expect(scale.definition).toEqual({
      nice: 0,
      minPadding: 0,
      maxPadding: 0,
      softMin: Infinity,
      softMax: 30,
      max: 50,
      domainKey: 'value',
      reverse: false,
    });
  });

  it('Sets both dimensions and data then computes the computedScale', () => {
    const scale = new D3ScaleIdentity({ direction: Direction.HORIZONTAL });

    scale.computeScale({ width: 200, height: 100 }, data);
    expect(scale.data).toEqual(data);
    expect(scale.dimensions).toEqual({ width: 200, height: 100 });
    expect(scale.scale.domain()).toEqual([0, 200]);
  });
});
