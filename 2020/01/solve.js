#!/usr/bin/env node

const { getRows } = require('../../utils');
const { getProduct } = require('./getProduct');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${getProduct(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

/* const solve2 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 2: ${findDuplicates(rows)}`);
    });
}; */

solve1();
// solve2();
