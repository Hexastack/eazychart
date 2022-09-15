import { Direction } from '../../types';
import D3ScaleOrdinal from '../ScaleOrdinal';

describe('ScaleOrdinal', () => {
  it('Instanciate and compute', () => {
    const ordinal = new D3ScaleOrdinal();
    expect(ordinal).toBeDefined();
    expect(ordinal.scale).toBeDefined();

    expect(ordinal.scale.domain()).toEqual([]);
    expect(ordinal.scale.range()).toEqual([]);
  });

  it('Outputs the scaled value on a well defined domain and range', () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Iron', 'Rolling'],
      range: ['Maiden', 'Stones'],
    });

    expect(ordinal.scale('Iron')).toEqual('Maiden');
    expect(ordinal.scale('Rolling')).toEqual('Stones');
  });

  it('Outputs the scaled value on a numerical input', () => {
    const ordinal = new D3ScaleOrdinal({
      range: ['Maiden', 'Stones'],
      domain: [1, 2, 3, 4, 5],
    });

    expect(ordinal.scale(1)).toEqual('Maiden');
    expect(ordinal.scale(2)).toEqual('Stones');
    expect(ordinal.scale(3)).toEqual('Maiden');
    expect(ordinal.scale(5)).toEqual('Maiden');
  });

  it('Associate inputs that do not exist on a domain to an output (loop)', () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Iron', 'Radio'],
      range: ['Maiden', 'Head', 'Sabbath'],
    });

    expect(ordinal.scale('Radio')).toEqual('Head');
    expect(ordinal.scale('Black')).toEqual('Sabbath');
    expect(ordinal.scale('Dark')).toEqual('Maiden');
    expect(ordinal.scale('Portish')).toEqual('Head');
    expect(ordinal.scale('White')).toEqual('Sabbath');
    // The input `Black` did not exist when declaring the domain but it was associated
    // to `Sabbath`, thus it should keep outputing `Sabbath`
    expect(ordinal.scale('Black')).toEqual('Sabbath');
  });

  it('Outputs the passed unknown value when input does not exist in the domain', () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Iron', 'Radio'],
      range: ['Maiden', 'Head', 'Sabbath'],
      unknown: 'Stripes',
    });

    expect(ordinal.scale('Radio')).toEqual('Head');

    expect(ordinal.scale('White')).toEqual('Stripes');
    expect(ordinal.scale('Black')).toEqual('Stripes');
  });

  it('Reveses the range', () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Black', 'Radio'],
      range: ['Maiden', 'Head', 'Sabbath'],
      reverse: true,
    });

    expect(ordinal.scale('Black')).toEqual('Sabbath');
    expect(ordinal.scale('Radio')).toEqual('Head');
    expect(ordinal.scale('Iron')).toEqual('Maiden');
  });

  it("Inverts the scale's I/O", () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Iron', 'Rolling'],
      range: ['Maiden', 'Stones'],
      invert: true,
    });

    expect(ordinal.scale('Maiden')).toEqual('Iron');
    expect(ordinal.scale('Stones')).toEqual('Rolling');
  });

  it('Builds the domain from data when a domainKey is provided', () => {
    const ordinal = new D3ScaleOrdinal({
      range: ['Maiden', 'Stones'],
      domainKey: 'name',
    });

    ordinal.setData([{ name: 'Iron' }, { name: 'Rolling' }]);

    expect(ordinal.scale.domain()).toEqual(['Iron', 'Rolling']);
    expect(ordinal.scale('Iron')).toEqual('Maiden');
    expect(ordinal.scale('Rolling')).toEqual('Stones');
  });

  it('Builds the range from dimentions', () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Iron', 'Rolling', 'white', 'black'],
      direction: Direction.HORIZONTAL,
    });

    ordinal.setDimensions({ width: 300, height: 210 });

    expect(ordinal.scale.range()).toEqual([0, 100, 200, 300]);
    expect(ordinal.scale('Iron')).toEqual(0);
    expect(ordinal.scale('white')).toEqual(200);

    ordinal.appendDefinition({ direction: Direction.VERTICAL });
    expect(ordinal.scale.range()).toEqual([0, 70, 140, 210]);
    expect(ordinal.scale('Rolling')).toEqual(70);
    expect(ordinal.scale('black')).toEqual(210);
  });

  it('Builds a one element range equals to half the dimension', () => {
    const ordinal = new D3ScaleOrdinal({
      domain: ['Iron'],
      direction: Direction.HORIZONTAL,
    });

    ordinal.setDimensions({ width: 1332, height: 210 });

    expect(ordinal.scale.range()).toEqual([666]);
    expect(ordinal.scale('Iron')).toEqual(666);
    expect(ordinal.scale('white')).toEqual(666);
  });

  it('Copies range from the domain when no direction is passed', () => {
    const domain = ['Iron', 'Rolling', 'white', 'black'];
    const ordinal = new D3ScaleOrdinal({
      domain,
    });

    expect(ordinal.scale.range()).toEqual(domain);
    expect(ordinal.scale('Iron')).toEqual('Iron');

    domain.pop();
    expect(ordinal.scale.range()).not.toEqual(domain);
  });
});
