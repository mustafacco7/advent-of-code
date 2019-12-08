#!/usr/bin/env/node

const { getRows } = require('../../utils');

const getMoves = (wires) => wires
  .map((wire) => wire.split(',')
    .map(move => move.match(/([RLDU])(\d+)/u))
    .map(([, direction, distance]) => ({ direction, distance: Number(distance) })));

const directions = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
};

const key = ({ x, y }) => `${x},${y}`;

const plotWires = (moves) => {
  const wires = {};
  moves.forEach((instructions, wire) => {
    const position = { x: 0, y: 0 };
    instructions.forEach(({ direction, distance }) => {
      Array(distance).fill(1).forEach(() => {
        const { x, y } = directions[direction];
        position.x += x;
        position.y += y;
        // We don't count intersections between the same wire
        if (wires[key(position)] && wires[key(position)].includes(wire)) {
          return;
        }
        wires[key(position)] = wires[key(position)] ? [...wires[key(position)], wire] : [wire];
      });
    });
  });

  return wires;
};

const findIntersections = (wires) => Object
  .entries(wires)
  .filter(([, hits]) => hits.length > 1)
  .map(([coordinate]) => coordinate
    .split(',')
    .map(Number));

const getMinDistance = (instructions) => {
  const moves = getMoves(instructions);
  const wires = plotWires(moves);
  const intersections = findIntersections(wires);
  const distances = intersections.map(([x, y]) => Math.abs(x) + Math.abs(y));
  return Math.min(...distances);
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
      const instructions = getMoves(rows);
    });
};

solve1();
solve2();

module.exports = { getMinDistance };
