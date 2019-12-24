const { calculateSteps, findDuplicateState } = require('./solve');

describe('Day 24', () => {
  describe('Part 1', () => {
    it('should calculate step 1', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'];
      const step1 = ['#..#.', '####.', '###.#', '##.##', '.##..'];
      expect(calculateSteps(initialState, 1)).toStrictEqual(step1);
    });

    it('should calculate step 2', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'];
      const step2 = ['#####', '....#', '....#', '...#.', '#.###'];
      expect(calculateSteps(initialState, 2)).toStrictEqual(step2);
    });

    it('should calculate step 4', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'];
      const step4 = ['####.', '....#', '##..#', '.....', '##...'];
      expect(calculateSteps(initialState, 4)).toStrictEqual(step4);
    });

    it('should find Duplicate step 4', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'];
      expect(findDuplicateState(initialState)).toStrictEqual(2129920);
    });

  });

});
