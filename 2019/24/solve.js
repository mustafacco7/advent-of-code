#!/usr/bin/env/node

const { getRows } = require('../../utils');

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
  const newRow = row.split('').reduce((accX, cell, x) => {
    accX.push(becomesBug(cell, state, x, y) ? '#' : '.');
    return accX;
  }, []);
  accY.push(newRow.join(''));
  return accY;
}, []);

const calculateSteps = (state, numberOfSteps) => {
  const hashes = new Set();
  let nextStep = calculateStep(state);
  hashes.add(String(nextStep));
  for (let i = 0; i < numberOfSteps - 1; i += 1) {
    nextStep = calculateStep(nextStep);
    if (hashes.has(String(nextStep))) {
      console.log('Found!', nextStep, numberOfSteps);
    } else {
      hashes.add(String(nextStep));
    }
  }
  console.log(hashes);
  return nextStep;
};

const calculateBiodiversityRating = (state) => String(state)
  .replace(/,/g, '')
  .split('')
  .reduce((sum, cell, ix) => {
    sum += isBug(cell) ? 2 ** ix : 0;
    return sum;
  }, 0);

const findDuplicateState = (state) => {
  let found = false;
  let i = 0;
  const hashes = new Set();
  while (!found) {
    state = calculateStep(state);
    i += 1;
    const hash = String(state);
    if (hashes.has(hash)) {
      found = true;
    } else {
      hashes.add(hash);
    }
  }
  return calculateBiodiversityRating(state);
};
const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(findDuplicateState(rows));
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

module.exports = { calculateSteps, findDuplicateState };
