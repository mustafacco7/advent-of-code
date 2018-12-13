#!/usr/bin/env node
const { getRows } = require('../../utils');
const { findCrash } = require('./cart');

const solve1 = () => {
  getRows()
    .then(data => console.log(findCrash(data)));
};
const solve2 = () => {
  getRows()
    .then(data => console.log((data)));
};

solve1();
//solve2();
// 44,88
