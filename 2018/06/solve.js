#!/usr/bin/env node

const { findLargestArea } = require('./manhattan');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findLargestArea(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log((data)));
};

solve1();
// solve2();
