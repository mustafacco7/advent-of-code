#!/usr/bin/env node

const { findLargestArea, findClosestArea } = require('./manhattan');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findLargestArea(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log(findClosestArea(data, 10000)));
};

solve1();
solve2();
