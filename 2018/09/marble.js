const getHighScore = (players, lastPoint) => {
  let currentIndex = 0;
  const circle = [0];
  let currentPoint = 0;
  const score = Array(players).fill(0);

  const putMarble = (player) => {
    currentPoint += 1;
    let nextIndex = (currentIndex + 2) % (circle.length + 1);
    nextIndex = Math.max(1, nextIndex);

    if (currentPoint % 23) {
      circle.splice(nextIndex, 0, currentPoint);
    } else {
      nextIndex = (currentIndex - 7) % circle.length;
      if (nextIndex < 0) {
        nextIndex = circle.length + nextIndex;
      }
      const point = currentPoint + parseInt(circle.splice(nextIndex, 1), 10);
      score[player] += point;
    }
    currentIndex = nextIndex;
  };

  let player = 0;
  while (currentPoint <= lastPoint) {
    player = (player + 1) % players;
    putMarble(player);
  }

  return Math.max.apply(null, Object.values(score));
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
