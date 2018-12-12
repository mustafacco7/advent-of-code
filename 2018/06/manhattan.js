const distance = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
const min = arr => Math.min.apply(null, arr);
const max = arr => Math.max.apply(null, arr);
const range = (low, high) => Array(high - low + 1).fill(1).map((_, v) => v + low);
const getCoordinates = rows => rows.map(row => row.split(',').map(v => parseInt(v, 10)));

/* eslint-disable object-curly-newline */
const findCorners = coordinatesList => coordinatesList.reduce((corners, [x, y]) => {
  const { x1, y1, x2, y2 } = corners;
  return {
    x1: Math.min(x, x1),
    y1: Math.min(y, y1),
    x2: Math.max(x, x2),
    y2: Math.max(y, y2),
  };
}, { x1: Number.MAX_VALUE, y1: Number.MAX_VALUE, x2: -1, y2: -1 });


const findLargestArea = (rows) => {
  const minDistances = {};
  const coordinates = getCoordinates(rows);
  const corners = findCorners(coordinates);
  const { x1, y1, x2, y2 } = corners;
  range(x1, x2).forEach((x) => {
    range(y1, y2).forEach((y) => {
      const distances = coordinates.map(pair => distance(pair, [x, y]));
      const minDistance = min(distances);
      if (distances.filter(d => d === minDistance).length === 1) {
        minDistances[`${x},${y}`] = distances.indexOf(minDistance);
      }
    });
  });

  const useful = Object.entries(minDistances).reduce((acc, [coord, node]) => {
    const [x, y] = coord.split(',').map(v => +v);
    if ((x > x1 && x < x2 && y > y1 && y < y2)) {
      acc[node] = acc[node] ? acc[node] + 1 : 1;
    } else {
      delete acc[node];
    }
    return acc;
  }, {});

  return max(Object.values(useful));
};

const findClosestArea = (rows, maxSize) => {
  const distances = {};
  const coordinates = getCoordinates(rows);
  const corners = findCorners(coordinates);
  const { x1, y1, x2, y2 } = corners;
  range(x1, x2).forEach((x) => {
    range(y1, y2).forEach((y) => {
      const dist = coordinates.reduce((sum, point) => {
        sum += distance(point, [x, y]);
        return sum;
      }, 0);
      if (dist < maxSize) {
        distances[`${x},${y}`] = dist;
      }
    });
  });
  return Object.entries(distances).length;
};

module.exports = { findLargestArea, findClosestArea };
