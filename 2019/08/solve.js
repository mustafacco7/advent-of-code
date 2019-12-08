#!/usr/bin/env/node

const { getRow } = require('../../utils');

const getImageData = ({ digits, width = 25, height = 6}) => {
  let layers = [];
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
    }
    layers = [...layers, layer];
  }
  return { layers, checksum: min.ones * min.twos };
};

const getPixel = ({ layers, layer, row, column }) => {
  const pixel = layers[layer][row][column];
  if (pixel === 2) {
    layer += 1;
    return getPixel({ layers, layer, row, column });
  }
  return pixel;
};

const renderImage = (layers) => {
  const width = layers[0][0].length;
  const height = layers[0].length;
  const image = Array(height).fill(1).map(() => Array(width).fill(''));
  return image
    .map((_, row) => image[row]
      .map((_, column) => getPixel({ layers, row, column, layer: 0 })));
};

const printImage = (image) => {
  image.forEach(row => console.log(row.map(pixel => (pixel ? '*' : '.')).join('')));
};

const solve1 = () => {
  getRow()
    .then((row) => {
      const { checksum } = getImageData({ digits: row.split('') });
      console.log(`Part 1: ${checksum}`);
    });
};

const solve2 = () => {
  getRow()
    .then((row) => {
      const { layers } = getImageData({ digits: row.split('') });
      const image = renderImage(layers);
      console.log('Part 2:');
      printImage(image);
    });
};

solve1();
solve2();

module.exports = { getImageData, renderImage };
