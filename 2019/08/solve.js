#!/usr/bin/env/node

const { getRow } = require('../../utils');

const getImageData = ({ digits, width, height }) => {
  let image = [];
  const min = { zeros: Infinity, ones: 0, twos: 0 };
  while (digits.length) {
    let layer = [];
    let zeros = 0;
    let ones = 0;
    let twos = 0;
    Array(height).fill(1).forEach(() => {
      const row = digits.splice(0, width).map(Number);
      zeros += row.filter(number => number === 0).length;
      ones += row.filter(number => number === 1).length;
      twos += row.filter(number => number === 2).length;
      layer = [...layer, row];
    });
    if (zeros < min.zeros) {
      min.zeros = zeros;
      min.ones = ones;
      min.twos = twos;
      console.log(min);
    }
    image = [...image, layer];
  }
  console.log(image);
  return min.ones * min.twos;
};

const solve1 = () => {
  getRow()
    .then((digits) => {
      const width = 25;
      const height = 6;
      const product = getImageData({ digits: digits.split(''), width, height });
      console.log(`Part 1: ${product}`);
    });
};

const solve2 = () => {
  getRow()
    .then((rows) => {
      //console.log(rows);
    });
};

solve1();
solve2();

module.exports = { getImageData };
