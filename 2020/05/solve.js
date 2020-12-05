#!/usr/bin/env node

const { getRows } = require('../../utils');
const { findHighestSeatId } = require('./boardingPass');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${findHighestSeatId(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

/* const solve2 = () => {
  getRows().then((rows) => {
    console.log(`Part 2: ${decodeBoardinPass(rows)}`);
  });
}; */

solve1();
// solve2();
