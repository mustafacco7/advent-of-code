const { util1, util2 } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6',
  ];

  test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(5);
  });

  /* test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
