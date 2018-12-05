const { react } = require('./polymer');

describe('it should solve part 1 and part 2', () => {
  test('it should solve example 1', () => {
    expect(react('aA')).toEqual(0);
    expect(react('abBA')).toEqual(0);
    expect(react('abAB')).toEqual(4);
    expect(react('aabAAB')).toEqual(6);
    expect(react('dabAcCaCBAcCcaDA')).toEqual(10);
  });
});
