const { getFuel } = require('./solve');

describe('Day 1', () => {
  test('it should solve part 1 test cases', () => {
    expect(getFuel(12)).toEqual(2);
    expect(getFuel(14)).toEqual(2);
    expect(getFuel(1969)).toEqual(654);
    expect(getFuel(100756)).toEqual(33583);
  });

  test('it should solve part 2 test cases', () => {
    expect(getFuel(12, true)).toEqual(2);
    expect(getFuel(1969, true)).toEqual(966);
    expect(getFuel(100756, true)).toEqual(50346);
  });
});
