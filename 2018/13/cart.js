const getMove = (direction) => {
  const dirMap = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    v: [0, 1],
  };

  return dirMap[direction];
};

const getNextIntersection = (nextIntersection) => {
  return ((nextIntersection + 1) % 3);
};

const move = ({ x, y, direction, nextIntersection }, grid) => {
  x += direction[0];
  y += direction[1];
  const cell = grid[y][x];

  if (!['\\', '/', '+'].includes(cell)) {
    return { x, y };
  }

  let [xx, yy] = direction;

  if (cell === '\\') {
    if (xx) {
      yy = xx;
      xx = 0;
    } else if (yy) {
      xx = yy;
      yy = 0;
    }
  }

  if (cell === '/') {
    if (xx) {
      yy = -xx;
      xx = 0;
    } else if (yy) {
      xx = -yy;
      yy = 0;
    }
  }


  if (cell === '+') {
    const factor = nextIntersection - 1;
    if (factor) {
      if (xx === 0) {
        xx = -1 * yy * factor;
        yy = 0;
      } else {
        yy = xx * factor;
        xx = 0;
      }
    }
    nextIntersection = getNextIntersection(nextIntersection);
  }
  direction = [xx, yy];


  return { x, y, direction, nextIntersection };
};

const findCrash = (grid) => {
  const carts = [];
  grid.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      const [, cart] = (cell.match(/([<>^v])/) || []);
      if (cart) {
        const direction = getMove(cart);
        carts.push({
          x,
          y,
          nextIntersection: 0,
          direction,
        });
      }
    });
  });

  let collision = false;
  let collissionCoordinate = '';
  while (!collision) {
    carts.sort((cart1, cart2) => {
      const x1 = cart1.x;
      const y1 = cart1.y;
      const x2 = cart2.x;
      const y2 = cart2.y;
      return y1 - y2 || x1 - x2;
    });
    console.log(carts);
    carts.forEach((cart, index) => {
      cart = { ...cart, ...move(cart, grid) };
      carts[index] = cart;
    });
    const occupied = {};
    collision = carts.some(({ x, y }) => {
      if (occupied[`${x}, ${y}`]) {
        collissionCoordinate = `${x},${y}`;
        return true;
      }
      occupied[`${x}, ${y}`] = true;
      return false;
    });
  }
  console.log('END: ', carts);
  return collissionCoordinate;
};

module.exports = { findCrash };
