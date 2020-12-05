const decodeBoardinPass = (boardingPass) => {
  const [, rowCode, columnCode] = boardingPass.match(/([FB]{7})([LR]{3})/);
  const row = parseInt(rowCode.replace(/F/g, 0).replace(/B/g, 1), 2);
  const column = parseInt(columnCode.replace(/L/g, 0).replace(/R/g, 1), 2);
  return { row, column, seatId: row * 8 + column };
};

const getAllSetIds = (input) =>
  input
    .map((boardingPass) => decodeBoardinPass(boardingPass).seatId)
    .sort((a, b) => Number(a) - Number(b));

const findHighestSeatId = (input) => {
  const seatIds = getAllSetIds(input);
  return seatIds[seatIds.length - 1];
};

const findMySeatId = (input) =>
  getAllSetIds(input).find(
    (seat, index, seats) => seats[index + 1] !== seat + 1,
  ) + 1;

module.exports = {
  decodeBoardinPass,
  findHighestSeatId,
  findMySeatId,
};
