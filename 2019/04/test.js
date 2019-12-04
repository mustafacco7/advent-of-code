const { isValid } = require('./solve');

describe('Day 4', () => {
  it('should solve part 1 examples', () => {
    expect(isValid('111111')).toBe(true);
    expect(isValid('223450')).toBe(false);
    expect(isValid('123789')).toBe(false);
  });
});
