#!/usr/bin/env node

const { findOrder, findTime } = require('./sleigh');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findOrder(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log(findTime(data)));
};

solve1();
solve2();
