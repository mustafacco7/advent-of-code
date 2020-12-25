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

const getKey = ({ x, y }) => `${x},${y}`;
const getCoordinates = (key) => {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
};

const getNumberOfBlackNeighbours = (blackTiles, { x, y }) => {
  const neighbours = getNeighbours({ x, y });
  return neighbours.reduce((count, { x, y }) => {
    const key = getKey({ x, y });
    if (blackTiles.has(key)) {
      count += 1;
    }
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

const getBlackTiles = (rows) =>
  rows.reduce((blackTiles, row) => {
    const key = getKey(move(row));
    if (blackTiles.has(key)) {
      blackTiles.delete(key);
    } else {
      blackTiles.add(key);
    }
    return blackTiles;
  }, new Set());

const applyDay = (blackTiles) =>
  [...blackTiles].reduce((newTiles, key) => {
    const coordinate = getCoordinates(key);
    getNeighbours(coordinate).forEach((neighbour) => {
      const blackNeighbours = getNumberOfBlackNeighbours(blackTiles, neighbour);
      const neighbourKey = getKey(neighbour);
      const isNeighbourBlack = blackTiles.has(neighbourKey);
      if (
        (isNeighbourBlack && blackNeighbours === 1) ||
        blackNeighbours === 2
      ) {
        newTiles.add(neighbourKey);
      }
    });

    return newTiles;
  }, new Set());

const util1 = (input) => {
  const blackTiles = getBlackTiles(input);
  return blackTiles.size;
};

const util2 = (input, count = 100) => {
  let blackTiles = getBlackTiles(input);
  Array(count)
    .fill(1)
    .forEach(() => {
      blackTiles = applyDay(blackTiles);
    });
  return blackTiles.size;
};

module.exports = {
  util1,
  util2,
  applyDay,
  getBlackTiles,
  move,
  getNeighbours,
  getNumberOfBlackNeighbours,
};
