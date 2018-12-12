#!/usr/bin/env node
const { findPots } = require('./pots');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findPots(data, 20)));
};
const solve2 = () => {
  // After 200 the value stabilieas and increases with 42 for each iteration
  // 200 -> 9568
  // 201 -> 9610  42
  // 202 -> 9652  42
  // 203 -> 9694  42
  getRows()
    .then(data => console.log(findPots(data, 200) + (50000000000 - 200) * 42));
};

solve1();
solve2();
