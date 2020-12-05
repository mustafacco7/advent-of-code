const { decodeBoardinPass, findHighestSeatId } = require('./boardingPass');

describe('it should solve part 1 and part 2', () => {
  test('it should decode a boarding pass', () => {
    expect(decodeBoardinPass('BFFFBBFRRR')).toEqual({
      row: 70,
      column: 7,
      seatId: 567,
    });
    expect(decodeBoardinPass('FFFBBBFRRR')).toEqual({
      row: 14,
      column: 7,
      seatId: 119,
    });
    expect(decodeBoardinPass('BBFFBBFRLL')).toEqual({
      row: 102,
      column: 4,
      seatId: 820,
    });
  });

  const input1 = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

  test('it should solve example 1', () => {
    expect(findHighestSeatId(input1)).toEqual(820);
  });
});
