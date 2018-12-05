#!/usr/bin/env node

const { react } = require('./polymer');
const { getRow } = require('../../utils');

const solve1 = () => {
  getRow()
    .then(data => console.log(react(data)));
};

solve1();
