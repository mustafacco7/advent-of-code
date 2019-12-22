const { dealIntoNewStack, cut, dealWithIncrement, shuffle } = require('./solve');

describe('Day 22', () => {
  describe('Part 1', () => {
    it('should solve deal into new stack', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(dealIntoNewStack(deck)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });

    it('should solve cut N cards', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(cut(deck, 3)).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
    });

    it('should solve cut -N cards', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(cut(deck, -4)).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
    });

    it('should solve deal with increment', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(dealWithIncrement(deck, 3)).toEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3]);
    });

    it('should solve example 1', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const instructions = [
        ['dealWithIncrement', 7],
        ['dealIntoNewStack'],
        ['dealIntoNewStack'],
      ];

      expect(shuffle(deck, instructions)).toEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7]);
    });

    it('should solve example 2', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const instructions = [
        ['cut', 6],
        ['dealWithIncrement', 7],
        ['dealIntoNewStack'],
      ];

      expect(shuffle(deck, instructions)).toEqual([3, 0, 7, 4, 1, 8, 5, 2, 9, 6]);
    });

    it('should solve example 3', () => {
      const deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const instructions = [
        ['dealIntoNewStack'],
        ['cut', -2],
        ['dealWithIncrement', 7],
        ['cut', 8],
        ['cut', -4],
        ['dealWithIncrement', 7],
        ['cut', 3],
        ['dealWithIncrement', 9],
        ['dealWithIncrement', 3],
        ['cut', -1],
      ];

      expect(shuffle(deck, instructions)).toEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6]);
    });
  });

  describe('Part 2', () => {

  });
});
