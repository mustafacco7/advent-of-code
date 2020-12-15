const { util1, util2 } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = '0,3,6';

  test('it should solve example 1', () => {
    expect(util1(input1, 4)).toEqual(0);
    expect(util1(input1, 5)).toEqual(3);
    expect(util1(input1, 6)).toEqual(3);
    expect(util1(input1, 7)).toEqual(1);
    expect(util1(input1, 8)).toEqual(0);
    expect(util1(input1, 9)).toEqual(4);
    expect(util1(input1, 10)).toEqual(0);

    expect(util1('1,3,2', 2020)).toEqual(1);
    expect(util1('2,1,3', 2020)).toEqual(10);
    expect(util1('1,2,3', 2020)).toEqual(27);
    expect(util1('2,3,1', 2020)).toEqual(78);
    expect(util1('3,2,1', 2020)).toEqual(438);
    expect(util1('3,1,2', 2020)).toEqual(1836);

    expect(util1(input1, 2020)).toEqual(436);
  });

  /* test('it should solve example 2', () => {
    expect(util2(input1, 30000000)).toEqual(175594);
  }); */
});
