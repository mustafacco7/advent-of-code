const { findPots } = require('./pots');

const input = [
  'initial state: #..#.#..##......###...###',
  '',
  '...## => #',
  '..#.. => #',
  '.#... => #',
  '.#.#. => #',
  '.#.## => #',
  '.##.. => #',
  '.#### => #',
  '#.#.# => #',
  '#.### => #',
  '##.#. => #',
  '##.## => #',
  '###.. => #',
  '###.# => #',
  '####. => #',
];

describe('it should solve day 12', () => {
  describe('it should solve part 1', () => {
    it('should solve the test case', () => {
      expect(findPots(input, 20)).toEqual(325);
    });
  });

  describe('it should solve part 2', () => {
    it('should solve the test case', () => {
      expect(findPots(input, 200)).toEqual(325);
    });
  });
});
