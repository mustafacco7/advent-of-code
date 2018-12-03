#!/usr/bin/env node

const { getRows } = require('../../utils');
const { checksum, findMatchingId } = require('./checksum');

const solve1 = () => {
  getRows()
    .then(data => console.log(checksum(data)));
};

const solve2 = () => {
  getRows()
    .then(data => console.log(findMatchingId(data)));
};

solve1();
solve2();
