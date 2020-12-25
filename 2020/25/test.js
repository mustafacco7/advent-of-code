const {
  util1,
  util2,
  calculateNewValue,
  findLoopSize,
  calculatePublicKey,
  calcultateEncryptionKey,
} = require('./utils');

describe('it should solve part 1 and part 2', () => {
  test('it should solve example 1', () => {
    expect(
      calculateNewValue({ subjectNumber: 7 }),
    ).toEqual(7);
    expect(findLoopSize({ publicKey: 5764801, subjectNumber: 7 })).toEqual(8);
    expect(findLoopSize({ publicKey: 17807724, subjectNumber: 7 })).toEqual(11);
    expect(calcultateEncryptionKey({ publicKey: 17807724, loopSize: 8 })).toEqual(14897079);
    expect(calcultateEncryptionKey({ publicKey: 5764801, loopSize: 11 })).toEqual(14897079);
  });

  /* test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
