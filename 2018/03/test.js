const { findOverlaps } = require('./overlap');

const input = [
  '#1 @ 1,3: 4x4',
  '#2 @ 3,1: 4x4',
  '#3 @ 5,5: 2x2',
];

describe('it should solve part 1 and part 2', () => {
  test('it should solve part 1 test cases', () => {
    expect(findOverlaps(input)[0]).toEqual(4);
  });

  test('it should solve part 2 test cases', () => {
    expect(findOverlaps(input)[1]).toEqual('3');
  });
});
