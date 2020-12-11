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

const calculateNextStateForSeat = (seats, x, y) => {
  const seat = seats[y][x];
  const occupiedAdjacentSeats = getOccupiedAdjacentSeats(seats, x, y);

  if (seat === 'L' && !occupiedAdjacentSeats) {
    return '#';
  }

  if (seat === '#' && occupiedAdjacentSeats >= 4) {
    return 'L';
  }

  return seat;
};

const calculateNextState = (seats) => {
  const newSeats = [];
  seats.forEach((seatRows, y) => {
    let row = '';
    seatRows.split('').forEach((seat, x) => {
      const newSeat = calculateNextStateForSeat(seats, x, y);
      row += newSeat;
    });
    newSeats.push(row);
  });

  return newSeats;
};

const isEqualSeats = (seats1, seats2) =>
  JSON.stringify(seats1) === JSON.stringify(seats2);

const getNumberOfOccupiedSeats = (seats) =>
  seats.reduce((total, row) => {
    total += row.split('').reduce((sum, seat) => {
      if (seat === '#') {
        sum += 1;
      }
      return sum;
    }, 0);
    return total;
  }, 0);

const util1 = (input) => {
  let previousState = input;
  let found = false;
  while (!found) {
    const nextState = calculateNextState(previousState);
    if (isEqualSeats(nextState, previousState)) {
      found = true;
    }
    previousState = nextState;
  }

  return getNumberOfOccupiedSeats(previousState);
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = {
  util1,
  util2,
  calculateNextState,
  calculateNextStateForSeat,
  getAdjacentSeats,
  getOccupiedAdjacentSeats,
  isEqualSeats,
};
