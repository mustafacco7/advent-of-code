#!/usr/bin/env/node

const getNumbers = (i) => (`${i}`).split('').map(n => Number(n));

const isIncreasing = (i) => {
  const numbers = getNumbers(i);
  // eslint-disable-next-line prefer-const
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
  const numbers = getNumbers(i);
  // eslint-disable-next-line prefer-const
  let [current, ...rest] = numbers;
  return rest.some((number) => {
    if (current === number) {
      return true;
    }
    current = number;
    return false;
  });
};

const isValid = (i) => isIncreasing(i) && isAdjacent(i);

const solve1 = () => {
  const start = 359282;
  const end = 820401;
  let matches = 0;

  for (let i = start; i <= end; i += 1) {
    if (isValid(i)) {
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
