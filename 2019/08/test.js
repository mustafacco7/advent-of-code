
const { getImageData } = require('./solve');

describe('Day 8', () => {
  it('should solve part 1 examples', () => {
    const input = '123456789012';
    const width = 3;
    const height = 2;
    const product = getImageData({ digits: input.split(''), width, height });
    expect(product).toBe(1);
  });

  it('should solve part 2 examples', () => {

  });
});
