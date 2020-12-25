const {
  util1,
  util2,
  applyDay,
  getBlackTiles,
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

  test('it should solve example 2', () => {
    expect(getNeighbours({ x: 0, y: 0 })).toEqual([
      { x: 1, y: -1 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -2, y: 0 },
      { x: -1, y: -1 },
    ]);

    const blackTiles = new Set();
    blackTiles.add('0,0');
    blackTiles.add('2,0');
    expect(getNumberOfBlackNeighbours(blackTiles, { x: 0, y: 0 })).toEqual(1);

    blackTiles.add('3,8');
    blackTiles.add('1,1');
    expect(getNumberOfBlackNeighbours(blackTiles, { x: 0, y: 0 })).toEqual(2);

    const input2 = getBlackTiles(input1);
    expect(applyDay(input2).size).toEqual(15);
    expect(util2(input1, 1)).toEqual(15);
    expect(util2(input1, 4)).toEqual(14);
    expect(util2(input1, 20)).toEqual(132);
    expect(util2(input1)).toEqual(2208);
  });
});
