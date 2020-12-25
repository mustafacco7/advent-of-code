#!/usr/bin/env node

const { getRows } = require('../../utils');
const { util1 } = require('./utils');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${util1(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

solve1();
