#!/usr/bin/env node
const { findMaxSquare, findReallyMaxSquare } = require('./power');

const input = 9445;
const solve1 = () => {
  console.log(findMaxSquare(input).point);
};

const solve2 = () => {
  console.log(findReallyMaxSquare(input));
};

solve1();
solve2();
