const decodeBoardinPass = (boardingPass) => {
  const [, rowCode, columnCode] = boardingPass.match(/([FB]{7})([LR]{3})/);
  const row = parseInt(rowCode.replace(/F/g, 0).replace(/B/g, 1), 2);
  const column = parseInt(columnCode.replace(/L/g, 0).replace(/R/g, 1), 2);
  return { row, column, seatId: row * 8 + column };
};

const findHighestSeatId = (input) =>
  input.reduce((high, boardingPass) => {
    const { seatId } = decodeBoardinPass(boardingPass);
    if (seatId > high) {
      high = seatId;
    }
    return high;
  }, 0);

const findMySeatId = (input) => {
  const seatIds = input
    .map((boardingPass) => decodeBoardinPass(boardingPass).seatId)
    .sort((a, b) => Number(a) - Number(b));

  return (
    seatIds.find((seat, index, seats) => seats[index + 1] !== seat + 1) + 1
  );
};

module.exports = {
  decodeBoardinPass,
  findHighestSeatId,
  findMySeatId,
};
