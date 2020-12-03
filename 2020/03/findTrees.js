const findTrees = (forest, movement = { dx: 3, dy: 1 }) => {
  const height = forest.length;
  const width = forest[0].length;
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

const findMultipleTrees = (forest) => {
  const movements = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ];

  const allTrees = movements.map((movement) => findTrees(forest, movement));
  return allTrees.reduce((product, trees) => product * trees, 1);
};

module.exports = { findTrees, findMultipleTrees };
