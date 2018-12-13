const { findCollisionLocation } = require('./cart');

const input = [
  '/->-\\        ',
  '|   |  /----\\',
  '| /-+--+-\\  |',
  '| | |  | v  |',
  '\\-+-/  \\-+--/',
  '  \\------/  ',
];

describe('it should solve day 13', () => {

  describe('it should solve part 1', () => {
    it('should solve the test case', () => {
      expect(findCollisionLocation(input)).toEqual('7,3');
    });
  });

  describe('it should solve part 2', () => {
    it('should solve the test case', () => {
      expect().toEqual(325);
    });
  });

});
