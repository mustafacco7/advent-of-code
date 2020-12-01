#!/usr/bin/env node

const { getNumberRows } = require('../../utils');
const { getProduct, getTrippleProducts } = require('./getProduct');

const solve1 = () => {
  getNumberRows()
    .then((rows) => {
      console.log(`Part 1: ${getProduct(rows)}`);
    })
    .catch((err) => console.log(`There was an error\n${err}`));
};

const solve2 = () => {
  getNumberRows()
    .then((rows) => {
      console.log(`Part 2: ${getTrippleProducts(rows)}`);
    });
};

solve1();
solve2();
