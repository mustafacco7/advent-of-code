const directions = [
  { dx: -1, dy: -1 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: 1 },
];

const tripple = Array(3)
  .fill(1)
  .map((_, i) => i - 1);

const getAdjacentSeats = (seats, x, y) => {
  const width = seats[0].length;
  const height = seats.length;

  return tripple.reduce((adjacentSeats, dy) => {
    const posY = y + dy;
    if (posY >= 0 && posY < height) {
      tripple.forEach((dx) => {
        const posX = x + dx;
        if (posX >= 0 && posX < width && !(posX === x && posY === y)) {
          if (seats[posY][posX] !== '.') {
            adjacentSeats.push(seats[posY][posX]);
          }
        }
      });
    }
    return adjacentSeats;
  }, []);
};

const getNumberOfOccupiedAdjacentSeats = (seats, x, y) =>
  getAdjacentSeats(seats, x, y).reduce((sum, seat) => {
    if (seat === '#') {
      sum += 1;
    }
    return sum;
  }, 0);

const getNumberofVisibleOccupiedSeat = (seats, x, y) => {
  const width = seats[0].length;
  const height = seats.length;
  return directions.reduce((visibleSeats, { dx, dy }) => {
    let posX = x + dx;
    let posY = y + dy;
    while (posX >= 0 && posX < width && posY >= 0 && posY < height) {
      const seat = seats[posY][posX];
      if (seat === '#') {
        visibleSeats += 1;
        break;
      }
      if (seat === 'L') {
        break;
      }

      posX += dx;
      posY += dy;
    }
    return visibleSeats;
  }, 0);
};

const calculateNextStateForSeat = (seats, x, y, occupiedSeats, limit = 4) => {
  const seat = seats[y][x];

  if (seat === 'L' && !occupiedSeats) {
    return '#';
  }

  if (seat === '#' && occupiedSeats >= limit) {
    return 'L';
  }

  return seat;
};

const calculateNextState = (seats) =>
  seats.reduce((newSeats, seatRows, y) => {
    let row = '';
    seatRows.split('').forEach((seat, x) => {
      const occupiedAdjacentSeats = getNumberOfOccupiedAdjacentSeats(
        seats,
        x,
        y,
      );

      const newSeat = calculateNextStateForSeat(
        seats,
        x,
        y,
        occupiedAdjacentSeats,
        4,
      );
      row += newSeat;
    });
    newSeats.push(row);
    return newSeats;
  }, []);

const calculateNextState2 = (seats) =>
  seats.reduce((newSeats, seatRows, y) => {
    let row = '';
    seatRows.split('').forEach((seat, x) => {
      const occupiedSeats = getNumberofVisibleOccupiedSeat(seats, x, y);
      const newSeat = calculateNextStateForSeat(seats, x, y, occupiedSeats, 5);
      row += newSeat;
    });
    newSeats.push(row);
    return newSeats;
  }, []);

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
  let numberOfOccuppiedSeats;
  let previousState = input;
  while (!numberOfOccuppiedSeats) {
    const nextState = calculateNextState(previousState);
    if (isEqualSeats(nextState, previousState)) {
      numberOfOccuppiedSeats = getNumberOfOccupiedSeats(previousState);
    } else {
      previousState = nextState;
    }
  }
  return numberOfOccuppiedSeats;
};

const util2 = (input) => {
  let numberOfOccuppiedSeats;
  let previousState = input;
  while (!numberOfOccuppiedSeats) {
    const nextState = calculateNextState2(previousState);
    if (isEqualSeats(nextState, previousState)) {
      numberOfOccuppiedSeats = getNumberOfOccupiedSeats(previousState);
    } else {
      previousState = nextState;
    }
  }
  return numberOfOccuppiedSeats;
};

module.exports = {
  util1,
  util2,
  calculateNextState,
  calculateNextStateForSeat,
  getAdjacentSeats,
  getNumberOfOccupiedAdjacentSeats,
  getNumberofVisibleOccupiedSeat,
  isEqualSeats,
};
