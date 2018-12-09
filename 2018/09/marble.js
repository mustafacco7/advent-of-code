let score;
let current = { value: 0 };
current.prev = current;
current.next = current;

/* eslint-disable no-param-reassign */
/* eslint-disable-next-line object-curly-newline */
const putMarble = ({ player, currentPoint }) => {
  let target;

  if (currentPoint % 23) {
    target = current.next;
    const toAdd = { value: currentPoint, prev: target, next: target.next };
    target.next.prev = toAdd;
    target.next = toAdd;
    current = toAdd;
  } else {
    target = current;
    for (let i = 0; i < 7; i += 1) {
      target = target.prev;
    }
    const points = currentPoint + target.value;
    score[player] += points;
    target.next.prev = target.prev;
    target.prev.next = target.next;
    current = target.next;
  }

  return { current, score };
};
/* eslint-enable no-param-reassign */

const getHighScore = (players, lastPoint) => {
  let currentPoint = 0;
  let player = -1;
  score = Array(players).fill(0);

  while (currentPoint < lastPoint) {
    currentPoint += 1;
    player = (player + 1) % players;
    /* eslint-disable-next-line object-curly-newline */
    putMarble({ player, currentPoint });
  }

  return Math.max.apply(null, score);
};

const getInputValues = input => input.match(/(\d+) .* (\d+) points/).map(v => parseInt(v, 10));

const findHighScore = (input) => {
  const [, players, lastPoint] = getInputValues(input);
  return getHighScore(players, lastPoint);
};

const findHighestScore = (input) => {
  const [, players, lastPoint] = getInputValues(input);
  return getHighScore(players, lastPoint * 100);
};

module.exports = { findHighScore, findHighestScore };
