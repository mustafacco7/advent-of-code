const findOverlaps = (data) => {
  const grid = {};
  data.map((datum) => {
    const [, id, x, y, w, h] = datum.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    return [id, parseInt(x, 10), parseInt(y, 10), parseInt(w, 10), parseInt(h, 10)];
  })
    .forEach(([id, x, y, w, h]) => {
      for (let i = x; i < x + w; i += 1) {
        for (let j = y; j < y + h; j += 1) {
          grid[`${i},${j}`] = grid[`${i},${j}`] ? 'X' : id;
        }
      }
    });

  return Object.values(grid).filter(entry => entry === 'X').length;
};

module.exports = { findOverlaps };
