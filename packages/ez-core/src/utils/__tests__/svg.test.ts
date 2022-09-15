import { transformTranslate } from '../svg';

describe('transformTranslate', () => {
  it('returns an svg transform translation statement', () => {
    expect(transformTranslate({ x: 10, y: 20 })).toEqual('translate(10, 20)');
  });
});
