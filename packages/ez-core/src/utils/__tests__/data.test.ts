import { normalizeData } from '../data';

describe('normalizeData', () => {
  const minimalData = [
    {
      x: 1,
    },
    {
      x: 2,
    },
    {
      x: 3,
    },
  ];
  const normalizedData = {
    '0': {
      color: 'red',
      id: '0',
      isActive: true,
      label: '0',
      x: 1,
    },
    '1': {
      color: 'blue',
      id: '1',
      isActive: true,
      label: '1',
      x: 2,
    },
    '2': {
      color: 'yellow',
      id: '2',
      isActive: true,
      label: '2',
      x: 3,
    },
  };
  it('takes raw data and returns a nomalized data as a dict', () => {
    const result = normalizeData(minimalData, ['red', 'blue', 'yellow']);
    expect(result).toEqual(normalizedData);
  });

  it('returns the data as is if already normalized', () => {
    expect(
      normalizeData(Object.values(normalizedData), ['black', 'white', 'grey'])
    ).toEqual(normalizedData);
  });
});
