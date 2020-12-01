const { getProduct } = require('./getProduct');

describe('it should solve part 1 and part 2', () => {
  const input1 = [1721, 979, 366, 299, 675, 1456];

  test('it should solve example 1', () => {
    expect(getProduct(input1)).toEqual(514579);
  });

/*   test('it should solve example 2', () => {
    expect(findClosestArea(input1, 32)).toEqual(16);
  }); */
});
