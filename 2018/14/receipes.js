/* eslint-disable */
const { printDebug, printTotal } = require('./debug');

const toArray = (number) => number.toString().split('');
const updatePositions = (elves, scores) =>
  elves.map(({ index, score }) => {
    const newIndex = (index + 1 + score) % scores.length;
    return { index: newIndex, score: +scores[newIndex] };
  });

const findScore = (input, steps, debug) => {
  let scores = toArray(input);
  let elves = [
    {
      index: 0,
      score: +scores[0],
    },
    {
      index: 1,
      score: +scores[1],
    },
  ];

  printDebug(elves, scores, debug);

  const total = [];

  while (scores.length < steps + 10) {
    const sum = elves.reduce((sum, elf) => {
      sum += parseInt(elf.score, 10);
      return sum;
    }, 0);

    scores = [...scores, ...toArray(sum)];
    elves = updatePositions(elves, scores);
    total.push(scores);
    printDebug(elves, scores, debug);
  }

  printTotal(total, debug);
  return scores.slice(steps, steps + 10).join('');
};

const testa = () => {
  const input = 880751;
  const recipes = [3, 7];
  let e1 = 0;
  let e2 = 1;

  while (recipes.length <= input + 10) {
    const sum = recipes[e1] + recipes[e2];
    for (const ch of sum.toString().split('')) {
      recipes.push(parseInt(ch, 10));
    }
    e1 += 1 + recipes[e1];
    e1 %= recipes.length;
    e2 += 1 + recipes[e2];
    e2 %= recipes.length;
  }

  let s = '';
  for (let i = input; i < input + 10; ++i) {
    s += recipes[i];
  }
  console.log(s);
};

const testa2 = () => {
  const recipes = [3, 7];
  let e1 = 0;
  let e2 = 1;

  while (recipes.length <= 30000000) {
    const sum = recipes[e1] + recipes[e2];
    for (const ch of sum.toString().split('')) {
      recipes.push(parseInt(ch, 10));
    }
    e1 += 1 + recipes[e1];
    e1 %= recipes.length;
    e2 += 1 + recipes[e2];
    e2 %= recipes.length;
  }

  const input = `880751`;
  for (let i = 0; i < recipes.length - 6; ++i) {
    if (
      recipes[i] == input[0] &&
      recipes[i + 1] == input[1] &&
      recipes[i + 2] == input[2] &&
      recipes[i + 3] == input[3] &&
      recipes[i + 4] == input[4] &&
      recipes[i + 5] == input[5]
    ) {
      console.log(i);
      break;
    }
  }
};

module.exports = { findScore, testa, testa2 };
