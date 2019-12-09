#!/usr/bin/env/node

const { getRows } = require('../../utils');

const directions = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
};

const key = ({ x, y }) => `${x},${y}`;
const unkey = (key) => [key.split(',').map(Number)].map(([x, y]) => ({ x, y }));

const manhattanDistance = ({ x, y }) => Math.abs(x) + Math.abs(y);
const travelDistance = (wire, point) => wire.indexOf(key(point)) + 1;

const getMoves = (wires) => wires
  .map((wire) => wire
    .split(',')
    .map(move => move.match(/([RLDU])(\d+)/u))
    .map(([, direction, distance]) => ({ direction, distance: Number(distance) })));

const getPoints = (wire) => {
  const position = { x: 0, y: 0 };
  return wire.reduce((arr, { direction, distance }) => {
    Array(distance).fill(1).forEach(() => {
      const { x, y } = directions[direction];
      position.x += x;
      position.y += y;
      arr.push(key(position));
    });
    return arr;
  }, []);
};

const findIntersections = (wires) => {
  const sets = wires.map(wire => new Set(wire));
  return wires[0]
    .filter(value => sets
      .every(wire => wire.has(value)))
    .map(unkey)
    .flat();
};

const getMinDistance = (instructions) => Math.min(
  ...findIntersections(
    getMoves(instructions).map(getPoints),
  )
    .map(manhattanDistance),
);

const getMinSteps = (instructions) => {
  const wires = getMoves(instructions).map(getPoints);
  return Math.min(
    ...findIntersections(wires)
      // eslint-disable-next-line no-return-assign
      .map((point) => wires.map((wire) => travelDistance(wire, point)).reduce((sum, distance) => sum += distance, 0)),
  );
};

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 1: ${getMinDistance(rows)}`);
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      console.log(`Part 2: ${getMinSteps(rows)}`);
    });
};

solve1();
solve2();

module.exports = { getMinDistance, getMinSteps };
