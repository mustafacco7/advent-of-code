#!/usr/bin/env node

const { getRows } = require('../../utils');
const { validatePassports } = require('./validatePassports');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${validatePassports(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

/* const solve2 = () => {
  getRows().then((rows) => {
    console.log(`Part 2: ${validatePassports2(rows)}`);
  });
}; */

solve1();
// solve2();
