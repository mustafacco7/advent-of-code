const findTrees = (forest) => {
  const height = forest.length;
  const width = forest[0].length;
  const movement = { dx: 3, dy: 1 };
  const position = { x: 0, y: 0 };
  let numberOfTrees = 0;
  while (position.y < height) {
    const x = position.x % width;
    const { y } = position;
    if (forest[y][x] === '#') {
      numberOfTrees += 1;
    }
    position.x += movement.dx;
    position.y += movement.dy;
  }
  return numberOfTrees;
};

module.exports = findTrees;
