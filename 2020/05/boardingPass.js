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

const findMySeatId = (input) => {
  const seatIds = getAllSetIds(input);
  // Get the lowest and highest seatId so we can build a new array from those values
  const [minSeatId, maxSeatId] = [Math.min(...seatIds), Math.max(...seatIds)];
  return Array.from(
    // Create an array of the length of the number of availbale seatIds
    Array(maxSeatId - minSeatId),
    // Fill it with values from the lowest seatId and up (eg. not 0 - X)
    (_, index) => index + minSeatId,
    // And find the seatId that is not in the original list of seatIds
  ).find((seatId) => !seatIds.includes(seatId));
};

module.exports = {
  decodeBoardinPass,
  findHighestSeatId,
  findMySeatId,
};
