#!/usr/bin/env node

const { getRows } = require('../../utils');
const { sum, findDuplicates } = require('./sum');

const solve1 = () => {
  getRows()
    .then((rows) => {
      const result = sum(rows);
      console.log(`Part 1: ${result}`);
    })
    .catch(err => console.log(`There was an error\n${err}`));
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      const result = findDuplicates(rows);
      console.log(`Part 2: ${result}`);
    });
};

solve1();
solve2();
