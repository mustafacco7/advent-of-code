const findOverlaps = (data) => {
  const grid = {};
  const touched = {};
  data.map((datum) => {
    const [, id, x, y, w, h] = datum.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    touched[id] = false;
    return [id, x, y, w, h].map(n => parseInt(n, 10));
  })
    .forEach(([id, x, y, w, h]) => {
      for (let i = x; i < x + w; i += 1) {
        for (let j = y; j < y + h; j += 1) {
          const currentValue = grid[`${i},${j}`];
          if (currentValue) {
            touched[currentValue] = true;
            touched[id] = true;
            grid[`${i},${j}`] = 'X';
          } else {
            grid[`${i},${j}`] = id;
          }
        }
      }
    });
  const [intact] = Object.entries(touched).filter(([, value]) => !value);

  return [Object.values(grid).filter(entry => entry === 'X').length, intact];
};

module.exports = { findOverlaps };
