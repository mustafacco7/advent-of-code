const { calculateSteps, findDuplicateState, calculateBiodiversityRating } = require('./solve');

describe('Day 24', () => {
  describe('Part 1', () => {
    it('should calculate step 1', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'].map(row => row.split(''));
      const step1 = ['#..#.', '####.', '###.#', '##.##', '.##..'].map(row => row.split(''));
      expect(calculateSteps(initialState, 1)).toStrictEqual(step1);
    });

    it('should calculate step 2', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'].map(row => row.split(''));
      const step2 = ['#####', '....#', '....#', '...#.', '#.###'].map(row => row.split(''));
      expect(calculateSteps(initialState, 2)).toStrictEqual(step2);
    });

    it('should calculate step 4', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'].map(row => row.split(''));
      const step4 = ['####.', '....#', '##..#', '.....', '##...'].map(row => row.split(''));
      expect(calculateSteps(initialState, 4)).toStrictEqual(step4);
    });

    it('should find duplicate state', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'].map(row => row.split(''));
      const duplicateState = ['.....', '.....', '.....', '#....', '.#...'].map(row => row.split(''));
      expect(findDuplicateState(initialState)).toStrictEqual(duplicateState);
    });

    it('should calculate Biodiversity Rating', () => {
      const initialState = ['....#', '#..#.', '#..##', '..#..', '#....'].map(row => row.split(''));
      expect(calculateBiodiversityRating(initialState)).toEqual(2129920);
    });

  });

});
