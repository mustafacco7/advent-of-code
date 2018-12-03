#!/usr/bin/env node

const { findOverlaps } = require('./overlap');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findOverlaps(data)[0]));
};

const solve2 = () => {
  getRows()
    .then(data => console.log(findOverlaps(data)[1]));
};

solve1();
solve2();
