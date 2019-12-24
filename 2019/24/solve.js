#!/usr/bin/env/node

const { getRows } = require('../../utils');

const parseInput = (rows) => rows.map(row => row.split(''));

const isBug = cell => cell === '#';

const becomesBug = (cell, state, x, y) => {
  let numberOfAdjacentBugs = 0;
  if (y > 0 && isBug(state[y - 1][x])) {
    numberOfAdjacentBugs += 1;
  }
  if (x > 0 && isBug(state[y][x - 1])) {
    numberOfAdjacentBugs += 1;
  }
  if (x < 4 && isBug(state[y][x + 1])) {
    numberOfAdjacentBugs += 1;
  }
  if (y < 4 && isBug(state[y + 1][x])) {
    numberOfAdjacentBugs += 1;
  }

  return isBug(cell) ? numberOfAdjacentBugs === 1 : numberOfAdjacentBugs === 1 || numberOfAdjacentBugs === 2;
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
  const hashes = new Set();
  while (!found) {
    state = calculateStep(state);
    const hash = String(state);
    if (hashes.has(hash)) {
      found = true;
    } else {
      hashes.add(hash);
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
