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

const getNeighbours = (grid, x, y) => {
  const [x1, x2, y1, y2] = getBoundaries(grid, x, y);
  const neighbours = {};
  for (let yy = y1; yy <= y2; yy += 1) {
    for (let xx = x1; xx <= x2; xx += 1) {
      if (!(xx === x && yy === y)) {
        const cell = grid[yy][xx];
        neighbours[cell] = neighbours[cell] ? neighbours[cell] + 1 : 1;
      }
    }
  }
  return neighbours;
};

const getNumberOfTypeForNeighbours = (neighbours, type) => Object.entries(neighbours).reduce((sum, [cell, count]) => {
  if (cell === type) {
    sum += count;
  }
  return sum;
}, 0);


const getNewCell = (cell, neighbours) => {
  const transitions = {
    '.': neighbours => getNumberOfTypeForNeighbours(neighbours, '|') > 2 ? '|' : '.',
    '|': neighbours => getNumberOfTypeForNeighbours(neighbours, '#') > 2 ? '#' : '|',
    '#': (neighbours) => {
      if (getNumberOfTypeForNeighbours(neighbours, '#') > 0 && getNumberOfTypeForNeighbours(neighbours, '|') > 0) {
        return '#';
      }

      return '.';
    },
  };

  return transitions[cell](neighbours);
};


const getNumberOfTypeForGrid = (grid, type) => grid.reduce((sum, row) => {
  row.forEach((cell) => {
    if (cell === type) {
      sum += 1;
    }
  });
  return sum;
}, 0);

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
        const neighbours = getNeighbours(grid, x, y);
        const newCell = getNewCell(grid[y][x], neighbours);
        newGrid[y].push(newCell);
      }
    }
    grid = newGrid;
  }

  const trees = getNumberOfTypeForGrid(grid, '|');
  const lumberYards = getNumberOfTypeForGrid(grid, '#');
  return trees * lumberYards;
};


module.exports = { calculateLumber };
