#!/usr/bin/env node

const { findTheMessage } = require('./stars');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then(data => console.log(findTheMessage(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log((data)));
};

solve1();
//solve2();
