const { findLargestArea } = require('./manhattan');

describe('it should solve part 1 and part 2', () => {

  const input1 = [
    '1, 1',
    '1, 6',
    '8, 3',
    '3, 4',
    '5, 5',
    '8, 9',
  ];

  test('it should solve example 1', () => {
    expect(findLargestArea(input1)).toEqual(17);
  });

  test('it should solve example 2', () => {
  });
});
