const { calculateLumber } = require('./lumber');

const input = [
  '.#.#...|#.',
  '.....#|##|',
  '.|..|...#.',
  '..|#.....#',
  '#.#|||#|#|',
  '...#.||...',
  '.|....|...',
  '||...#|.#|',
  '|.||||..|.',
  '...#.|..|.',
];

describe('it should solve day 17', () => {

  describe('it should solve part 1 example', () => {
    it('it should solve the example', () => {
      expect(calculateLumber(input)).toEqual(1147);
    });

  });
});
