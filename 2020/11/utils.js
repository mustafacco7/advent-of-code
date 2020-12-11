/* eslint-disable no-continue */
const getAdjacentSeats = (seats, x, y) => {
  const width = seats[0].length;
  const height = seats.length;
  const adjacentSeats = [];

  for (let posY = y - 1; posY <= y + 1; posY += 1) {
    if (posY < 0 || posY === height) {
      continue;
    }
    for (let posX = x - 1; posX <= x + 1; posX += 1) {
      if (posX < 0 || (posX === x && posY === y) || posX === width) {
        continue;
      }
      if (seats[posY][posX] !== '.') {
        adjacentSeats.push(seats[posY][posX]);
      }
    }
  }

  return adjacentSeats;
};

const getOccupiedAdjacentSeats = (seats, x, y) =>
  getAdjacentSeats(seats, x, y).reduce((sum, seat) => {
    if (seat === '#') {
      sum += 1;
    }
    return sum;
  }, 0);

const applyRules = (seats) => {
  const width = seats[0].length;
  const height = seats.length;
  const position = { x: 0, y: 0 };
  console.log(getAdjacentSeats(seats, 0, 0));
  while (position.y < height) {
    const x = position.x % width;
    const { y } = position;
    const adjacentSeats = getAdjacentSeats(seats, x, y);
  }
};

const util1 = (input) => {
  console.log(input);
  return input;
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2, getAdjacentSeats, getOccupiedAdjacentSeats };
