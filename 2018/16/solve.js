#!/usr/bin/env node
const { calculate } = require('./opcodes');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then((data) => {
      console.log(calculate(data));
    });
};


solve1();
