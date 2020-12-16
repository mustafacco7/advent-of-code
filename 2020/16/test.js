const {
  util1,
  util2,
  isWithinRange,
  isWithinSomeOfTheRanges,
  getValidTickets,
} = require('./utils');

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

  const input2 = [
    'class: 0-1 or 4-19',
    'row: 0-5 or 8-19',
    'seat: 0-13 or 16-19',
    '',
    'your ticket:',
    '11,12,13',
    '',
    'nearby tickets:',
    '3,9,18',
    '40,4,50',
    '55,2,20',
    '15,1,5',
    '5,14,9',
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

  test('it should solve example 2', () => {
    util2(input2);
    const rules = [
      [0, 1, 4, 19],
      [0, 5, 8, 19],
      [0, 13, 16, 19],
    ];
    const tickets = [
      [3, 9, 18],
      [40, 4, 50],
      [55, 2, 20],
      [15, 1, 5],
      [5, 14, 9],
    ];
    expect(getValidTickets(rules, tickets)).toEqual([
      [3, 9, 18],
      [15, 1, 5],
      [5, 14, 9],
    ]);
  });
});
