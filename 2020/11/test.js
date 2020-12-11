const {
  util1,
  util2,
  calculateNextState,
  calculateNextStateForSeat,
  getAdjacentSeats,
  getOccupiedAdjacentSeats,
  isEqualSeats,
} = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'L.LL.LL.LL',
    'LLLLLLL.LL',
    'L.L.L..L..',
    'LLLL.LL.LL',
    'L.LL.LL.LL',
    'L.LLLLL.LL',
    '..L.L.....',
    'LLLLLLLLLL',
    'L.LLLLLL.L',
    'L.LLLLL.LL',
  ];

  const input2 = [
    '#.##.##.##',
    '#######.##',
    '#.#.#..#..',
    '####.##.##',
    '#.##.##.##',
    '#.#####.##',
    '..#.#.....',
    '##########',
    '#.######.#',
    '#.#####.##',
  ];

  const input3 = [
    '#.LL.L#.##',
    '#LLLLLL.L#',
    'L.L.L..L..',
    '#LLL.LL.L#',
    '#.LL.LL.LL',
    '#.LLLL#.##',
    '..L.L.....',
    '#LLLLLLLL#',
    '#.LLLLLL.L',
    '#.#LLLL.##',
  ];

  const input4 = [
    '#.##.L#.##',
    '#L###LL.L#',
    'L.#.#..#..',
    '#L##.##.L#',
    '#.##.LL.LL',
    '#.###L#.##',
    '..#.#.....',
    '#L######L#',
    '#.LL###L.L',
    '#.#L###.##',
  ];

  const input5 = [
    '#.#L.L#.##',
    '#LLL#LL.L#',
    'L.#.L..#..',
    '#L##.##.L#',
    '#.#L.LL.LL',
    '#.#L#L#.##',
    '..L.L.....',
    '#L#L##L#L#',
    '#.LLLLLL.L',
    '#.#L#L#.##',
  ];

  test('it should calculate adjacent seats', () => {
    expect(getAdjacentSeats(input1, 0, 0).length).toEqual(2);
    expect(getAdjacentSeats(input1, 2, 1).length).toEqual(5);
    expect(getOccupiedAdjacentSeats(input1, 0, 0)).toEqual(0);
    expect(getOccupiedAdjacentSeats(input1, 2, 1)).toEqual(0);
  });

  test('it should calculate occupied adjacent seats', () => {
    expect(getOccupiedAdjacentSeats(input2, 0, 0)).toEqual(2);
    expect(getOccupiedAdjacentSeats(input2, 2, 1)).toEqual(5);

    expect(getOccupiedAdjacentSeats(input4, 0, 0)).toEqual(1);
    expect(getOccupiedAdjacentSeats(input4, 2, 1)).toEqual(4);
  });

  test('it should calculate next state for a single seat', () => {
    expect(calculateNextStateForSeat(input1, 0, 0)).toEqual('#');
    expect(calculateNextStateForSeat(input1, 2, 1)).toEqual('#');
    expect(calculateNextStateForSeat(input1, 3, 2)).toEqual('.');

    expect(calculateNextStateForSeat(input2, 0, 0)).toEqual('#');
    expect(calculateNextStateForSeat(input2, 2, 1)).toEqual('L');
    expect(calculateNextStateForSeat(input2, 4, 3)).toEqual('.');
  });

  test('it should calculate next state for all seats', () => {
    expect(calculateNextState(input1)).toEqual(input2);
    expect(calculateNextState(input2)).toEqual(input3);
    expect(calculateNextState(input5)).toEqual(input5);
  });

  test('it should find equal states', () => {
    expect(isEqualSeats(input1, input2)).toEqual(false);
    expect(isEqualSeats([...input1], [...input1])).toEqual(true);
  });

  test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(37);
  });

  /*  test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
