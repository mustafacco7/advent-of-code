const {
  util1,
  util2,
  getAdjacentSeats,
  getOccupiedAdjacentSeats,
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

  test('it should calculate adjacent seats', () => {
    expect(getAdjacentSeats(input1, 0, 0).length).toEqual(2);
    expect(getAdjacentSeats(input1, 2, 1).length).toEqual(5);
    expect(getOccupiedAdjacentSeats(input1, 0, 0)).toEqual(0);
    expect(getOccupiedAdjacentSeats(input1, 2, 1)).toEqual(0);
  });

  test('it should calculate occupied adjacent seats', () => {
    expect(getOccupiedAdjacentSeats(input2, 0, 0)).toEqual(2);
    expect(getOccupiedAdjacentSeats(input2, 2, 1)).toEqual(5);

    expect(getOccupiedAdjacentSeats(input3, 0, 0)).toEqual(1);
    expect(getOccupiedAdjacentSeats(input3, 2, 1)).toEqual(4);
  });

  /* test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(0);
  });
 */
  /*  test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
