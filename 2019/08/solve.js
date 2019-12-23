#!/usr/bin/env/node

const { getRow, grouped, minBy } = require('../../utils');

const getItemCount = (layer, item) => layer.filter(pixel => pixel === item).length;

const getLayers = ({ digits, width = 25, height = 6 }) => grouped(digits, width * height);

const getChecksum = ({ digits, width = 25, height = 6 }) => {
  const layer = getLayers({ digits, width, height })
    .reduce(minBy((layer) => getItemCount(layer, '0')));
  return getItemCount(layer, '1') * getItemCount(layer, '2');
};

const getImageData = ({ digits, width = 25, height = 6}) => {
  let layers = [];
  while (digits.length) {
    let layer = [];
    Array(height).fill(1).forEach(() => {
      const row = digits.splice(0, width).map(Number);
      layer = [...layer, row];
    });
    layers = [...layers, layer];
  }
  return { layers };
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
      console.log(`Part 1: ${getChecksum({ digits: row.split('') })}`);
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

module.exports = { getChecksum, getImageData, renderImage };
