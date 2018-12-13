/* eslint-disable object-curly-newline */
const getDirection = (direction) => {
  const dirMap = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    v: [0, 1],
  };
  return dirMap[direction];
};

const getCarts = grid => grid.reduce((carts, row, y) => {
  row.split('').forEach((cell, x) => {
    const [, cart] = (cell.match(/([<>^v])/) || []);
    if (cart) {
      const direction = getDirection(cart);
      carts.push({ x, y, nextTurn: 0, direction });
    }
  });
  return carts;
}, []);


const getNextTurn = nextTurn => ((nextTurn + 1) % 3);
const sortCarts = carts => carts.sort((cart1, cart2) => cart1.y - cart2.y || cart1.x - cart2.x);

let grid;
const move = ({ x, y, direction, nextTurn }) => {
  x += direction[0];
  y += direction[1];
  const cell = grid[y][x];

  if (!['\\', '/', '+'].includes(cell)) {
    return { x, y };
  }

  let [dx, dy] = direction;

  if (cell === '+') {
    const factor = nextTurn - 1;
    if (factor !== 0) {
      if (dx === 0) {
        dx = -1 * dy * factor;
        dy = 0;
      } else if (dy === 0) {
        dy = dx * factor;
        dx = 0;
      }
    }
    nextTurn = getNextTurn(nextTurn);

  } else {

    const factor = cell === '/' ? -1 : 1;
    if (dx === 0) {
      dx = factor * dy;
      dy = 0;
    } else {
      dy = factor * dx;
      dx = 0;
    }
  }

  direction = [dx, dy];

  return { x, y, direction, nextTurn };
};

const detectCollision = (carts) => {
  const occupied = {};
  let collisionCoordinate = '';
  carts.some(({ x, y }) => {
    if (occupied[`${x},${y}`]) {
      collisionCoordinate = `${x},${y}`;
      return true;
    }
    occupied[`${x},${y}`] = true;
    return false;
  });
  return collisionCoordinate;
};

const findCollisionLocation = (input) => {
  grid = input;
  let carts = getCarts(grid);
  let collisionCoordinate = '';
  while (!collisionCoordinate) {
    carts = sortCarts(carts);
    carts = carts.map(cart => ({ ...cart, ...move(cart) }));
    collisionCoordinate = detectCollision(carts);
  }

  return collisionCoordinate;
};

module.exports = { findCollisionLocation };
