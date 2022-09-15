import { computedLegendBoxStyle } from '../legend';

describe('computedLegendBoxStyle', () => {
  it('returns css attribute for an active datum', () => {
    expect(
      computedLegendBoxStyle({
        id: '1',
        label: 'Red Datum',
        isActive: true,
        color: 'red',
      })
    ).toStrictEqual({
      backgroundColor: 'red',
      border: 'red 2px solid',
    });
  });

  it('returns css attribute for an inactive datum (no bg color)', () => {
    expect(
      computedLegendBoxStyle({
        id: '2',
        label: 'Blue Datum',
        isActive: false,
        color: '#B6D8C6',
      })
    ).toStrictEqual({
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '#B6D8C6 2px solid',
    });
  });
});
