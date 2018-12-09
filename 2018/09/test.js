const inputs = [
  '9 players; last marble is worth 25 points: high score is 32',
  '10 players; last marble is worth 1618 points: high score is 8317',
  '13 players; last marble is worth 7999 points: high score is 146373',
  '17 players; last marble is worth 1104 points: high score is 2764',
  '21 players; last marble is worth 6111 points: high score is 54718',
  '30 players; last marble is worth 5807 points: high score is 37305',
];

const { findHighScore } = require('./marble');

describe('it should solve part 1 and part 2', () => {

  test('it should solve example 1', () => {
    inputs.forEach((input) => {
      const [expected] = input.match(/\d+$/);
      expect(findHighScore(input)).toEqual(parseInt(expected, 10));
    });
  });

  test('it should solve example 2', () => {

  });
});
