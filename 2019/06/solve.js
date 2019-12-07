#!/usr/bin/env/node

const { getRows } = require('../../utils');

const getNumberOfOrbits = (orbits, name) => (orbits[name] ? 1 + getNumberOfOrbits(orbits, orbits[name]) : 0);

const getOrbits = (input) => input
  .map((orbit) => orbit.split(')'))
  .reduce((acc, [inner, outer]) => ({ ...acc, [outer]: inner }), {});

const countOrbits = (orbits) => Object.keys(orbits)
  .map(name => getNumberOfOrbits(orbits, name))
  .reduce((a, b) => a + b, 0);

const solve1 = () => {
  getRows()
    .then((rows) => {
      const count = countOrbits(getOrbits(rows));
      console.log(`Part 1: ${count}`);
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {

    });
};

solve1();
solve2();

module.exports = { countOrbits, getOrbits };
