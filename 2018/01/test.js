const { sum, findDuplicates } = require('./sum');

test('it should solve part 1 test cases', () => {
  expect(sum([+1, -2, +3, +1])).toEqual(3);
  expect(sum([+1, +1, +1])).toEqual(3);
  expect(sum([+1, +1, -2])).toEqual(0);
  expect(sum([-1, -2, -3])).toEqual(-6);
});

test('it should solve part 2 test cases', () => {
  expect(findDuplicates([+1, -2, +3, +1])).toEqual(2);
  // expect(findDuplicates([+1, -1])).toEqual(0);
  expect(findDuplicates([+3, +3, +4, -2, -4])).toEqual(10);
  expect(findDuplicates([-6, +3, +8, +5, -6])).toEqual(5);
  expect(findDuplicates([+7, +7, -2, -7, -4])).toEqual(14);
});
