const { calculate, util1, util2 } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    20,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    25,
  ];

  const input2 = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    25,
    45,
  ];

  const input3 = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
  ];

  test('it should solve example 1', () => {
    expect(calculate(input1, 25, 26)).toBe(true);
    expect(calculate(input1, 25, 100)).toBe(false);
    expect(calculate(input1, 25, 50)).toBe(false);
    expect(calculate(input1, 25, 49)).toBe(true);

    expect(calculate(input2, 25, 26)).toBe(true);
    expect(calculate(input2, 25, 65)).toBe(false);
    expect(calculate(input2, 25, 64)).toBe(true);
    expect(calculate(input2, 25, 66)).toBe(true);
  });

  expect(util1(input3, 5)).toBe(127);

  // test('it should solve example 2', () => {
  // expect(util2(input1)).toEqual(0);
  // });
});
