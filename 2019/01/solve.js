#!/usr/bin/env/node

const { getRows } = require('../../utils');

const getFuel = (mass, part2) => {
  let fuel = Math.floor(mass / 3) - 2;
  if (part2 && (fuel > 8)) {
    fuel += getFuel(fuel, part2);
  }
  return fuel;
};

const sumFuel = (part2 = false) => getRows()
  .then(rows => rows
    .reduce((sum, mass) => {
      sum += getFuel(mass, part2);
      return sum;
    }, 0));

const solve1 = async () => console.log(`Part1: ${await sumFuel()}`);
const solve2 = async () => console.log(`Part2: ${await sumFuel(true)}`);

solve1();
solve2();

module.exports = { getFuel };
