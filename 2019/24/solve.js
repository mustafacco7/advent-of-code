#!/usr/bin/env/node

const { getRows } = require('../../utils');

const parseInput = (rows) => rows.map(row => row.split(''));

const isBug = cell => cell === '#';

const neighbors = (x, y) => [
  { x: x - 1, y },
  { x: x + 1, y },
  { x, y: y - 1 },
  { x, y: y + 1 },
];

const becomesBug = (cell, state, x, y) => {
  const numberOfAdjacentBugs = neighbors(x, y).filter(({ x, y }) => state[y] && state[y][x] === '#').length;
  return isBug(cell) ? numberOfAdjacentBugs === 1 : [1, 2].includes(numberOfAdjacentBugs);
};

const calculateStep = (state) => state.reduce((accY, row, y) => {
  const newRow = row.reduce((accX, cell, x) => {
    accX.push(becomesBug(cell, state, x, y) ? '#' : '.');
    return accX;
  }, []);
  accY.push(newRow);
  return accY;
}, []);

const calculateSteps = (state, numberOfSteps) => {
  let nextStep = calculateStep(state);
  for (let i = 0; i < numberOfSteps - 1; i += 1) {
    nextStep = calculateStep(nextStep);
  }
  return nextStep;
};

const findDuplicateState = (state) => {
  let found = false;
  const history = new Set();
  while (!found) {
    state = calculateStep(state);
    const hash = String(state);
    if (history.has(hash)) {
      found = true;
    } else {
      history.add(hash);
    }
  }
  return state;
};

const calculateBiodiversityRating = (state) => findDuplicateState(state)
  .flat()
  .reduce((sum, cell, ix) => {
    sum += isBug(cell) ? 2 ** ix : 0;
    return sum;
  }, 0);


const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(calculateBiodiversityRating(parseInput(rows)));
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      console.log(rows);
    });
};

solve1();
// solve2();

module.exports = { calculateSteps, findDuplicateState, calculateBiodiversityRating };
