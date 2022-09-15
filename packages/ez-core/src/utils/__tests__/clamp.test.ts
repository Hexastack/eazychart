import { clamp } from '../clamp';

describe('clamp', () => {
  it('returns the same value', () => {
    expect(clamp(50, 0, 100)).toEqual(50);
  });
  it('returns the max value', () => {
    expect(clamp(120, 0, 100)).toEqual(100);
  });
  it('returns the min value', () => {
    expect(clamp(-1, 0, 100)).toEqual(0);
  });
});
