const { findOverlaps } = require('./overlap');

test('it should solve part 1 test cases', () => {
  const input = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2',
  ];
  expect(findOverlaps(input)).toEqual(4);
});


test('it should solve part 2 test cases', () => {

});
