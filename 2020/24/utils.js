const directions = {
  ne: { dx: 1, dy: -1 },
  e: { dx: 2, dy: 0 },
  se: { dx: 1, dy: 1 },
  sw: { dx: -1, dy: 1 },
  w: { dx: -2, dy: 0 },
  nw: { dx: -1, dy: -1 },
};

const getNeighbours = ({ x, y }) =>
  Object.values(directions).map(({ dx, dy }) => {
    const newX = x + dx;
    const newY = y + dy;
    return { x: newX, y: newY };
  });

const getNumberOfBlackNeighbours = (hex, { x, y }) => {
  const neighbours = getNeighbours({ x, y });
  return neighbours.reduce((count, { x, y }) => {
    count += hex[`${x},${y}`] === true ? 1 : 0;
    return count;
  }, 0);
};

const move = (row) => {
  const moves = row.split(/(s?[ew]|n?[ew])/).filter((x) => x);
  return moves.reduce(
    (location, direction) => {
      const { dx, dy } = directions[direction];
      location.x += dx;
      location.y += dy;
      return location;
    },
    { x: 0, y: 0 },
  );
};

const getNewHex = (hex) =>
  Object.entries(hex).reduce((newHex, [coordinate]) => {
    const [x, y] = coordinate.split(',').map(Number);
    const numberOfBlackNeighbours = getNumberOfBlackNeighbours(hex, { x, y });
    console.log('black', x, y, numberOfBlackNeighbours);
    const currentTile = hex[`${x},{y}`];
    newHex[`${x},${y}`] = currentTile;
    if (
      currentTile &&
      (numberOfBlackNeighbours === 0 || numberOfBlackNeighbours > 2)
    ) {
      newHex[`${x},${y}`] = false;
    }
    if (!currentTile && numberOfBlackNeighbours === 2) {
      newHex[`${x},${y}`] = true;
    }
    console.log('new', newHex);
    return newHex;
  }, {});

const util1 = (input) => {
  const hex = input.reduce((hex, row) => {
    const { x, y } = move(row);
    hex[`${x},${y}`] = !hex[`${x},${y}`];
    return hex;
  }, {});
  const black = Object.values(hex).filter((entry) => entry);
  return black.length;
};

const util2 = (input) => {
  const hex = input.reduce((hex, row) => {
    const { x, y } = move(row);
    hex[`${x},${y}`] = !hex[`${x},${y}`];
    return hex;
  }, {});
  console.log(hex);
  const newHex = getNewHex(hex);
  console.log(Object.values(newHex).filter((entry) => entry).length);
  /* for (let day = 1; day <= 100; day += 1) {
    console.log(
      `day ${day}`,
      Object.values(hex).filter((entry) => entry).length,
    );
  } */
  return input;
};

module.exports = {
  util1,
  util2,
  move,
  getNeighbours,
  getNumberOfBlackNeighbours,
};
