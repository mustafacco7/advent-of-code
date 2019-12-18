#!/usr/bin/env/node
const { getRow } = require('../../utils');
const { run } = require('../intcode/intcode');

const solve1 = () => {
  getRow()
    .then((row) => {
      const program = row.split(',').map(i => Number(i));
      program[1] = 12;
      program[2] = 2;
      console.log(`Part 1: ${run(program)[0]}`);
    });
};

const solve2 = () => {
  getRow()
    .then((row) => {
      const input = row.split(',').map(i => Number(i));
      const goal = 19690720;

      const nouns = Array(100)
        .fill(1)
        .map((_, i) => i);

      const verbs = [...nouns];

      nouns.some((noun) => verbs
        .some((verb) => {
          // Clone the input so we have a fresh start on every run
          const program = [...input];
          program[1] = noun;
          program[2] = verb;
          if (goal === run(program)[0]) {
            console.log(`Part 2: ${100 * noun + verb}`);
            return true;
          }
          return false;
        }));
    });
};

solve1();
solve2();
