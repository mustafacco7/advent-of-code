const { isValid, isValidPart2 } = require('./solve');

describe('Day 4', () => {
  it('should solve part 1 examples', () => {
    expect(isValid('111111')).toBe(true);
    expect(isValid('223450')).toBe(false);
    expect(isValid('123789')).toBe(false);
  });

  it('should solve part 2 examples', () => {
    expect(isValidPart2('112233')).toBe(true);
    expect(isValidPart2('123444')).toBe(false);
    expect(isValidPart2('111122')).toBe(true);
  });
});
