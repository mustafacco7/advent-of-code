const { util1, util2, write } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    'mem[8] = 11',
    'mem[7] = 101',
    'mem[8] = 0',
  ];

  test('it should solve example 1', () => {
    expect(write(11, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual(73);
    expect(write(101, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual(101);
    expect(write(0, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual(64);
    expect(util1(input1)).toEqual(165);
  });

  /* test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
