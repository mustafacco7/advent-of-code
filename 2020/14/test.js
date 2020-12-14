const { util1, util2, write, getAdresses } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    'mem[8] = 11',
    'mem[7] = 101',
    'mem[8] = 0',
  ];

  const input2 = [
    'mask = 000000000000000000000000000000X1001X',
    'mem[42] = 100',
    'mask = 00000000000000000000000000000000X0XX',
    'mem[26] = 1',
  ];

  test('it should solve example 1', () => {
    expect(write(11, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual(73);
    expect(write(101, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual(101);
    expect(write(0, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual(64);
    expect(util1(input1)).toEqual(165);
  });

  test('it should solve example 2', () => {
    expect(getAdresses(42, '000000000000000000000000000000X1001X')).toEqual([26, 27, 58, 59]);
    expect(getAdresses(26, '00000000000000000000000000000000X0XX')).toEqual([16, 17, 18, 19, 24, 25, 26, 27]);

    expect(util2(input2)).toEqual(208);
  });
});
