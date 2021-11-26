const { util1 } = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = ['939', '7,13,x,x,59,x,31,19'];

  test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(295);
  });

  /*  test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
