#!/usr/bin/env/node

const { getRow } = require('../../utils');

const parseInput = (row) => row.split('').map(Number);

const applyFFT = (signal, step) => {
  const basePattern = [0, 1, 0, -1];
  const pattern = basePattern.reduce((acc, number) => {
    acc = [...acc, ...Array(step).fill(number)];
    return acc;
  }, []);
  pattern.push(pattern.shift());
  const sum = signal.reduce((acc, number, index) => {
    acc += number * pattern[index % pattern.length];
    return acc;
  }, 0);

  return Math.abs(Number(sum.toString().split('').reverse()[0]));
};

const solve1 = () => {
  getRow()
    .then((row) => {
      let signal = parseInput(row);
      const numberOfPhases = 100;
      Array(numberOfPhases).fill(1).forEach(() => {
        signal = Array(row.length).fill(1).reduce((acc, _, index) => {
          acc += applyFFT(signal, index + 1);
          return acc;
        }, '')
          .toString()
          .split('')
          .map(Number);
      });
      console.log(`Part 1: ${signal.slice(0, 8).join('')}`);
    });
};

const solve2 = () => {
  getRow()
    .then((row) => {
      console.log(row);
    });
};

solve1();
solve2();
