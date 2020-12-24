const { util1, util2, isWithinRange, isWithinSomeOfTheRanges } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'class: 1-3 or 5-7',
    'row: 6-11 or 33-44',
    'seat: 13-40 or 45-50',
    '',
    'your ticket:',
    '7,1,14',
    '',
    'nearby tickets:',
    '7,3,47',
    '40,4,50',
    '55,2,20',
    '38,6,12',
  ];

  test('it should solve example 1', () => {
    expect(isWithinRange(7, [1, 3, 5, 7])).toEqual(true);
    expect(isWithinRange(3, [1, 3, 5, 7])).toEqual(true);
    expect(isWithinRange(4, [1, 3, 5, 7])).toEqual(false);
    expect(isWithinRange(40, [1, 3, 5, 7])).toEqual(false);
    expect(
      isWithinSomeOfTheRanges(7, [
        [1, 3, 5, 7],
        [6, 11, 33, 44],
        [13, 40, 45, 50],
      ]),
    ).toEqual(true);
    expect(
      isWithinSomeOfTheRanges(40, [
        [1, 3, 5, 7],
        [6, 11, 33, 44],
        [13, 40, 45, 50],
      ]),
    ).toEqual(true);
    expect(
      isWithinSomeOfTheRanges(4, [
        [1, 3, 5, 7],
        [6, 11, 33, 44],
        [13, 40, 45, 50],
      ]),
    ).toEqual(false);
    
    expect(util1(input1)).toEqual(71);
  });

  /* test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
