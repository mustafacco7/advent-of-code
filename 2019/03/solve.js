#!/usr/bin/env/node

const { getRows } = require('../../utils');

const getInstructions = (rows) => rows.map((row) => row.split(','));

const getLines = (instructions) => {
  let horizontalLines = [];
  let verticalLines = [];
  const coordinate = [0, 0];
  instructions.forEach((instruction) => {
    const [, direction, length] = instruction.match(/([RLDU])(\d+)/);
    if (direction === 'L' || direction === 'R') {
      const distance = direction === 'R' ? Number(length) : -Number(length);
      const x1 = Math.min(coordinate[0], coordinate[0] + distance);
      const x2 = Math.max(coordinate[0], coordinate[0] + distance);
      horizontalLines = [...horizontalLines, { y: coordinate[1], x1, x2 }];
      coordinate[0] += distance;
    }
    if (direction === 'U' || direction === 'D') {
      const distance = direction === 'D' ? Number(length) : -Number(length);
      const y1 = Math.min(coordinate[1], coordinate[1] + distance);
      const y2 = Math.max(coordinate[1], coordinate[1] + distance);
      verticalLines = [...verticalLines, { x: coordinate[0], y1, y2 }];
      coordinate[1] += distance;
    }
  });

  return { horizontalLines, verticalLines };
};

const getMinDistance = (instructions) => {
  const { horizontalLines, verticalLines } = getLines(instructions[0]);
  const coordinate = [0, 0];
  let matches = [];
  instructions[1].forEach((instruction) => {
    const [, direction, length] = instruction.match(/([RLDU])(\d+)/);
    if (direction === 'L' || direction === 'R') {
      const distance = direction === 'R' ? Number(length) : -Number(length);
      const x1 = Math.min(coordinate[0], coordinate[0] + distance);
      const x2 = Math.max(coordinate[0], coordinate[0] + distance);
      const matchingLines = verticalLines.filter((line) => line.x > x1 && line.x < x2
        && line.y1 < coordinate[1] && line.y2 > coordinate[1]);
      if (matchingLines.length) {
        matches = [...matches, [matchingLines[0].x, coordinate[1]]];
      }
      coordinate[0] += distance;
    }
    if (direction === 'U' || direction === 'D') {
      const distance = direction === 'D' ? Number(length) : -Number(length);
      const y1 = Math.min(coordinate[1], coordinate[1] + distance);
      const y2 = Math.max(coordinate[1], coordinate[1] + distance);
      const matchingLines = horizontalLines.filter((line) => line.y > y1 && line.y < y2
        && line.x1 < coordinate[0] && line.x2 > coordinate[0]);
      if (matchingLines.length) {
        matches = [...matches, [coordinate[0], matchingLines[0].y]];
      }
      coordinate[1] += distance;
    }
  });
  const distances = matches.map(([x, y]) => Math.abs(x) + Math.abs(y));
  return Math.min(...distances);
};

const solve1 = () => {
  getRows()
    .then((rows) => {
      const instructions = getInstructions(rows);
      const minDistance = getMinDistance(instructions);
      console.log(minDistance);
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      const instructions = getInstructions(rows);
    });
};

solve1();
solve2();

module.exports = { getInstructions, getMinDistance };
