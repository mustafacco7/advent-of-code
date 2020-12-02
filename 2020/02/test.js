const { validatePasswords, validatePasswords2 } = require('./passwords');

describe('it should solve part 1 and part 2', () => {
  const input1 = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];

  test('it should solve example 1', () => {
    expect(validatePasswords(input1)).toEqual(2);
  });

  test('it should solve example 2', () => {
    expect(validatePasswords2(input1)).toEqual(1);
  });
});
