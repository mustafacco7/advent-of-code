const getNumberOfTiles = (rows) => {
  let minY = Number.MAX_VALUE;
  let maxY = 0;
  const grid = [];
  rows.map((row) => {

    const [, coord, value, , start, stop] = row.match(/(x|y)=(\d+), (x|y)=(\d+)\.\.(\d+)/);
    if (coord === 'x') {
      const x = +value;
      const y1 = +start;
      const y2 = +stop;
      for (let y = y1; y <= y2; y += 1) {
        grid[y] = grid[y] || [];
        grid[y][x] = true;
      }
      minY = Math.min(minY, y1);
      maxY = Math.max(maxY, y2);
    } else {
      const y = +value;
      const x1 = +start;
      const x2 = +stop;
      for (let x = x1; x <= x2; x += 1) {
        grid[y] = grid[y] || [];
        grid[y][x] = true;
      }
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  });
  console.log(grid, minY, maxY);
  const spring = { x: 500, y: 0 };
};


module.exports = { getNumberOfTiles };
