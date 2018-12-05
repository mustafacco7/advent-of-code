#!/usr/bin/env node

const { react, remove } = require('./polymer');
const { getRow } = require('../../utils');

const solve1 = () => {
  getRow()
    .then(data => console.log(react(data)));
};

const solve2 = () => {
  getRow()
    .then(data => console.log(remove(data)));
};

solve1();
solve2();
