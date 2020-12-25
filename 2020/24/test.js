const {
  util1,
  util2,
  move,
  getNeighbours,
  getNumberOfBlackNeighbours,
} = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'sesenwnenenewseeswwswswwnenewsewsw',
    'neeenesenwnwwswnenewnwwsewnenwseswesw',
    'seswneswswsenwwnwse',
    'nwnwneseeswswnenewneswwnewseswneseene',
    'swweswneswnenwsewnwneneseenw',
    'eesenwseswswnenwswnwnwsewwnwsene',
    'sewnenenenesenwsewnenwwwse',
    'wenwwweseeeweswwwnwwe',
    'wsweesenenewnwwnwsenewsenwwsesesenwne',
    'neeswseenwwswnwswswnw',
    'nenwswwsewswnenenewsenwsenwnesesenew',
    'enewnwewneswsewnwswenweswnenwsenwsw',
    'sweneswneswneneenwnewenewwneswswnese',
    'swwesenesewenwneswnwwneseswwne',
    'enesenwswwswneneswsenwnewswseenwsese',
    'wnwnesenesenenwwnenwsewesewsesesew',
    'nenewswnwewswnenesenwnesewesw',
    'eneswnwswnwsenenwnwnwwseeswneewsenese',
    'neswnwewnwnwseenwseesewsenwsweewe',
    'wseweeenwnesenwwwswnew',
  ];

  test('it should solve example 1', () => {
    expect(move('esew')).toEqual({ x: 1, y: 1 });
    expect(move('nwwswee')).toEqual({ x: 0, y: 0 });
    expect(move('sesenwnenenewseeswwswswwnenewsewsw')).toEqual({ x: -4, y: 2 });
    expect(move('seswneswswsenwwnwse')).toEqual({ x: -3, y: 3 });
    expect(util1(input1)).toEqual(10);
  });

  /* test('it should solve example 2', () => {
    expect(getNeighbours({ x: 0, y: 0 })).toEqual([
      { x: 1, y: -1 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -2, y: 0 },
      { x: -1, y: -1 },
    ]);

    expect(
      getNumberOfBlackNeighbours({ '0,0': true, '2,0': true }, { x: 0, y: 0 }),
    ).toEqual(1);

    expect(
      getNumberOfBlackNeighbours(
        { '0,0': true, '2,0': true, '3,8': true, '1,1': true, '-1,1': false },
        { x: 0, y: 0 },
      ),
    ).toEqual(2);
    expect(util2(input1)).toEqual(2208);
  }); */
});
