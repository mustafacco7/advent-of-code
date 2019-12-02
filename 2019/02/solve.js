#!/usr/bin/env/node

const { getRow } = require('../../utils');

const add = (arr, currentIndex) => {
  arr[arr[currentIndex + 3]] = arr[arr[currentIndex + 1]] + arr[arr[currentIndex + 2]];
  return arr;
};

const multiply = (arr, currentIndex) => {
  arr[arr[currentIndex + 3]] = arr[arr[currentIndex + 1]] * arr[arr[currentIndex + 2]];
  return arr;
};

const operations = {
  1: add,
  2: multiply,
};

const step = (program, currentIndex = 0) => {
  if (operations[program[currentIndex]]) {
    program = operations[program[currentIndex]](program, currentIndex);
    currentIndex += 4;
    step(program, currentIndex);
  }
  return program;
};

const solve1 = () => {
  getRow()
    .then((row) => {
      const program = row.split(',').map(i => Number(i));
      program[1] = 12;
      program[2] = 2;
      console.log(`Part 1: ${step(program, 0)[0]}`);
    });
};

const solve2 = () => {
  getRow()
    .then((row) => {
      //console.log(row);
    });
};

solve1();
//solve2();

module.exports = { step };
