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

const run = (program, instructionPointer = 0) => {
  if (operations[program[instructionPointer]]) {
    program = operations[program[instructionPointer]](program, instructionPointer);
    instructionPointer += 4;
    run(program, instructionPointer);
  }
  return program;
};

const solve1 = () => {
  getRow()
    .then((row) => {
      const program = row.split(',').map(i => Number(i));
      program[1] = 12;
      program[2] = 2;
      console.log(`Part 1: ${run(program, 0)[0]}`);
    });
};

const solve2 = () => {
  getRow()
    .then((row) => {
      const goal = 19690720;

      const nouns = Array(100)
        .fill(1)
        .map((_, i) => i);

      const verbs = Array(100)
        .fill(1)
        .map((_, i) => i);

      nouns.some((noun) => verbs
        .some((verb) => {
          const program = row.split(',')
            .map(i => Number(i));
          program[1] = noun;
          program[2] = verb;
          const result = run(program, 0)[0];
          if (result === goal) {
            console.log(`Part 2: ${100 * noun + verb}`);
            return true;
          }
          return false;
        }));
    });
};

solve1();
solve2();

module.exports = { run };
