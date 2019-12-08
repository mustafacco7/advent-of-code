
const { getImageData } = require('./solve');

describe('Day 8', () => {
  it('should solve part 1 examples', () => {
    const input = '123456789012';
    const width = 3;
    const height = 2;
    const { checksum } = getImageData({ digits: input.split(''), width, height });
    expect(checksum).toBe(1);
  });

  it('should solve part 2 examples', () => {
    const input = '0222112222120000';
    const width = 3;
    const height = 3;
    const product = getImageData({ digits: input.split(''), width, height });
    expect(product).toBe(['01', '10']);

  });
});
