#!/usr/bin/env node
const { calculate, calculatePart2 } = require('./opcodes');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then((data) => {
      console.log(calculate(data));
    });
};

const solve2 = () => {
  getRows()
    .then((data) => {
      console.log(calculatePart2(data));
    });
};


solve1();
solve2();
