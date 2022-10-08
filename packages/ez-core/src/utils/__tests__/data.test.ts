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
      id: '0',
      label: '0',
      x: 1,
    },
    '1': {
      id: '1',
      label: '1',
      x: 2,
    },
    '2': {
      id: '2',
      label: '2',
      x: 3,
    },
  };
  it('takes raw data and returns a nomalized data as a dict', () => {
    const result = normalizeData(minimalData);
    expect(result).toEqual(normalizedData);
  });

  it('returns the data as is if already normalized', () => {
    expect(
      normalizeData(Object.values(normalizedData))
    ).toEqual(normalizedData);
  });
});
