const { calculate } = require('./opcodes');

const input = [
  'Before: [3, 2, 1, 1]',
  '9 2 1 2',
  'After:  [3, 2, 2, 1]',
];

describe('it should solve day 16', () => {

  describe('it should solve part 1', () => {
    it('it should solve the example', () => {
      expect(calculate(input)).toEqual(1);
    });

  });
});
