const findTrees = require('./findTrees');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    '..##.......',
    '#...#...#..',
    '.#....#..#.',
    '..#.#...#.#',
    '.#...##..#.',
    '..#.##.....',
    '.#.#.#....#',
    '.#........#',
    '#.##...#...',
    '#...##....#',
    '.#..#...#.#',
  ];

  test('it should solve example 1', () => {
    expect(findTrees(input1)).toEqual(7);
  });

  /* test('it should solve example 2', () => {
    expect(validatePasswords2(input1)).toEqual(1);
  }); */
});
