#!/usr/bin/env/node

const isIncreasing = (i) => {
  const numbers = (`${i}`).split('').map(n => Number(n));
  let [current, ...rest] = numbers;
  const notIncreasing = rest.some((number) => {
    if (number >= current) {
      current = number;
      return false;
    }

    return true;
  });

  return !notIncreasing;
};

const isAdjacent = (i) => {
  const numbers = (`${i}`).split('').map(n => Number(n));
  let [current, ...rest] = numbers;
  const isAdjacent = rest.some((number) => {
    if (current === number) {
      return true;
    }
    current = number;
    return false;
  });

  return isAdjacent;
};

const isValid = (i) => isIncreasing(i) && isAdjacent(i);

const solve1 = () => {
  const start = 359282;
  const end = 820401;
  let matches = 0;

  for (let i = start; i <= end; i += 1) {
    if (isValid(i)) {
      console.log(i);
      matches += 1;
    }
  }
  console.log(`Part 1: ${matches}`);

};

const solve2 = () => {

};

solve1();
solve2();

module.exports = { isValid };
