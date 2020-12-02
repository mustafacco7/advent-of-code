#!/usr/bin/env node

const { getRows } = require('../../utils');
const { validatePasswords, validatePasswords2 } = require('./passwords');

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${validatePasswords(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

const solve2 = () => {
  getRows().then((rows) => {
    console.log(`Part 2: ${validatePasswords2(rows)}`);
  });
};

solve1();
solve2();
