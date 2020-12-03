#!/usr/bin/env node

const { getRows } = require('../../utils');
const findTrees = require('./findTrees');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${findTrees(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

/* const solve2 = () => {
  getRows().then((rows) => {
    console.log(`Part 2: ${validatePasswords2(rows)}`);
  });
}; */

solve1();
//solve2();
