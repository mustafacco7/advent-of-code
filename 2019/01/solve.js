#!/usr/bin/env/node

const { getRows } = require('../../utils');

const solve1 = () => {
  getRows()
    .then((rows) => {
      const totalFuel = rows.reduce((sum, mass) => {
        sum += Math.floor(mass / 3) - 2;
        return sum;
      }, 0);
      console.log(`Part 1: ${totalFuel}`);
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      console.log(rows);
    });
};

solve1();
// solve2();
