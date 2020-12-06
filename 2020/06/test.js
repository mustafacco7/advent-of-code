const { util1, util2 } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'abc',
    '',
    'a',
    'b',
    'c',
    '',
    'ab',
    'ac',
    '',
    'a',
    'a',
    'a',
    'a',
    '',
    'b',
  ];

  test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(11);
  });

  test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(6);
  });
});
