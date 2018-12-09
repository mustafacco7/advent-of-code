#!/usr/bin/env node

const { findOrder } = require('./sleigh');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findOrder(data)));
};

/* const solve2 = () => {
  getRows()
    .then(data => console.log((data)));
}; */

solve1();
// solve2();
