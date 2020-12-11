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

const calculateNextState = (seats) =>
  seats.reduce((newSeats, seatRows, y) => {
    let row = '';
    seatRows.split('').forEach((seat, x) => {
      const newSeat = calculateNextStateForSeat(seats, x, y);
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
