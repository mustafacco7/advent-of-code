
const { getChecksum, getImageData, renderImage } = require('./solve');

describe('Day 8', () => {
  it('should solve part 1 examples', () => {
    const input = '123456789012';
    const width = 3;
    const height = 2;
    const checksum = getChecksum({ digits: input.split(''), width, height });
    expect(checksum).toBe(1);
  });

  it('should solve part 2 examples', () => {
    const input = '0222112222120000';
    const width = 2;
    const height = 2;
    const { layers } = getImageData({ digits: input.split(''), width, height });
    expect(renderImage(layers)).toStrictEqual([[0, 1], [1, 0]]);
  });
});
