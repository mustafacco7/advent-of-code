const fs = require('fs');
let path = require('path');

const maxDistance = 100;
const maxSteps = 10;

const getBoundaries = (stars) => {
  let minX = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let minY = Number.MAX_VALUE;
  let maxY = Number.MIN_VALUE;

  stars.forEach(([x, y]) => {
    minX = Math.min(x, minX);
    maxX = Math.max(x, maxX);
    minY = Math.min(y, minY);
    maxY = Math.max(y, maxY);
  });

  const gridWidth = maxX - minX;
  const gridHeight = maxY - minY;
  const offsetX = Math.abs(minX);
  const offsetY = Math.abs(minY);
  return [minX, minY, maxX, maxY, gridWidth, gridHeight];
};

const createGrid = (gridWidth, gridHeight) => {
  const grid = [];
  for (let i = 0; i < gridHeight; i += 1) {
    grid.push([]);
    for (let j = 0; j < gridWidth; j += 1) {
      grid[i].push('.');
    }
  }
  return grid;
};


const printGrid = (grid) => {
  let string = '';
  grid.forEach((innerGrid) => {
    innerGrid.forEach((star) => {
      string += star;
    });
    string += '\n';
  });
  console.log(string);
};

const plotStarsOnGrid = (stars) => {
  const [gridWidth, gridHeight, offsetX, offsetY] = getBoundaries(stars);
  console.log(gridWidth, gridHeight, offsetX, offsetY);
  if (gridWidth < maxDistance && gridHeight < maxDistance) {
    const grid = createGrid(gridWidth, gridHeight);
    stars.forEach(([x, y]) => {
      grid[y + offsetY][x + offsetX] = '*';
    });
    printGrid(grid);
  }
};

const calculateNextStarState = stars => stars.reduce((res, [x, y, dx, dy]) => {
  x += dx;
  y += dy;
  res.push([x, y, dx, dy]);
  res.push([x, y, dx, dy]);
  return res;
}, []);


const findMessage = (rows) => {
  let stars = rows.map((row) => {
    /* eslint-disable-next-line max-len */
    const [, x, y, dX, dY] = row.match(/position=<\s?(-?\d+), \s?(-?\d+)> velocity=<\s?(-?\d+), \s?(-?\d+)>/).map(v => +v);
    return [x, y, dX, dY];
  });

  plotStarsOnGrid(stars);

  let j = 0;
  while (j < maxSteps) {
    let [minPx, maxPx, minPy, maxPy] = [stars[0][0], stars[0][0], stars[0][1], stars[0][1]];

    const drawn = new Set();
    stars.forEach(([x, y]) => {
      if (x > maxPx) {
        maxPx = x;
      }

      if (x < minPx) {
        minPx = x;
      }

      if (y > maxPy) {
        maxPy = y;
      }

      if (y < minPy) {
        minPy = y;
      }

      drawn.add(`${x},${y}`);
    });

    console.log(minPx, maxPx, minPy, maxPy);
    if ((maxPx - minPx < maxDistance) && (maxPy - minPy < maxDistance)) {
      console.log(j);
      plotStarsOnGrid(stars);
    }
    stars = calculateNextStarState(stars);

    j += 1;
  }

};

const findTheMessage = (rows) => {
  const points = rows.map((row) => {
    /* eslint-disable-next-line max-len */
    const [, x, y, xVel, yVel] = row.match(/position=<\s?(-?\d+), \s?(-?\d+)> velocity=<\s?(-?\d+), \s?(-?\d+)>/).map(v => +v);
    return { x, y, xVel, yVel };
  });

  let lastArea = Infinity;

  let minX = Math.min.apply(null, points.map(p => p.x));
  let maxX = Math.max.apply(null, points.map(p => p.x));
  let minY = Math.min.apply(null, points.map(p => p.y));
  let maxY = Math.max.apply(null, points.map(p => p.y));

  let currentArea = (maxX - minX) * (maxY - minY);

  let time = -1;
  while(currentArea < lastArea) {
    lastArea = currentArea;

    time += 1;
    for(let point of points) {
      point.x += point.xVel;
      point.y += point.yVel;
    }

    minX = Math.min.apply(null, points.map(p => p.x));
    maxX = Math.max.apply(null, points.map(p => p.x));
    minY = Math.min.apply(null, points.map(p => p.y));
    maxY = Math.max.apply(null, points.map(p => p.y));

    currentArea = (maxX - minX) * (maxY - minY);
  }

  for(let i = 0; i < 1; i++) {
    for(let point of points) {
      point.x -= point.xVel;
      point.y -= point.yVel;
    }
  }

  minX = Math.min.apply(null, points.map(p => p.x));
  maxX = Math.max.apply(null, points.map(p => p.x));
  minY = Math.min.apply(null, points.map(p => p.y));
  maxY = Math.max.apply(null, points.map(p => p.y));

  let grid = [];
  for(let x = 0; x <= maxX - minX; x++) {
    grid.push([]);
  }


  for(let point of points) {
    grid[point.x - minX][point.y - minY] = true;
  }

  let letterMaps = [];

  for(let i = 0; i < maxX - minX; i+=8) {
    let letterMap = [];

    for(let y = 0; y <= maxY - minY; y++) {
      letterMap.push([]);
      for(let x = 0; x < 6; x++) {
        letterMap[y].push(!!grid[x + i][y]);
      }
    }

    letterMaps.push(letterMap);
  }

  let file = fs.readFileSync(path.resolve(__dirname, 'letters.txt'), 'utf-8');
  let letterLines = file.trim().split('\n');

  let letterData = {};
  while(letterLines.length) {
    let char = letterLines.shift();
    let d = [];
    for(let y = 0; y < 10; y++) {
      let line = letterLines.shift();
      d.push([].map.call(line, (c) => c === '#'));
    }
    letterData[char] = d;
  }

  let result = '';

  letterLoop: for(let letter of letterMaps) {
    charLoop: for(let char in letterData) {
      for(let x = 0; x < letterData[char].length; x++) {
        for(let y = 0; y < letterData[char][x].length; y++) {
          if(letter[x][y] !== letterData[char][x][y])  {
            continue charLoop;
          }
        }
      }
      result += char;
      continue letterLoop;
    }

    console.log('unrecognized letter data');
    console.log(letter);
  }

  console.log(result);
  console.log(time);
  return result;
};

module.exports = { findTheMessage };
