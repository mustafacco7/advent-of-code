#!/usr/bin/env node

const { getRows } = require('../../utils');

const parseInput = (rows) => rows.map(row => {
  let instruction;
  let number;

  if (row.startsWith('cut')) {
    instruction = 'cut';
    [, number] = row.match(/cut (-?\d+)/);
  } else if (row.startsWith('deal with')) {
    instruction = 'dealWithIncrement';
    [, number] = row.match(/deal with increment (\d+)/);
  } else {
    instruction = 'dealIntoNewStack';
  }

  return [instruction, Number(number)];
});

const dealIntoNewStack = (deck) => deck.reverse();

const cut = (deck, n) => {
  let top;
  if (n < 0) {
    top = deck.splice(n, Math.abs(n));
    return [...top, ...deck];
  }

  top = deck.splice(0, n);
  return [...deck, ...top];
};

const dealWithIncrement = (deck, n) => {
  const shuffledDeck = Array(deck.length);
  let index = 0;
  while (deck.length) {
    [shuffledDeck[index]] = deck.splice(0, 1);
    index = (index + n) % shuffledDeck.length;
  }
  return shuffledDeck;
};

const methods = {
  cut,
  dealIntoNewStack,
  dealWithIncrement,
};

const shuffle = (deck, instructions) => {
  instructions.forEach(([method, number]) => {
    deck = methods[method](deck, number);
  });
  return deck;
};

const solve1 = () => {
  getRows()
    .then((rows) => {
      const deck = Array(10007).fill(1).map((_, i) => i);
      const instructions = parseInput(rows);
      const shuffledDeck = shuffle(deck, instructions);
      console.log(shuffledDeck.indexOf(2019));
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      console.log(rows);
    });
};

solve1();
solve2();

module.exports = { dealIntoNewStack, cut, dealWithIncrement, shuffle };
