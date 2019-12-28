#!/usr/bin/env node

const { getRows } = require('../../utils');

const getNumberOfOrbits = (orbits, name) => (orbits[name] ? 1 + getNumberOfOrbits(orbits, orbits[name]) : 0);

const getOrbits = (input) => input
  .map((orbit) => orbit.split(')'))
  .reduce((acc, [inner, outer]) => ({ ...acc, [outer]: inner }), {});

const countOrbits = (orbits) => Object.keys(orbits)
  .map(name => getNumberOfOrbits(orbits, name))
  .reduce((a, b) => a + b, 0);

const createGraph = (orbits) => Object.entries(orbits)
  .reduce((acc, [outer, inner]) => {
    acc[outer] = acc[outer] ? [...acc[outer], inner] : [inner];
    acc[inner] = acc[inner] ? [...acc[inner], outer] : [outer];
    return acc;
  }, {});

const findShortestDistance = (rows, start = 'YOU', end = 'SAN') => {
  const graph = createGraph(getOrbits(rows));
  const nodes = new Set(Object.keys(graph));
  const distances = [...nodes].reduce((acc, node) => {
    acc[node] = Infinity;
    return acc;
  }, {});

  distances[start] = 0;

  while (nodes.size) {
    const closest = [...nodes].reduce((a, b) => (distances[b] < distances[a] ? b : a));
    nodes.delete(closest);
    graph[closest].forEach((neighbor) => {
      const distance = distances[closest] + 1;
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
      }
    });
  }
  return distances[end] - 2;
};

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
      console.log(`Part 2: ${findShortestDistance(rows, 'YOU', 'SAN')}`);
    });
};

solve1();
solve2();

module.exports = { countOrbits, getOrbits, findShortestDistance };
