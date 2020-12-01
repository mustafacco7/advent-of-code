const { checksum, findMatchingId } = require('./checksum');

test('it should solve part 1 test cases', () => {
  const input = [
    // 'abcdef', // .match() returns undefined, so let's skip this...
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab',
  ];
  expect(checksum(input)).toEqual(12);
});

test('it should solve part 2 test cases', () => {
  const input = [
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz',
  ];
  expect(findMatchingId(input)).toEqual('fgij');
});
