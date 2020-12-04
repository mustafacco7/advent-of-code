#!/usr/bin/env node
const { getNumberOfTiles } = require('./water');
const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then((data) => {
      console.log(getNumberOfTiles(data));
    });
};

// const solve2 = () => {
//   getRows()
//     .then((data) => {
//       console.log(calculatePart2(data));
//     });
// };


solve1();
// solve2();
