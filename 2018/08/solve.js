#!/usr/bin/env node

const { getRow } = require('../../utils');
const { findChecksum, findRootNodeValue } = require('./checksum');

const solve1 = () => {
  getRow()
    .then(data => console.log(findChecksum(data)));
};

const solve2 = () => {
  getRow()
    .then(data => console.log(findRootNodeValue(data)));
};

solve1();
solve2();
