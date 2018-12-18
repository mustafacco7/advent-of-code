/* eslint-disable no-confusing-arrow */
const getBoundaries = (grid, x, y) => {
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;
  const x1 = Math.max(0, x - 1);
  const x2 = Math.min(maxX, x + 1);
  const y1 = Math.max(0, y - 1);
  const y2 = Math.min(maxY, y + 1);
  return [x1, x2, y1, y2];
};

const getAdjacent = (grid, x, y) => {
  const [x1, x2, y1, y2] = getBoundaries(grid, x, y);
  const adjacent = {};
  for (let yy = y1; yy <= y2; yy += 1) {
    for (let xx = x1; xx <= x2; xx += 1) {
      if (!(xx === x && yy === y)) {
        const cell = grid[yy][xx];
        adjacent[cell] = adjacent[cell] ? adjacent[cell] + 1 : 1;
      }
    }
  }
  return adjacent;
};

const numberOfTrees = adjacents => Object.entries(adjacents).reduce((sum, [cell, count]) => {
  if (cell === '|') {
    sum += count;
  }
  return sum;
}, 0);

const numberOfLumberYards = adjacents => Object.entries(adjacents).reduce((sum, [cell, count]) => {
  if (cell === '#') {
    sum += count;
  }
  return sum;
}, 0);


const getNewCell = (cell, adjacents) => {
  const transitions = {
    '.': adjacents => numberOfTrees(adjacents) > 2 ? '|' : '.',
    '|': adjacents => numberOfLumberYards(adjacents) > 2 ? '#' : '|',
    '#': (adjacents) => {
      if (numberOfLumberYards(adjacents) > 0 && numberOfTrees(adjacents) > 0) {
        return '#';
      }

      return '.';
    },
  };

  return transitions[cell](adjacents);
};


const getNumberOftrees = grid => grid.reduce((sum, row, y) => {
  row.forEach((cell) => {
    if (cell === '|') {
      sum += 1;
    }
  });
  return sum;
}, 0);

const getNumberOfLumberYards = grid => grid.reduce((sum, row, y) => {
  row.forEach((cell) => {
    if (cell === '#') {
      sum += 1;
    }
  });
  return sum;
}, 0);


const printGrid = (grid) => {
  /*const string = grid.reduce((string, row) => {
    row.forEach((cell) => {
      string += cell
    });
    string += '\n';
    return string;
  }, '');
*/
  const trees = getNumberOftrees(grid);
  const lumberYards = getNumberOfLumberYards(grid);
  console.log(trees * lumberYards);
};

const calculateLumber = (rows, numberOfMinutes = 10) => {
  let grid = rows.reduce((grid, row, y) => {
    grid[y] = [];
    row.split('').forEach((cell) => {
      grid[y].push(cell);
    });
    return grid;
  }, []);

  const maxY = grid.length;
  const maxX = grid[0].length;
  for (let minute = 0; minute < numberOfMinutes; minute += 1) {
    const newGrid = [];
    for (let y = 0; y < maxY; y += 1) {
      newGrid[y] = [];
      for (let x = 0; x < maxX; x += 1) {
        const adjacents = getAdjacent(grid, x, y);
        const newCell = getNewCell(grid[y][x], adjacents);
        newGrid[y].push(newCell);
      }
    }
    grid = newGrid;
    printGrid(grid);
  }

  const trees = getNumberOftrees(grid);
  const lumberYards = getNumberOfLumberYards(grid);
  return trees * lumberYards;
};


module.exports = { calculateLumber };
