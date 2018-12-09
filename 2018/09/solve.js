#!/usr/bin/env node

const { getRow } = require('../../utils');
const { findHighScore, findHighestScore } = require('./marble');

const solve1 = () => {
  getRow()
    .then(data => console.log(findHighScore(data)));
};

const solve2 = () => {
  getRow()
    .then(data => console.log(findHighestScore(data)));
};

solve1();
solve2();
