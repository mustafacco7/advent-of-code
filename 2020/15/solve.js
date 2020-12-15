#!/usr/bin/env node

const { util1 } = require('./utils');

const input = '20,9,11,0,1,2';

const solve1 = () => {
  console.log(`Part 1: ${util1(input, 2020)}`);
};

const solve2 = () => {
  console.log(`Part 2: ${util1(input, 30000000)}`);
};

solve1();
solve2();
