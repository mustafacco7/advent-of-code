#!/usr/bin/env/node

const { getRows } = require('../../utils');

const getFuel = (mass) => {
  let fuel = Math.floor(mass / 3) - 2;
  if (fuel > 8) {
    fuel += getFuel(fuel);
  }
  return fuel;
};

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
      const totalFuel = rows.reduce((sum, mass) => {
        sum += getFuel(mass);
        return sum;
      }, 0);
      console.log(`Part 2: ${totalFuel}`);
    });
};

solve1();
solve2();
