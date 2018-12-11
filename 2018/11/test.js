const { calculatePowerLevel, findMaxSquare, findReallyMaxSquare } = require('./power');

const input = 9445;

describe('it should solve day 11', () => {
  describe('it should solve part 1', () => {


    test('it should calculate the powerLevel', () => {
      expect(calculatePowerLevel([3, 5], 8)).toEqual(4);
      expect(calculatePowerLevel([122, 79], 57)).toEqual(-5);
      expect(calculatePowerLevel([217, 196], 39)).toEqual(0);
      expect(calculatePowerLevel([101, 153], 71)).toEqual(4);
    });

    test('it should find maxSquare', () => {
      expect(findMaxSquare(18).point).toEqual('33,45,3');
      expect(findMaxSquare(42).point).toEqual('21,61,3');
    });

    test('it should solve example 1', () => {
      expect(findMaxSquare(input).point).toEqual('233,36,3');
    });
  });

  describe('it should solve part 2', () => {

    test('it should find maxSquare', () => {
      expect(findReallyMaxSquare(18).point).toEqual('90,269,16');
      expect(findReallyMaxSquare(42).point).toEqual('232,251,12');
    });

    test('it should solve example 2', () => {
      expect(findReallyMaxSquare(input).point).toEqual('231,107,14');
    });
  });
});
