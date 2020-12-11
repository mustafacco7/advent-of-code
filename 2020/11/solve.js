#!/usr/bin/env node

const { getRows } = require('../../utils');
const { util1, util2 } = require('./utils');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${util1(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

const solve2 = () => {
  getRows().then((rows) => {
    console.log(`Part 2: ${util2(rows)}`);
  });
};

solve1();
// solve2();
