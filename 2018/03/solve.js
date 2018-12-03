#!/usr/bin/env node

const { findOverlaps } = require('./overlap');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findOverlaps(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log(data));
};

solve1();
//solve2();
