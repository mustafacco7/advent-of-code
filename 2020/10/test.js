const { util1, util2 } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
  const input2 = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
  ];
  test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(35);
    expect(util1(input2)).toEqual(220);
  });

  test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(8);
  });
});
