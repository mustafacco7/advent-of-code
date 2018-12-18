#!/usr/bin/env node
const { calculateLumber } = require('./lumber');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then((data) => {
      console.log(calculateLumber(data));
    });
};
const solve2 = () => {
  getRows()
    .then((data) => {
      console.log(calculateLumber(data, 1000));
    });
};

solve1();
solve2();
