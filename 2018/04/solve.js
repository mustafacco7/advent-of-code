#!/usr/bin/env node

const { findGuardAndTime, findGuardAndFrequency } = require('./guard');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findGuardAndTime(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log(findGuardAndFrequency(data)));
};

solve1();
solve2();
