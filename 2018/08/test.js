
const { findChecksum, findRootNodeValue } = require('./checksum');

describe('it should solve part 1 and part 2', () => {

  const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

  test('it should solve example 1', () => {
    expect(findChecksum(input)).toEqual(138);
  });

  test('it should solve example 2', () => {
    expect(findRootNodeValue(input)).toEqual(66);
  });
});
